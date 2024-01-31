/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 18:10:40
 * @LastEditTime : 2023-12-12 18:46:53
 */
const COM_CDN = import.meta.env.VITE_APP_CDN

export const word: ComDataType = {
  type: 'word',
  name: '词云',
  icon: 'v-icon-other',
  data: [
    {
      name: 'VWordCloud',
      alias: '词云',
      img: `${COM_CDN}/word-cloud-160-116.png`,
      thum: `${COM_CDN}-thum/word-cloud-370-208.png`,
      used: true,
    },
    {
      name: 'VWordCloudCircle',
      alias: '可变词云',
      img: `${COM_CDN}/world-cloud-circle-332-144.png`,
      thum: `${COM_CDN}/world-cloud-circle-332-144.png`,
      used: true,
    },
    {
      name: 'VWordCloudImage',
      alias: '图片映射词云',
      img: `${COM_CDN}/word-cloud-image-332-144.png`,
      thum: `${COM_CDN}/word-cloud-image-332-144.png`,
      used: true,
    },
  ],
}
