<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PageData } from '../../data/types'
import { state, navigate } from '../../runtime/state'
import { search, type SearchResult } from '../../runtime/search'

defineProps<{ page: PageData }>()

// 搜索结果不入 state,可随时重算;计数副作用只在提交时发生
const q = ref('')
const results = ref<SearchResult[]>([])

// 进入搜索页:若携带查询词(地址栏输入),执行一次搜索
watch(
  () => state.currentUrl,
  () => {
    if (state.query) {
      q.value = state.query
      results.value = search(state.query, state)
    } else {
      q.value = ''
      results.value = []
    }
  },
  { immediate: true }
)

function doSearch(): void {
  const query = q.value.trim()
  if (!query) return
  state.query = query
  results.value = search(query, state)
}
</script>

<template>
  <div class="site-page">
    <h1>{{ page.title }}</h1>
    <div class="search-box">
      <input v-model="q" class="query" spellcheck="false" placeholder="请输入关键词" @keydown.enter="doSearch" />
      <button class="btn go" @click="doSearch">搜索</button>
    </div>
    <template v-if="results.length">
      <ol class="results">
        <li v-for="r in results" :key="r.url">
          <a href="#" @click.prevent="navigate(r.url)">{{ r.title }}</a>
          <div class="dim snippet">{{ r.snippet }}</div>
          <div class="url-line">{{ r.url }} — {{ r.site }}</div>
        </li>
      </ol>
    </template>
    <p v-else class="dim">请输入关键词进行搜索。</p>
  </div>
</template>
