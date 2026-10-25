<script setup lang="ts">
import type { PageData } from '../../data/types'
import { state } from '../../runtime/state'

defineProps<{ page: PageData }>()
</script>

<template>
  <div class="site-page">
    <h1>{{ page.title }}</h1>
    <p class="dim">作者:{{ page.author }} · 发表于 {{ page.date }}</p>
    <hr />
    <article v-for="(post, i) in page.posts" :key="i" class="post">
      <template v-if="post.revealFlag && !state.flags[post.revealFlag]"></template>
      <template v-else>
        <p class="post-meta">{{ post.author }} · {{ post.date }}</p>
        <p v-if="post.deleted && !(post.deletedRevealFlag && state.flags[post.deletedRevealFlag])" class="deleted">[此回复已被管理员删除]</p>
        <template v-else>
          <p>{{ post.body }}</p>
          <figure v-if="post.image" class="post-attach">
            <img :src="post.image" :alt="post.imageCaption ?? '附件图片'" />
            <figcaption v-if="post.imageCaption" class="dim">{{ post.imageCaption }}</figcaption>
          </figure>
        </template>
      </template>
    </article>
  </div>
</template>
