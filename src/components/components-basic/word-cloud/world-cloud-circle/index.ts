/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-12 18:07:35
 * @LastEditTime : 2023-12-12 18:07:52
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WordCloudCircle from './src/index.vue'

WordCloudCircle.install = (app: App): void => {
  app.component('VWordCloudCircle', WordCloudCircle)
  app.component('VWordCloudCircleProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WordCloudCircle as SFCWithInstall<typeof WordCloudCircle>
