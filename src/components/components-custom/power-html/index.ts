import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import PowerHtml from './src/index.vue'

PowerHtml.install = (app: App): void => {
  app.component('VPowerHtml', PowerHtml)
  app.component('VPowerHtmlProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default PowerHtml as SFCWithInstall<typeof PowerHtml>
