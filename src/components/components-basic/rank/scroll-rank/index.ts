/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:39:25
 * @LastEditTime : 2023-11-29 17:42:22
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ScrollRank from './src/index.vue'

ScrollRank.install = (app: App): void => {
  app.component('VScrollRank', ScrollRank)
  app.component('VScrollRankProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ScrollRank as SFCWithInstall<typeof ScrollRank>
