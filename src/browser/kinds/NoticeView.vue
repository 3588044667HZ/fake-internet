<script setup lang="ts">
import type { PageData } from '../../data/types'

defineProps<{ page: PageData }>()
</script>

<template>
  <div class="site-page">
    <h1>{{ page.title }}</h1>
    <p v-for="(para, i) in page.body" :key="i" class="dim">{{ para }}</p>
    <hr />
    <article v-for="(post, i) in page.posts" :key="i" class="post">
      <p class="post-meta">{{ post.author }} · {{ post.date }}</p>
      <p>{{ post.body }}</p>
    </article>
    <p v-if="page.footnote" class="ghost-footnote">{{ page.footnote }}</p>
  </div>
</template>
