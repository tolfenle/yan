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
import RosePie from './src/index.vue'

RosePie.install = (app: App): void => {
  app.component('VRosePie', RosePie)
  app.component('VRosePieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default RosePie as SFCWithInstall<typeof RosePie>
