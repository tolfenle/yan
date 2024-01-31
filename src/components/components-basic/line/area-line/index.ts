/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 11:16:04
 * @LastEditTime : 2023-11-22 11:49:41
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import AreaLine from './src/index.vue'

AreaLine.install = (app: App): void => {
  app.component('VAreaLine', AreaLine)
  app.component('VAreaLineProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default AreaLine as SFCWithInstall<typeof AreaLine>
