// URL 解析:URL → 页面描述。hiddenFlag 未满足 → 404(幽灵页在解锁前不可直接访问)
import { pages } from '../data/content'
import type { PageData } from '../data/types'
import type { GameState } from './state'

function normalize(url: string): string {
  return url.trim().toLowerCase().replace(/\/+$/, '')
}

export function resolve(url: string, state: GameState): PageData | null {
  const norm = normalize(url)
  const page = pages.find((p) => normalize(p.url) === norm)
  if (!page) return null
  if (page.hiddenFlag && !state.flags[page.hiddenFlag]) return null
  return page
}
