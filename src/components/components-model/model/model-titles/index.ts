/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-13 18:11:00
 * @LastEditTime : 2024-01-11 11:12:45
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ModelTitles from './src/index.vue'

ModelTitles.install = (app: App): void => {
  app.component('VModelTitles', ModelTitles)
  app.component('VModelTitlesProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ModelTitles as SFCWithInstall<typeof ModelTitles>
