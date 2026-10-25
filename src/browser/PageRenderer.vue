<script setup lang="ts">
import { computed } from 'vue'
import { state } from '../runtime/state'
import { resolve } from '../runtime/resolve'
import { kindRenderers } from './kinds/registry'
import NotFoundView from './kinds/NotFoundView.vue'

const page = computed(() => resolve(state.currentUrl, state))
const is404 = computed(() => state.currentUrl !== '' && !page.value)

// 未登记的 kind 也走 404,防渲染白屏
const view = computed(() => (page.value ? kindRenderers[page.value.kind] ?? NotFoundView : NotFoundView))
</script>

<template>
  <main class="page-area">
    <NotFoundView v-if="is404" />
    <component :is="view" v-else-if="page" :page="page" />
  </main>
</template>
