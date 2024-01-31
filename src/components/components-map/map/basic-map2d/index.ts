import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BasicMap2d from './src/index.vue'

BasicMap2d.install = (app: App): void => {
  app.component('VBasicMap2d', BasicMap2d)
  app.component('VBasicMap2dProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicMap2d as SFCWithInstall<typeof BasicMap2d>
