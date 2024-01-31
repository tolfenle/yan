/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 14:31:22
 * @LastEditTime : 2023-11-22 15:09:16
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import EffectScatter from './src/index.vue'

EffectScatter.install = (app: App): void => {
  app.component('VEffectScatter', EffectScatter)
  app.component('VEffectScatterProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default EffectScatter as SFCWithInstall<typeof EffectScatter>
