/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-20 11:48:20
 * @LastEditTime : 2023-11-20 11:48:56
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import SingleBar from './src/index.vue'

SingleBar.install = (app: App): void => {
  app.component('VSingleBar', SingleBar)
  app.component('VSingleBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default SingleBar as SFCWithInstall<typeof SingleBar>
