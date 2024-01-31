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
import HalfPie from './src/index.vue'

HalfPie.install = (app: App): void => {
  app.component('VHalfPie', HalfPie)
  app.component('VHalfPieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default HalfPie as SFCWithInstall<typeof HalfPie>
