import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3Pie from './src/index.vue'

D3Pie.install = (app: App): void => {
  app.component('VD3Pie', D3Pie)
  app.component('VD3PieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3Pie as SFCWithInstall<typeof D3Pie>
