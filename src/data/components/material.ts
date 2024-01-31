/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 18:10:17
 * @LastEditTime : 2024-01-19 13:36:44
 */
const COM_CDN = import.meta.env.VITE_APP_CDN

export const material: ComDataType = {
  type: 'material',
  name: '素材',
  icon: 'v-icon-material',
  data: [
    {
      name: 'VMainImg',
      alias: '单张图片',
      img: `${COM_CDN}/main-img-334-144.png`,
      thum: `${COM_CDN}-thum/main-img-370-208.png`,
      used: true,
    }, {
      name: 'VScrollImg',
      alias: '轮播图片',
      img: `${COM_CDN}/scroll-image-370-208.gif`,
      thum: `${COM_CDN}/scroll-image-370-208.gif`,
      used: true,
    }, {
      name: 'VVedio',
      alias: '视频',
      img: `${COM_CDN}/main-video-334-144.png`,
      thum: `${COM_CDN}-thum/main-video-370-208.png`,
      used: true,
    }, {
      name: 'VLottie',
      alias: 'Lottie',
      img: `${COM_CDN}/lottie.png`,
      thum: `${COM_CDN}/lottie.png`,
      used: true,
    }, {
      name: 'VBorderBox',
      alias: '边框',
      img: `${COM_CDN}/border-box-162-116.png`,
      thum: `${COM_CDN}-thum/border-box-370-208.png`,
      used: true,
    }, {
      name: 'VDecoration',
      alias: '装饰',
      img: `${COM_CDN}/decoration-162-116.png`,
      thum: `${COM_CDN}-thum/decoration-370-208.png`,
      used: true,
    },
  ],
}
