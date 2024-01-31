/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2023-11-23 18:28:40
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Numerical1 from './src/index.vue'

Numerical1.install = (app: App): void => {
  app.component('VNumerical1', Numerical1)
  app.component('VNumerical1Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Numerical1 as SFCWithInstall<typeof Numerical1>
