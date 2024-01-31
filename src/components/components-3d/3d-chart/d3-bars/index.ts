import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3Bars from './src/index.vue'

D3Bars.install = (app: App): void => {
  app.component('VD3Bars', D3Bars)
  app.component('VD3BarsProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3Bars as SFCWithInstall<typeof D3Bars>
