<script setup lang="ts">
import type { PageData } from '../../data/types'

defineProps<{ page: PageData }>()
</script>

<template>
  <div class="site-page ghost-page">
    <h1>{{ page.title }}</h1>
    <p v-for="(para, i) in page.body" :key="i">{{ para }}</p>
    <p v-if="page.footnote" class="ghost-footnote">{{ page.footnote }}</p>
  </div>
</template>
