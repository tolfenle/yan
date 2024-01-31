/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-12 14:58:26
 * @LastEditTime : 2023-12-12 14:58:53
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WaterSvg from './src/index.vue'

WaterSvg.install = (app: App): void => {
  app.component('VWaterSvg', WaterSvg)
  app.component('VWaterSvgProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WaterSvg as SFCWithInstall<typeof WaterSvg>
