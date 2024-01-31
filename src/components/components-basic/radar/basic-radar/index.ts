import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BasicRadar from './src/index.vue'

BasicRadar.install = (app: App): void => {
  app.component('VBasicRadar', BasicRadar)
  app.component('VBasicRadarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicRadar as SFCWithInstall<typeof BasicRadar>
