/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-06-23 11:18:08
 * @LastEditTime: 2022-06-23 11:18:52
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BtnGroup from './src/index.vue'

BtnGroup.install = (app: App): void => {
  app.component('VBtnGroup', BtnGroup)
  app.component('VBtnGroupProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BtnGroup as SFCWithInstall<typeof BtnGroup>
