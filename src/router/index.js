import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: '/login' // 重定向到 /login
    },
    {
      path: "/login",
      name: "Login",
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: "/home",
      name: "Home",
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '/users',
          name: 'Users',
          component: () => import('@/views/user/Users.vue')
        },
        {
          path: '/test',
          component: () => import('@/views/user/test.vue')
        }
      ]
    }
  ]
})
