import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3PieCircle from './src/index.vue'

D3PieCircle.install = (app: App): void => {
  app.component('VD3PieCircle', D3PieCircle)
  app.component('VD3PieCircleProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3PieCircle as SFCWithInstall<typeof D3PieCircle>
