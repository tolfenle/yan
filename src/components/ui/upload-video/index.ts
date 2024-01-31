/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-07-21 12:26:43
 * @LastEditTime: 2022-07-21 13:36:43
 */
import { App } from 'vue'
import UploadVideo from './src/index.vue'

UploadVideo.install = (app: App): void => {
  app.component(UploadVideo.name, UploadVideo)
}

export default UploadVideo
