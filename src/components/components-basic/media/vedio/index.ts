import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Vedio from './src/index.vue'

Vedio.install = (app: App): void => {
  app.component('VVedio', Vedio)
  app.component('VVedioProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Vedio as SFCWithInstall<typeof Vedio>
