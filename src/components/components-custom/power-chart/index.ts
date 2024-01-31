import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import PowerChart from './src/index.vue'

PowerChart.install = (app: App): void => {
  app.component('VPowerChart', PowerChart)
  app.component('VPowerChartProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default PowerChart as SFCWithInstall<typeof PowerChart>
