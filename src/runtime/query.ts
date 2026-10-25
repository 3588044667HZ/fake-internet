// 中文关键词模糊匹配:双向子序列语义(见 2.md §2 注释)。
// 解决 '黑色石头'.includes('黑石头') === false 之类的问题:
//   query '黑色石头' vs term '黑石头' → term 是 query 的子序列 → 命中
//   query '油' vs term '油膏'       → query 是 term 的子序列 → 命中(单字即包含)

export function isSubseq(needle: string, hay: string): boolean {
  if (!needle) return false
  let i = 0
  for (const ch of hay) {
    if (ch === needle[i]) i++
    if (i === needle.length) return true
  }
  return false
}

export function matchesQuery(query: string, term: string): boolean {
  const a = query.trim().toLowerCase()
  const b = term.trim().toLowerCase()
  if (!a || !b) return false
  return isSubseq(a, b) || isSubseq(b, a)
}
