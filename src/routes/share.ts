/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-12 15:50:27
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { globalConfig } from '@/config'
import { useUserStore } from '@/store/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/screen/:screenId',
    name: 'Screen',
    props: true,
    component: () => import('@/views/screen/index.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/index.vue'),
    meta: { title: '找不到页面' },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


const whiteList = ['/login', '/auth-redirect', '/dev', '/share'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // set page title
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} | ${globalConfig.title}`
  } else {
    document.title = globalConfig.title
  }

  if (location.href.includes('share')) {
    next()
    return
  }
  // const userStore = useUserStore()
  // if (userStore.isLogin()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     if (userStore.role > 0) {
  //       next()
  //     } else {
  //       try {
  //         await userStore.getUserInfo()
  //         next({ ...to, replace: true })
  //       } catch (error) {
  //         userStore.resetToken()
  //         next(`/login?redirect=${to.path}`)
  //       }
  //     }
  //   }
  // } else if (whiteList.some(m => to.path.startsWith(m))) {
  next()
  // } else {
  //   next(`/login?redirect=${to.path}`)
  // }
})


export default router
