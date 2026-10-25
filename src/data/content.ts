// 内容加载器:框架唯一的数据入口。
// - pages 经 import.meta.glob 自动发现 script/pages/*.ts(新线加文件即接入)
// - rules 来自 script/rules.ts
// 创作者只写 script/ 下的文件,不碰框架代码。
import type { PageData, Rule } from './types'
import { rules } from '../../script/rules'

const pageModules = import.meta.glob('../../script/pages/*.ts', { eager: true }) as Record<
  string,
  { pages: PageData[] }
>

export const pages: PageData[] = Object.values(pageModules).flatMap((m) => m.pages ?? [])

export { rules }

// 加载期完整性检查(开发期告警,不阻断):引用校验的引用侧由回放测试与类型系统兜底
const seenId = new Map<string, string>()
const seenUrl = new Map<string, string>()
for (const p of pages) {
  const idPrev = seenId.get(p.id)
  if (idPrev) console.warn(`[content] 页面 ID 冲突: ${p.id}(与 ${idPrev})`)
  seenId.set(p.id, p.title)
  const urlPrev = seenUrl.get(p.url)
  if (urlPrev) console.warn(`[content] 页面 URL 冲突: ${p.url}(「${p.title}」与「${urlPrev}」)`)
  seenUrl.set(p.url, p.title)
}
