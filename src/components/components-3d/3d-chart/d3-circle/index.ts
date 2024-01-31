import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3Circle from './src/index.vue'

D3Circle.install = (app: App): void => {
  app.component('VD3Circle', D3Circle)
  app.component('VD3CircleProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3Circle as SFCWithInstall<typeof D3Circle>
