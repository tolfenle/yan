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
import Numerical3 from './src/index.vue'

Numerical3.install = (app: App): void => {
  app.component('VNumerical3', Numerical3)
  app.component('VNumerical3Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Numerical3 as SFCWithInstall<typeof Numerical3>
