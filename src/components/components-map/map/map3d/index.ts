/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-07 16:46:04
 * @LastEditTime : 2023-12-11 16:58:25
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Map3d from './src/index.vue'
import Map3dBar from './src/map3d-bar/index.vue'
// import China2dBubbles from './src/map3d-bubbles/index.vue'
import Map3dFlyingline from './src/map3d-flyingline/index.vue'

Map3d.install = (app: App): void => {
  app.component('VMap3d', Map3d)
  app.component('VMap3dBar', Map3dBar)
  // app.component('VChina2dBubbles', China2dBubbles)
  app.component('VMap3dFlyingline', Map3dFlyingline)

  app.component('VMap3dProp', loadAsyncComponent(() => import('./src/config.vue')))
  app.component('VMap3dBarProp', loadAsyncComponent(() => import('./src/map3d-bar/config.vue')))
  // app.component('VChina2dBubblesProp', loadAsyncComponent(() => import('./src/map3d-bubbles/config.vue')))
  app.component('VMap3dFlyinglineProp', loadAsyncComponent(() => import('./src/map3d-flyingline/config.vue')))
}

export default Map3d as SFCWithInstall<typeof Map3d>
