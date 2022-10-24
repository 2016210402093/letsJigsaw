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
  },
  {
    path: '/leveltwo',
    name: 'leveltwo',
    meta: {
      title: '第二关'
    },
    component: () => import('@/views/LevelTwo.vue')
  },
  {
    path: '/levelthree',
    name: 'levelthree',
    meta: {
      title: '第三关'
    },
    component: () => import('@/views/LevelThree.vue')
  },
  {
    path: '/success',
    name: 'success',
    meta: {
      title: '第三关'
    },
    component: () => import('@/views/Success.vue')
  }
]

export default routes
