// 内容与规则的类型定义:创作者从 @fw/data/types 导入,框架统一校验
export type PageKind = 'portal' | 'forum' | 'thread' | 'search' | 'ghost' | 'notice'

export interface Post {
  author: string
  date: string
  body: string
  /** 被管理员删除:默认显示占位,满足 deletedRevealFlag 后揭示真身 */
  deleted?: boolean
  /** 删除占位揭示 flag:满足后揭示真身;不填则永久保持删除占位 */
  deletedRevealFlag?: string
  /** 满足该 flag 才显示 */
  revealFlag?: string
  /** 附件图片(new URL('./xxx', import.meta.url).href,构建期校验存在性) */
  image?: string
  imageCaption?: string
}

export interface PageLink {
  label: string
  url: string
}

export interface PageData {
  id: string
  url: string
  site: string
  kind: PageKind
  title: string
  author?: string
  date?: string
  /** 段落正文 */
  body?: string[]
  posts?: Post[]
  links?: PageLink[]
  /** 页脚小字 */
  footnote?: string
  searchable: boolean
  keywords?: string[]
  /** 满足该 flag 才可解析,否则 404 */
  hiddenFlag?: string
}

export type RuleEvent = 'visit' | 'search'

export type Condition =
  | { flag: string }
  | { notFlag: string }
  | { counter: string; atLeast?: number; atMost?: number }
  | { queryContains: string }
  | { urlIs: string }
  | { visited: string }
  | { all: Condition[] }
  | { any: Condition[] }
  | { not: Condition }

export type Action =
  | { setFlag: string; value?: boolean }
  | { setCounter: string; add?: number }
  | { injectResult: { pageId: string; weight?: number } }

export interface Rule {
  id: string
  on: RuleEvent
  when?: Condition
  then: Action[]
  priority?: number
}
