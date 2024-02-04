import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import PageTable from './src/index.vue'

PageTable.install = (app: App): void => {
  app.component('VPageTable', PageTable)
  app.component('VPageTableProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default PageTable as SFCWithInstall<typeof PageTable>
