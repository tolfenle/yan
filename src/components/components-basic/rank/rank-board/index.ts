/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-06 11:50:29
 * @LastEditTime : 2023-12-06 11:50:38
 */
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import { loadAsyncComponent } from '@/utils/async-component'
import RankBoard from './src/index.vue'

RankBoard.install = (app: App): void => {
  app.component('VRankBoard', RankBoard)
  app.component('VRankBoardProp', loadAsyncComponent(() => import('./src/config.vue')))
}

export default RankBoard as SFCWithInstall<typeof RankBoard>
