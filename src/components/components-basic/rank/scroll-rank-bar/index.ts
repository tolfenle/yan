/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:39:25
 * @LastEditTime : 2023-12-01 15:48:22
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ScrollRankBar from './src/index.vue'

ScrollRankBar.install = (app: App): void => {
  app.component('VScrollRankBar', ScrollRankBar)
  app.component('VScrollRankBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ScrollRankBar as SFCWithInstall<typeof ScrollRankBar>
