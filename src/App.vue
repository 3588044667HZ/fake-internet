<script setup lang="ts">
import BrowserChrome from './browser/BrowserChrome.vue'
import PageRenderer from './browser/PageRenderer.vue'
import DevPanel from './browser/DevPanel.vue'
</script>

<template>
  <div class="app">
    <BrowserChrome />
    <PageRenderer />
    <DevPanel />
  </div>
</template>
