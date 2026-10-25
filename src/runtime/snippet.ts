// 搜索结果的摘要生成(供 search.ts 与规则 injectResult 共用,避免循环依赖)
import type { PageData } from '../data/types'

export function snippetOf(p: PageData): string {
  const text = p.body?.join(' ') ?? p.posts?.[0]?.body ?? ''
  return text.length > 60 ? text.slice(0, 60) + '……' : text
}
