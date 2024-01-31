/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 18:11:44
 * @LastEditTime : 2024-01-19 10:57:01
 */
const COM_CDN = import.meta.env.VITE_APP_CDN
export const interactData: ComDataType = {
  type: 'interact-data',
  name: '数据类',
  icon: 'v-icon-interact',
  data: [
    {
      name: 'VPercentageBar',
      alias: '进度条',
      img: `${COM_CDN}/percentage-bar-332-144.png`,
      thum: `${COM_CDN}-thum/percentage-bar-370-208.png`,
      used: false,
    }, {
      name: 'VHtml',
      alias: '自定义HTML片段',
      img: `${COM_CDN}/custom-html.jpg`,
      thum: `${COM_CDN}/custom-html.jpg`,
      used: true,
    }, {
      name: 'VFrame',
      alias: 'IFRAME',
      img: `${COM_CDN}/iframe-160-116.png`,
      thum: `${COM_CDN}-thum/iframe-160-116.png`,
      used: true,
    }, {
      name: 'VBgBox',
      alias: '自定义背景块',
      img: `${COM_CDN}/bg-box-334-144.png`,
      thum: `${COM_CDN}-thum/bg-box-370-208.png`,
      used: true,
    },
  ],
}
