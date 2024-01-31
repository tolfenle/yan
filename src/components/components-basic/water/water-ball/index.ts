/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-06-14 18:29:17
 * @LastEditTime: 2022-06-15 11:53:08
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WaterBall from './src/index.vue'

WaterBall.install = (app: App): void => {
  app.component('VWaterBall', WaterBall)
  app.component('VWaterBallProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WaterBall as SFCWithInstall<typeof WaterBall>
