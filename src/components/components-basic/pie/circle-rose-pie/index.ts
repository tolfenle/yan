/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2023-11-22 15:09:16
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import CircleRosePie from './src/index.vue'

CircleRosePie.install = (app: App): void => {
  app.component('VCircleRosePie', CircleRosePie)
  app.component('VCircleRosePieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default CircleRosePie as SFCWithInstall<typeof CircleRosePie>
