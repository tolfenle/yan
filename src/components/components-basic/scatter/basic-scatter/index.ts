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
import BasicScatter from './src/index.vue'

BasicScatter.install = (app: App): void => {
  app.component('VBasicScatter', BasicScatter)
  app.component('VBasicScatterProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicScatter as SFCWithInstall<typeof BasicScatter>
