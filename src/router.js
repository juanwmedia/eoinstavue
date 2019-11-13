import Vue from 'vue'
import Router from 'vue-router'
import EntryList from './components/EntryList.vue'
import AppRegister from './components/AppRegister.vue'

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
    {
      path: '/register',
      name: 'Register',
      component: AppRegister
    }
  ]
})
