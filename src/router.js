import { createRouter, createWebHistory } from 'vue-router'

import MainTemplate from './templates/main/Main.vue'
import AuthTemplate from './templates/auth/Auth.vue'

import Signin from './templates/signin/SignIn.vue'
import Home from './templates/Home.vue'
import PageNotSignInNotFound from './templates/pageNotFound/PageNotSignInNotFound.vue'

import PageNotFound from './templates/pageNotFound/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainTemplate,
      children: [
        {
          path: ':catchAll(.*)*',
          name: 'pageNotFound',
          component: PageNotFound,
        },
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/',
      component: AuthTemplate,
      children: [
        {
          path: '',
          name: 'sigin',
          component: Signin,
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      name: 'pageNotSignInNotFound',
      component: PageNotSignInNotFound,
    },
  ],
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        el: to.hash,
      }
    }
  },
})

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username')
  if (username) {
    next()
  }
  console.log(username)

  if (to.meta.requiresAuth && !localStorage.getItem('username')) {
    console.log(`Redirect to the Sigin page.`)
    next({ name: 'sigin' })
  } else {
    console.log(`Redirect to focused page.`)
    next()
  }
})

export default router
