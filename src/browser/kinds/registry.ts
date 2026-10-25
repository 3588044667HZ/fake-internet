// kind → 渲染组件注册表:新增页面类型 = 新增组件文件 + 在此登记一行
import type { Component } from 'vue'
import PortalView from './PortalView.vue'
import ForumView from './ForumView.vue'
import ThreadView from './ThreadView.vue'
import SearchView from './SearchView.vue'
import GhostView from './GhostView.vue'
import NoticeView from './NoticeView.vue'

export const kindRenderers: Record<string, Component> = {
  portal: PortalView,
  forum: ForumView,
  thread: ThreadView,
  search: SearchView,
  ghost: GhostView,
  notice: NoticeView,
}
