import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    hidden: true,
    meta: {
      name: '主页',
    },
    redirect: 'Login',
  },

  {
    path: '/Login',
    hidden: true,
    meta: {
      name: '登录',
    },
    component: () => import('@/views/Login/index'),
  },
  {
    path: '/Home',
    name: 'Home',
    redirect: 'Conpage',
    meta: {
      name: '控制台',
      icon: 'user',
    },
    component: () => import('@/views/Home/index'),
    children: [
      {
        path: '/Conpage',
        name: 'Conpage',
        meta: {
          name: '首页',
        },
        component: () => import('@/views/Conpage/index'),
      },
    ],
  },
  {
    path: '/Home',
    name: 'Home',
    redirect: 'Conpage',
    meta: {
      name: '用户管理',
      icon: 'password',
    },
    component: () => import('@/views/Home/index'),
    children: [
      {
        path: '/UserInfo',
        name: 'UserInfo',
        meta: {
          name: '用户信息',
        },
        component: () => import('@/views/User/UserInfo'),
      },
      {
        path: '/UserPage',
        name: 'UserPage',
        meta: {
          name: '用户列表',
        },
        component: () => import('@/views/User/UserPage'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
