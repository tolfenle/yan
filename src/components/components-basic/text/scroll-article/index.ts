/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-27 13:34:50
 * @LastEditTime : 2023-12-27 13:37:25
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ScrollArticle from './src/index.vue'

ScrollArticle.install = (app: App): void => {
  app.component('VScrollArticle', ScrollArticle)
  app.component('VScrollArticleProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ScrollArticle as SFCWithInstall<typeof ScrollArticle>
