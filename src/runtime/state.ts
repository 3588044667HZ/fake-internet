// 状态仓库(缝 2):单一可序列化对象,存档 = JSON.stringify(state)
import { reactive } from 'vue'
import { runRules } from './rules'

export interface GameState {
  flags: Record<string, boolean>
  counters: Record<string, number>
  /** 访问栈,末尾为当前页 */
  history: string[]
  bookmarks: string[]
  currentUrl: string
  /** 最近一次搜索词(经地址栏进入搜索页时携带) */
  query: string
}

export const state = reactive<GameState>({
  flags: {},
  counters: {},
  history: [],
  bookmarks: [],
  currentUrl: '',
  query: '',
})

export const HOME_URL = 'http://portal.oldnet.local/'
export const SEARCH_URL = 'http://search.oldnet.local/'

const SAVE_KEY = 'oldnet-save-v1'

export function initState(): void {
  state.flags = {}
  state.counters = {}
  state.history = []
  state.bookmarks = []
  state.query = ''
  state.currentUrl = HOME_URL
}

export function visit(url: string): void {
  state.currentUrl = url
  if (state.history[state.history.length - 1] !== url) state.history.push(url)
  // visit 规则在 resolve 之前执行(2.md §6)
  runRules('visit', { event: 'visit', url }, state)
}

export function back(): void {
  state.history.pop()
  const prev = state.history.pop()
  state.currentUrl = prev ?? HOME_URL
  runRules('visit', { event: 'visit', url: state.currentUrl }, state)
}

/** 地址栏输入:URL 直接访问,否则当作搜索词(老式浏览器行为) */
export function navigate(raw: string): void {
  const input = raw.trim()
  if (!input) return
  if (/^https?:\/\//i.test(input) || (/^\S+\.[a-z]{2,}$/i.test(input) && !input.includes(' '))) {
    visit(/^https?:\/\//i.test(input) ? input : 'http://' + input)
    return
  }
  state.query = input
  visit(SEARCH_URL)
}

export function toggleBookmark(url: string): void {
  const i = state.bookmarks.indexOf(url)
  if (i >= 0) state.bookmarks.splice(i, 1)
  else state.bookmarks.push(url)
}

export function save(): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state))
}

export function load(): boolean {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return false
  try {
    Object.assign(state, JSON.parse(raw))
    return true
  } catch {
    return false
  }
}
