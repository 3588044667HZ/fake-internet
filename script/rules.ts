// 规则描述符(2.md):创作者在此追加规则,不碰框架代码。
// 语义约定:
// - queryContains 使用双向子序列模糊匹配(见 runtime/query.ts):
//   目标词是查询的子序列,或查询是目标词的子序列,即命中。
// - 同事件内顺序依赖由 priority 表达(计数→解锁→注入)。
// - 只追加新 ID,不修改既有规则内容(存档兼容纪律,README §8.4)。
import type { Rule } from '@fw/data/types'

// 「黑石头/油神」线:玩家可能输入的关联词集合(script.txt 用语 + 玩家直觉词)
const jzTerms = ['黑石头', '油神', '拜由', '猪油', '油', '膏', '白油', '长生道']

// 「英文手稿」线关联词(克苏鲁/来于比/黑太岁等)同样计入黑石头计数
const msTerms = ['克苏鲁', '拉莱耶', '来于比', '黑太岁', '太岁', '手稿', '日记']

export const rules: Rule[] = [
  // —— 黑石头/油神线(script.txt 改编) ——
  { id: 'count-jzstone', on: 'search', priority: 10,
    when: { any: jzTerms.map((t) => ({ queryContains: t })) },
    then: [{ setCounter: '黑石头', add: 1 }] },
  { id: 'unlock-jz', on: 'search', priority: 20,
    when: { counter: '黑石头', atLeast: 3 },
    then: [{ setFlag: 'jz_ghost_unlocked' }] },
  { id: 'inject-jz', on: 'search', priority: 30,
    when: { all: [{ flag: 'jz_ghost_unlocked' }, { any: jzTerms.map((t) => ({ queryContains: t })) }] },
    then: [{ injectResult: { pageId: 'jz-ghost', weight: 999 } }] },
  { id: 'mark-seen-jz', on: 'visit',
    when: { all: [{ urlIs: 'http://forum.oldnet.local/t/jz-ghost' }, { flag: 'jz_ghost_unlocked' }] },
    then: [{ setFlag: 'jz_ghost_seen' }] },

  // —— 英文手稿线(追加):关联词计入同一计数,解锁后同样注入幽灵结果 ——
  { id: 'count-jz-manuscript', on: 'search', priority: 10,
    when: { any: msTerms.map((t) => ({ queryContains: t })) },
    then: [{ setCounter: '黑石头', add: 1 }] },
  { id: 'inject-jz-manuscript', on: 'search', priority: 30,
    when: { all: [{ flag: 'jz_ghost_unlocked' }, { any: msTerms.map((t) => ({ queryContains: t })) }] },
    then: [{ injectResult: { pageId: 'jz-ghost', weight: 999 } }] },
]
