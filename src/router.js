import Vue from 'vue'
import Router from 'vue-router'
import EntryList from './components/EntryList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'EntryList',
      component: EntryList
    },
  ]
})
