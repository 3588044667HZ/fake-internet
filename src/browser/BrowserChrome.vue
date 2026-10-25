<script setup lang="ts">
import { ref, watch } from 'vue'
import { state, navigate, back, toggleBookmark, HOME_URL } from '../runtime/state'

const addr = ref('')
const showPanel = ref(false)

watch(
  () => state.currentUrl,
  (url) => {
    addr.value = url
  },
  { immediate: true }
)

function go(): void {
  navigate(addr.value)
  showPanel.value = false
}

function goHome(): void {
  navigate(HOME_URL)
  showPanel.value = false
}

function star(): void {
  toggleBookmark(state.currentUrl)
}
</script>

<template>
  <div class="chrome">
    <div class="toolbar">
      <button class="btn" title="后退" @click="back">←</button>
      <button class="btn" title="主页" @click="goHome">⌂</button>
      <button class="btn" title="刷新" @click="go">⟳</button>
      <input
        v-model="addr"
        class="addr"
        spellcheck="false"
        placeholder="输入网址,或直接输入搜索词"
        @keydown.enter="go"
      />
      <button class="btn go" @click="go">前往</button>
      <button class="btn star" :title="state.bookmarks.includes(state.currentUrl) ? '取消收藏' : '收藏'" @click="star">
        {{ state.bookmarks.includes(state.currentUrl) ? '★' : '☆' }}
      </button>
      <button class="btn" @click="showPanel = !showPanel">历史</button>
    </div>
    <div v-if="showPanel" class="side-panel">
      <div class="panel-col">
        <h4>历史记录</h4>
        <div v-if="!state.history.length" class="dim">(空)</div>
        <a v-for="u in [...state.history].reverse()" :key="u" class="panel-link" href="#" @click.prevent="navigate(u); showPanel = false">{{ u }}</a>
      </div>
      <div class="panel-col">
        <h4>收藏夹</h4>
        <div v-if="!state.bookmarks.length" class="dim">(空)</div>
        <a v-for="u in state.bookmarks" :key="u" class="panel-link" href="#" @click.prevent="navigate(u); showPanel = false">{{ u }}</a>
      </div>
    </div>
  </div>
</template>
