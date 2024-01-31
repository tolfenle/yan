/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-17 11:37:20
 * @LastEditTime : 2023-11-17 11:37:42
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import StackBar from './src/index.vue'

StackBar.install = (app: App): void => {
  app.component('VStackBar', StackBar)
  app.component('VStackBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default StackBar as SFCWithInstall<typeof StackBar>
