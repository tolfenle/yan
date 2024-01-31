import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Numerical4 from './src/index.vue'

Numerical4.install = (app: App): void => {
  app.component('VNumerical4', Numerical4)
  app.component('VNumerical4Prop', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Numerical4 as SFCWithInstall<typeof Numerical4>
