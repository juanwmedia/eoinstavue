import Vue from 'vue'
import Router from 'vue-router'
import EntryList from './components/EntryList.vue'
import UserRegister from './components/UserRegister.vue'
import UserLogin from './components/UserLogin.vue'
import UserRecover from './components/UserRecover.vue'
import UserProfile from './components/UserProfile.vue'
import firebase from './firebase.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Entries',
      component: EntryList
    },
    {
      path: '/register',
      name: 'Register',
      component: UserRegister,
      meta: {
        publico: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLogin,
      meta: {
        publico: true,
      }
    },
    {
      path: '/recover',
      name: 'Recover',
      component: UserRecover,
      meta: {
        publico: true,
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: UserProfile,
      meta: {
        privado: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const privado = to.matched.some(destino => destino.meta.privado);
  const publico = to.matched.some(destino => destino.meta.publico);
  const usuarioActual = firebase.auth.currentUser;

  if (privado && !usuarioActual) {
    console.info("Se necesita autentificación");
    next('/login');
  } else if (publico && usuarioActual) {
    console.info("Ruta para usuarios anónimos");
    next('/');
  } else if (privado && usuarioActual) {
    console.info("Autentificación establecida");
    next();
  } else {
    console.info("Cualquiera de las otras combinaciones posibles");
    next();
  }
});

export default router;