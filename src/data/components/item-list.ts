/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-11 16:24:05
 * @LastEditTime : 2024-01-11 16:25:28
 */
const COM_CDN = import.meta.env.VITE_APP_CDN

export const itemList: ComDataType = {
  type: 'title',
  name: '列表',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VScrollArticle',
      alias: '轮播列表',
      img: `${COM_CDN}/scroll-article.png`,
      thum: `${COM_CDN}scroll-article.png`,
      used: true,
    },
  ],
}
