/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2023-11-23 11:49:57
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import HalfCirclePie from './src/index.vue'

HalfCirclePie.install = (app: App): void => {
  app.component('VHalfCirclePie', HalfCirclePie)
  app.component('VHalfCirclePieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default HalfCirclePie as SFCWithInstall<typeof HalfCirclePie>
