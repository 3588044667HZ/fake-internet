// 回放测试:脚本化玩家路径 → 断言状态,作为内容/规则的回归闸门(README §8.3)
import { beforeEach, describe, expect, it } from 'vitest'
import { initState, state, visit } from '../src/runtime/state'
import { search } from '../src/runtime/search'
import { resolve } from '../src/runtime/resolve'
import { matchesQuery } from '../src/runtime/query'
import { lastFired, clearTrace } from '../src/runtime/rules'
import { pages } from '../src/data/content'

const JZ_GHOST_URL = 'http://forum.oldnet.local/t/jz-ghost'

beforeEach(() => {
  initState()
  clearTrace()
})

describe('中文模糊匹配(query.ts)', () => {
  it('目标词是查询的子序列(黑色石头 → 黑石头)', () => {
    expect(matchesQuery('黑色石头', '黑石头')).toBe(true)
  })
  it('查询是目标词的子序列(油 → 油膏 / 拜由 → 拜由教)', () => {
    expect(matchesQuery('油', '油膏')).toBe(true)
    expect(matchesQuery('拜由', '拜由教')).toBe(true)
  })
  it('精确词命中', () => {
    expect(matchesQuery('黑石头', '黑石头')).toBe(true)
  })
  it('无关词不命中', () => {
    expect(matchesQuery('石头', '水管')).toBe(false)
  })
})

describe('黑石头/油神线回放(script.txt)', () => {
  it('「黑色石头」也能计数(模糊),三次解锁', () => {
    // 第一次搜索就命中帖子(正文含「黑色石头」),并计数一次
    const first = search('黑色石头', state)
    expect(state.counters['黑石头']).toBe(1)
    expect(first.map((r) => r.url)).toContain('http://forum.oldnet.local/t/2046')

    search('油', state) // 关联词也计数
    expect(state.counters['黑石头']).toBe(2)

    const third = search('膏', state) // 第 3 次:解锁
    expect(state.flags['jz_ghost_unlocked']).toBe(true)
    // 解锁后搜关联词注入幽灵结果
    const res = search('油神', state)
    expect(res.map((r) => r.url)).toContain(JZ_GHOST_URL)
  })

  it('访问油神幽灵页置 jz_ghost_seen', () => {
    search('黑石头', state)
    search('黑石头', state)
    search('黑石头', state)
    visit(JZ_GHOST_URL)
    expect(state.flags['jz_ghost_seen']).toBe(true)
  })

  it('未解锁直接输入幽灵页 URL 不触发揭示(防剧透)', () => {
    visit(JZ_GHOST_URL)
    expect(state.flags['jz_ghost_seen']).toBeUndefined()
  })
})

describe('英文手稿线(洋人祭祀日记)', () => {
  it('手稿帖可检索(中英文词均可)', () => {
    expect(search('手稿', state).map((r) => r.url)).toContain('http://forum.oldnet.local/t/1872')
    expect(search("R'lyeh", state).map((r) => r.url)).toContain('http://forum.oldnet.local/t/1872')
    expect(search('祭祀', state).map((r) => r.url)).toContain('http://forum.oldnet.local/t/1872')
  })

  it('音译词可由中文母语者解码:搜白油/长生道命中并计数', () => {
    const res1 = search('白油', state)
    expect(res1.map((r) => r.url)).toContain('http://forum.oldnet.local/t/1872')
    expect(state.counters['黑石头']).toBe(1)
    search('长生道', state)
    expect(state.counters['黑石头']).toBe(2)
  })

  it('来于比/黑太岁计入同一计数,三次解锁', () => {
    search('来于比', state)
    expect(state.counters['黑石头']).toBe(1)
    search('黑太岁', state)
    expect(state.counters['黑石头']).toBe(2)
    search('太岁', state)
    expect(state.flags['jz_ghost_unlocked']).toBe(true)
  })

  it('解锁后搜克苏鲁注入幽灵结果', () => {
    search('黑石头', state)
    search('黑石头', state)
    search('黑石头', state)
    const res = search('克苏鲁', state)
    expect(res.map((r) => r.url)).toContain(JZ_GHOST_URL)
  })

  it('关键联动帖为被删状态,揭示 flag 后才可见', () => {
    const page = resolve('http://forum.oldnet.local/t/1872', state)
    const key = page?.posts?.find((p) => p.author === '老档案')
    expect(key?.deleted).toBe(true)
    expect(key?.deletedRevealFlag).toBe('jz_ghost_seen')
  })
})

describe('学校维修公告页(notice kind)', () => {
  it('公告页可解析、可检索', () => {
    expect(resolve('http://school.oldnet.local/', state)?.kind).toBe('notice')
    expect(search('维修', state).map((r) => r.url)).toContain('http://school.oldnet.local/')
    expect(search('封堵', state).map((r) => r.url)).toContain('http://school.oldnet.local/')
  })

  it('公告页不进论坛列表(kind=notice)', () => {
    const forum = pages.filter((p) => p.kind === 'thread' && p.site === '旧网论坛')
    expect(forum.map((p) => p.url)).not.toContain('http://school.oldnet.local/')
    expect(forum.some((p) => p.kind === 'notice')).toBe(false)
  })

  it('公告措辞与论坛帖互相印证(换石/封井/排查)', () => {
    const school = resolve('http://school.oldnet.local/', state)
    const bodies = (school?.posts ?? []).map((p) => p.body).join(' ')
    expect(bodies).toContain('石材') // 树池换石
    expect(bodies).toContain('封堵') // 井
    expect(bodies).toContain('排查') // 传染病
    expect(bodies).toContain('火星') // 踢石着火
  })
})

describe('蓝洞线已移除(回归)', () => {
  it('搜索「蓝洞」不触发任何规则、不产生状态', () => {
    const res = search('蓝洞', state)
    expect(lastFired).toHaveLength(0)
    expect(state.counters['蓝洞']).toBeUndefined()
    expect(state.flags['ghost_unlocked']).toBeUndefined()
    expect(res.some((r) => r.url.includes('/t/ghost'))).toBe(false)
  })

  it('蓝洞幽灵页 URL 已不存在', () => {
    expect(resolve('http://forum.oldnet.local/t/ghost', state)).toBeNull()
  })

  it('蓝洞帖子 URL 已不存在', () => {
    expect(resolve('http://forum.oldnet.local/t/17', state)).toBeNull()
    expect(resolve('http://forum.oldnet.local/t/1', state)).toBeNull()
  })

  it('基础设施页仍在', () => {
    expect(resolve('http://portal.oldnet.local/', state)?.id).toBe('portal')
    expect(resolve('http://forum.oldnet.local/', state)?.id).toBe('forum')
    expect(resolve('http://search.oldnet.local/', state)?.id).toBe('search')
  })
})
