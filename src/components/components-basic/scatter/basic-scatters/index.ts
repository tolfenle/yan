/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2024-01-02 18:00:03
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BasicScatters from './src/index.vue'

BasicScatters.install = (app: App): void => {
  app.component('VBasicScatters', BasicScatters)
  app.component('VBasicScattersProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicScatters as SFCWithInstall<typeof BasicScatters>
