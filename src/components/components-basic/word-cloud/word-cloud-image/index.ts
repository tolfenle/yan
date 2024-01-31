import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import WordCloudImage from './src/index.vue'

WordCloudImage.install = (app: App): void => {
  app.component('VWordCloudImage', WordCloudImage)
  app.component('VWordCloudImageProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default WordCloudImage as SFCWithInstall<typeof WordCloudImage>
