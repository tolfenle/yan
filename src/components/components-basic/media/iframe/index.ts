import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import Frame from './src/index.vue'

Frame.install = (app: App): void => {
  app.component('VFrame', Frame)
  app.component('VFrameProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default Frame as SFCWithInstall<typeof Frame>
