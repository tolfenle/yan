import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Html from './src/index.vue'

Html.install = (app: App): void => {
  app.component('VHtml', Html)
  app.component('VHtmlProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Html as SFCWithInstall<typeof Html>
