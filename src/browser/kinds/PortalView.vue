<script setup lang="ts">
import type { PageData } from '../../data/types'
import { navigate } from '../../runtime/state'

defineProps<{ page: PageData }>()
</script>

<template>
  <div class="site-page">
    <h1>{{ page.title }}</h1>
    <p v-for="(para, i) in page.body" :key="i">{{ para }}</p>
    <ul class="link-list">
      <li v-for="l in page.links" :key="l.url">
        <a href="#" @click.prevent="navigate(l.url)">{{ l.label }}</a>
        <span class="dim"> — {{ l.url }}</span>
      </li>
    </ul>
  </div>
</template>
