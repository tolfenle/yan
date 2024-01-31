/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-27 17:52:25
 * @LastEditTime : 2023-12-27 17:52:44
 */
/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-05-24 14:01:32
 * @LastEditTime: 2022-05-24 14:02:13
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ScrollImg from './src/index.vue'

ScrollImg.install = (app: App): void => {
  app.component('VScrollImg', ScrollImg)
  app.component('VScrollImgProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default ScrollImg as SFCWithInstall<typeof ScrollImg>
