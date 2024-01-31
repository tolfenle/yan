/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:39:25
 * @LastEditTime : 2023-12-04 11:20:05
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ScrollTable from './src/index.vue'

ScrollTable.install = (app: App): void => {
  app.component('VScrollTable', ScrollTable)
  app.component('VScrollTableProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ScrollTable as SFCWithInstall<typeof ScrollTable>
