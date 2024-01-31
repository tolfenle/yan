import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3Bar from './src/index.vue'

D3Bar.install = (app: App): void => {
  app.component('VD3Bar', D3Bar)
  app.component('VD3BarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3Bar as SFCWithInstall<typeof D3Bar>
