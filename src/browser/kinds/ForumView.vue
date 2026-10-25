<script setup lang="ts">
import { computed } from 'vue'
import type { PageData } from '../../data/types'
import { pages } from '../../data/content'
import { navigate } from '../../runtime/state'

defineProps<{ page: PageData }>()

// 帖子列表由数据派生:kind=thread 且同站(幽灵帖 kind=ghost,自然不在列表)
// 按日期倒序,避免混合年代随声明顺序
const forumThreads = computed(() =>
  pages
    .filter((p) => p.kind === 'thread' && p.site === '旧网论坛')
    .map((p) => ({
      title: p.title,
      url: p.url,
      author: p.author ?? '',
      date: p.date ?? '',
      replies: (p.posts ?? []).length,
      last: p.posts?.at(-1)?.date ?? p.date ?? '',
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
)
</script>

<template>
  <div class="site-page">
    <h1>{{ page.title }}</h1>
    <p v-for="(para, i) in page.body" :key="i" class="dim">{{ para }}</p>
    <table class="thread-table">
      <thead>
        <tr><th>主题</th><th>作者</th><th>回复</th><th>最后回复</th></tr>
      </thead>
      <tbody>
        <tr v-for="t in forumThreads" :key="t.url">
          <td><a href="#" @click.prevent="navigate(t.url)">{{ t.title }}</a></td>
          <td>{{ t.author }}</td>
          <td>{{ t.replies }}</td>
          <td>{{ t.last }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
