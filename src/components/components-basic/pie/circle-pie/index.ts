/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2023-11-22 18:42:31
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import CirclePie from './src/index.vue'

CirclePie.install = (app: App): void => {
  app.component('VCirclePie', CirclePie)
  app.component('VCirclePieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default CirclePie as SFCWithInstall<typeof CirclePie>
