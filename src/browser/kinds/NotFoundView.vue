<script setup lang="ts">
import { navigate, HOME_URL } from '../../runtime/state'
</script>

<template>
  <div class="site-page">
    <h1>404 Not Found</h1>
    <p>您访问的页面不存在,或已被删除。</p>
    <p><a href="#" @click.prevent="navigate(HOME_URL)">← 返回门户</a></p>
  </div>
</template>
