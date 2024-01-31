import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Lottie from './src/index.vue'

Lottie.install = (app: App): void => {
  app.component('VLottie', Lottie)
  app.component('VLottieProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Lottie as SFCWithInstall<typeof Lottie>
