import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WaterfullBar from './src/index.vue'

WaterfullBar.install = (app: App): void => {
  app.component('VWaterfullBar', WaterfullBar)
  app.component('VWaterfullBarProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WaterfullBar as SFCWithInstall<typeof WaterfullBar>
