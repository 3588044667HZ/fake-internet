// 规则求值器(2.md):纯函数,单遍执行。
// 确定性纪律:规则只读 state 与事件载荷,只写 state(或载荷);禁止真实时钟/随机/IO。
import { rules, pages } from '../data/content'
import type { Action, Condition, RuleEvent } from '../data/types'
import { matchesQuery } from './query'
import { snippetOf } from './snippet'
import type { GameState } from './state'
import type { SearchResult } from './search'

export interface RuleCtx {
  event: RuleEvent
  url?: string
  query?: string
  results?: SearchResult[]
}

// 触发追踪:非序列化,不进存档(2.md §9)
export interface FiredTrace {
  ruleId: string
  event: RuleEvent
  ts: number
}

export const lastFired: FiredTrace[] = []
const TRACE_MAX = 50

export function clearTrace(): void {
  lastFired.length = 0
}

function evalCond(c: Condition | undefined, ctx: RuleCtx, s: GameState): boolean {
  if (!c) return true
  if ('flag' in c) return !!s.flags[c.flag]
  if ('notFlag' in c) return !s.flags[c.notFlag]
  if ('counter' in c) {
    const v = s.counters[c.counter] ?? 0
    if (c.atLeast !== undefined && v < c.atLeast) return false
    if (c.atMost !== undefined && v > c.atMost) return false
    return true
  }
  if ('queryContains' in c) return !!ctx.query && matchesQuery(ctx.query, c.queryContains)
  if ('urlIs' in c) return normalize(ctx.url) === normalize(c.urlIs)
  if ('visited' in c) return s.history.some((u) => normalize(u) === normalize(c.visited))
  if ('all' in c) return c.all.every((x) => evalCond(x, ctx, s))
  if ('any' in c) return c.any.some((x) => evalCond(x, ctx, s))
  if ('not' in c) return !evalCond(c.not, ctx, s)
  return false
}

function normalize(url: string | undefined): string {
  return (url ?? '').trim().toLowerCase().replace(/\/+$/, '')
}

function applyAction(a: Action, ctx: RuleCtx, s: GameState): void {
  if ('setFlag' in a) {
    s.flags[a.setFlag] = a.value ?? true
    return
  }
  if ('setCounter' in a) {
    s.counters[a.setCounter] = (s.counters[a.setCounter] ?? 0) + (a.add ?? 1)
    return
  }
  if ('injectResult' in a) {
    const page = pages.find((p) => p.id === a.injectResult.pageId)
    if (!page) {
      console.warn(`[rules] injectResult 引用了不存在的 pageId: ${a.injectResult.pageId}`)
      return
    }
    if (ctx.results?.some((r) => r.url === page.url)) return
    ctx.results?.push({
      url: page.url,
      title: page.title,
      snippet: snippetOf(page),
      site: page.site,
      weight: a.injectResult.weight ?? 100,
    })
    return
  }
}

export function runRules(event: RuleEvent, ctx: RuleCtx, s: GameState): void {
  rules
    .filter((r) => r.on === event)
    .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0)) // 稳定排序:同 priority 按声明顺序
    .forEach((r) => {
      if (!evalCond(r.when, ctx, s)) return
      for (const a of r.then) applyAction(a, ctx, s)
      lastFired.push({ ruleId: r.id, event, ts: Date.now() })
      if (lastFired.length > TRACE_MAX) lastFired.shift()
    })
}
