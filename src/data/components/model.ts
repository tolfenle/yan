/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-13 19:00:42
 * @LastEditTime : 2023-12-14 13:38:51
 */
const COM_CDN = import.meta.env.VITE_APP_CDN

export const model: ComDataType = {
  type: 'model',
  name: '模型',
  icon: 'v-icon-chart-line',
  data: [
    {
      name: 'VModelTitles',
      alias: '3DTitles模型',
      img: `${COM_CDN}/model.png`,
      thum: `${COM_CDN}/model.png`,
      used: true,
    }, {
      name: 'VModelGltf',
      alias: 'GLTF模型',
      img: `${COM_CDN}/model.png`,
      thum: `${COM_CDN}/model.png`,
      used: false,
    },
  ],
}
