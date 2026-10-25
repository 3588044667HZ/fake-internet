// 基础设施页:门户/论坛/搜索。不属于任何叙事线,随框架站点骨架提供。
import type { PageData } from '@fw/data/types'

export const pages: PageData[] = [
  {
    id: 'portal',
    url: 'http://portal.oldnet.local/',
    site: '旧网门户',
    kind: 'portal',
    title: '旧网门户 OLDNET',
    searchable: true,
    keywords: ['旧网', '门户', 'oldnet'],
    body: [
      '欢迎来到旧网。本门户自 1998 年起为本地区用户提供资讯、论坛与检索服务。',
      '公告(2011-03-02):本站将于本月起停止服务,现有内容仅供存档查阅,不再更新。',
    ],
    links: [
      { label: '旧网论坛', url: 'http://forum.oldnet.local/' },
      { label: '旧网搜索', url: 'http://search.oldnet.local/' },
    ],
  },
  {
    id: 'forum',
    url: 'http://forum.oldnet.local/',
    site: '旧网论坛',
    kind: 'forum',
    title: '旧网论坛 · 全部版块',
    searchable: true,
    keywords: ['论坛', '旧网'],
    body: ['当前在线:0 人 · 注册会员:1,204 人 · 最后发帖:2010-11-30 23:05'],
  },
  {
    id: 'search',
    url: 'http://search.oldnet.local/',
    site: '旧网搜索',
    kind: 'search',
    title: '旧网搜索',
    searchable: false,
  },
]
