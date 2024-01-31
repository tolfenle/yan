import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import BaseList from './src/index.vue'

BaseList.install = (app: App): void => {
  app.component('VBaseList', BaseList)
  app.component('VBaseListProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default BaseList as SFCWithInstall<typeof BaseList>
