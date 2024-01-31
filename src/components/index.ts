/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2023-12-22 19:10:37
 */
import type { App } from 'vue'
import DatavWrapper from './_internal/datav-wrapper.vue'

// 需要自动注册的组件目录
const modules = import.meta.glob([
  '@/components/**/index.ts',
  '!@/components/_*/**/*',
  '!@/components/ui/**/*',
  '!@/components/*',
])

const install = (app: App): void => {
  app.component('DatavWrapper', DatavWrapper)
  // 自动注册
  for (const i of Object.keys(modules)) {
    modules[i]().then((com: any) => {
      try {
        app.use(com.default)
      } catch (error) {
      }
    })
  }
}

export default {
  install,
}
