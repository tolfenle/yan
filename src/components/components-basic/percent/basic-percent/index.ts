/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 12:16:17
 * @LastEditTime : 2023-11-23 12:16:55
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BasicPercent from './src/index.vue'

BasicPercent.install = (app: App): void => {
  app.component('VBasicPercent', BasicPercent)
  app.component('VBasicPercentProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicPercent as SFCWithInstall<typeof BasicPercent>
