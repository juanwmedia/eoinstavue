import Vue from 'vue'
import Router from 'vue-router'
import EntryList from './components/EntryList.vue'
import UserRegister from './components/UserRegister.vue'
import UserLogin from './components/UserLogin.vue'

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
      component: UserRegister
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLogin
    }
  ]
})
