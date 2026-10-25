// 测试环境:localStorage polyfill(state.save/load 依赖)
const store = new Map<string, string>()

;(globalThis as Record<string, unknown>).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => {
    store.set(k, String(v))
  },
  removeItem: (k: string) => {
    store.delete(k)
  },
  clear: () => {
    store.clear()
  },
  key: (i: number) => [...store.keys()][i] ?? null,
  get length() {
    return store.size
  },
}
