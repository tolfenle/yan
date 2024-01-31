import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import D3BarStack from './src/index.vue'

D3BarStack.install = (app: App): void => {
  app.component('VD3BarStack', D3BarStack)
  app.component('VD3BarStackProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default D3BarStack as SFCWithInstall<typeof D3BarStack>
