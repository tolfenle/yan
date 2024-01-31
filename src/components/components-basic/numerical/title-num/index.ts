/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-06-27 10:32:43
 * @LastEditTime: 2022-06-27 10:33:07
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import TitleNum from './src/index.vue'

TitleNum.install = (app: App): void => {
  app.component('VTitleNum', TitleNum)
  app.component('VTitleNumProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default TitleNum as SFCWithInstall<typeof TitleNum>
