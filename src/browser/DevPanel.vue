<script setup lang="ts">
import { ref } from 'vue'
import { state, save, load, initState } from '../runtime/state'
import { lastFired, clearTrace } from '../runtime/rules'

const open = ref(true)
const msg = ref('')

function doSave(): void {
  save()
  msg.value = '已存档(' + new Date().toLocaleTimeString() + ')'
}

function doLoad(): void {
  msg.value = load() ? '已读档' : '没有存档'
}

function doReset(): void {
  initState()
  msg.value = '已重置'
}
</script>

<template>
  <aside v-if="open" class="devpanel">
    <div class="dev-header">
      <span>开发面板</span>
      <a href="#" @click.prevent="open = false">收起</a>
    </div>
    <div class="dev-actions">
      <button class="btn" @click="doSave">存档</button>
      <button class="btn" @click="doLoad">读档</button>
      <button class="btn" @click="doReset">重置</button>
      <span class="dim">{{ msg }}</span>
    </div>
    <div class="dev-section">
      <div class="dev-actions">
        <span>规则触发追踪(不进存档)</span>
        <button class="btn" @click="clearTrace">清空</button>
      </div>
      <ol class="dev-trace">
        <li v-for="(t, i) in [...lastFired].reverse()" :key="i">
          [{{ new Date(t.ts).toLocaleTimeString() }}] {{ t.event }} → {{ t.ruleId }}
        </li>
        <li v-if="!lastFired.length" class="dim">(无)</li>
      </ol>
    </div>
    <pre class="dev-state">{{ JSON.stringify(state, null, 2) }}</pre>
  </aside>
  <button v-else class="dev-open" @click="open = true">开发面板</button>
</template>
