/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-07 16:46:04
 * @LastEditTime : 2023-12-26 15:50:54
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import ThreeMap from './src/index.vue'
import ThreeBar from './src/three-bar/index.vue'
import ThreePoint from './src/three-point/index.vue'
// import ThreeMapFlyingline from './src/ThreeMap-flyingline/index.vue'

ThreeMap.install = (app: App): void => {
  app.component('VThreeMap', ThreeMap)
  app.component('VThreeBar', ThreeBar)
  app.component('VThreePoint', ThreePoint)
  // app.component('VThreeMapFlyingline', ThreeMapFlyingline)

  app.component('VThreeMapProp', loadAsyncComponent(() => import('./src/config.vue')))
  app.component('VThreeBarProp', loadAsyncComponent(() => import('./src/three-bar/config.vue')))
  app.component('VThreePointProp', loadAsyncComponent(() => import('./src/three-point/config.vue')))
//   app.component('VThreeMapFlyinglineProp', loadAsyncComponent(() => import('./src/ThreeMap-flyingline/config.vue')))
}

export default ThreeMap as SFCWithInstall<typeof ThreeMap>
