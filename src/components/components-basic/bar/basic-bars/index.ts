import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BasicBars from './src/index.vue'

BasicBars.install = (app: App): void => {
  app.component('VBasicBars', BasicBars)
  app.component('VBasicBarsProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BasicBars as SFCWithInstall<typeof BasicBars>
