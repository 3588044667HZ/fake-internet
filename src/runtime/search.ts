// 搜索入口(缝 3):全部检索行为都走这一个函数。
// 流程:构建基础结果 → runRules('search')(计数/解锁/注入)→ 排序 → 返回。
import { pages } from '../data/content'
import type { PageData } from '../data/types'
import { matchesQuery } from './query'
import { snippetOf } from './snippet'
import { runRules } from './rules'
import type { GameState } from './state'

export interface SearchResult {
  url: string
  title: string
  snippet: string
  site: string
  weight: number
}

function haystackOf(p: PageData): string {
  return [
    p.title,
    p.author ?? '',
    (p.keywords ?? []).join(' '),
    (p.body ?? []).join(' '),
    (p.posts ?? []).map((x) => x.body).join(' '),
  ]
    .join(' ')
    .toLowerCase()
}

export function search(query: string, state: GameState): SearchResult[] {
  const q = query.trim()
  if (!q) return []

  const ql = q.toLowerCase()
  const terms = ql.split(/\s+/).filter(Boolean)
  const results: SearchResult[] = []

  for (const p of pages) {
    if (!p.searchable) continue
    if (p.hiddenFlag && !state.flags[p.hiddenFlag]) continue
    const hay = haystackOf(p)
    let score = 0
    for (const t of terms) if (matchesQuery(t, hay)) score++
    if (terms.length && matchesQuery(ql, p.title.toLowerCase())) score += 2
    if (score > 0) {
      results.push({ url: p.url, title: p.title, snippet: snippetOf(p), site: p.site, weight: score })
    }
  }

  runRules('search', { event: 'search', query: q, results }, state)

  results.sort((a, b) => b.weight - a.weight)
  return results
}
