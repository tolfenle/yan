import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import PolarBar from './src/index.vue'

PolarBar.install = (app: App): void => {
  app.component('VPolarBar', PolarBar)
  app.component('VPolarBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default PolarBar as SFCWithInstall<typeof PolarBar>
