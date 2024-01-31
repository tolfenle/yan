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
import BasicPie from './src/index.vue'

BasicPie.install = (app: App): void => {
  app.component('VBasicPie', BasicPie)
  app.component('VBasicPieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicPie as SFCWithInstall<typeof BasicPie>
