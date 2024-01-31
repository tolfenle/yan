import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WeatherApi from './src/index.vue'

WeatherApi.install = (app: App): void => {
  app.component('VWeatherApi', WeatherApi)
  app.component('VWeatherApiProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WeatherApi as SFCWithInstall<typeof WeatherApi>
