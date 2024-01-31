import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Dater from './src/index.vue'

Dater.install = (app: App): void => {
  app.component('VDater', Dater)
  app.component('VDaterProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Dater as SFCWithInstall<typeof Dater>
