import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import NumberFlip from './src/index.vue'

NumberFlip.install = (app: App): void => {
  app.component('VNumberFlip', NumberFlip)
  app.component('VNumberFlipProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default NumberFlip as SFCWithInstall<typeof NumberFlip>
