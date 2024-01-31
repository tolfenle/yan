import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3Line from './src/index.vue'

D3Line.install = (app: App): void => {
  app.component('VD3Line', D3Line)
  app.component('VD3LineProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3Line as SFCWithInstall<typeof D3Line>
