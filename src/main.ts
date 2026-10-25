import { createApp } from 'vue'
import App from './App.vue'
import { initState } from './runtime/state'
import './style.css'

initState()
createApp(App).mount('#app')
