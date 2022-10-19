import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/levelone',
    name: 'levelone',
    meta: {
      title: '第一关'
    },
    component: () => import('@/views/LevelOne.vue')
  }
]

export default routes
