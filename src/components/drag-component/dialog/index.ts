/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2023-12-13 14:39:14
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Dialog from './src/index.vue'

Dialog.install = (app: App): void => {
  app.component('VDialog', Dialog)
  app.component('VDialogProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Dialog as SFCWithInstall<typeof Dialog>
