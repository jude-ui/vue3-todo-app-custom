import './scss/main.scss'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

console.log(process.env.NODE_ENV)
createApp(App)
  .use(store)
  .mount('body')