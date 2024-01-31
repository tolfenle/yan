
/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 18:08:49
 * @LastEditTime : 2024-01-26 17:40:19
 */
import { ComDataType } from '../system-components'
const COM_CDN = import.meta.env.VITE_APP_CDN

export const title: ComDataType = {
  type: 'title',
  name: '标题',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VPowerHtml',
      alias: '自定义HTML',
      img: `${COM_CDN}/timer-160-116.png`,
      thum: `${COM_CDN}/timer-370-208.png`,
      used: true,
    },
    {
      name: 'VTimer',
      alias: '时间器',
      img: `${COM_CDN}/timer-160-116.png`,
      thum: `${COM_CDN}-thum/timer-370-208.png`,
      used: true,
    },
    {
      name: 'VMainTitle',
      alias: '通用标题',
      img: `${COM_CDN}/main-title-332-144.png`,
      thum: `${COM_CDN}-thum/main-title-370-208.png`,
      used: true,
    }, {
      name: 'VNumberTitleFlop',
      alias: '数字翻牌器',
      img: `${COM_CDN}/number-title-flop-160-116.png`,
      thum: `${COM_CDN}-thum/number-title-flop-370-208.png`,
      used: true,
    }, {
      name: 'VWeatherApi',
      alias: '天气(外部API)',
      img: `${COM_CDN}/weather-api.png`,
      used: true,
    }, {
      name: 'VNumberFlip',
      alias: '翻牌器(纯数字)',
      img: `${COM_CDN}/number-flip.png`,
      used: true,
    }, {
      name: 'VMarquee',
      alias: '跑马灯',
      img: `${COM_CDN}/marquee-332-144.png`,
      thum: `${COM_CDN}-thum/marquee-370-208.png`,
      used: true,
    }, {
      name: 'VParagraph',
      alias: '多行文本',
      img: `${COM_CDN}/paragraph-160-116.png`,
      thum: `${COM_CDN}-thum/paragraph-370-208.png`,
      used: true,
    },
  ],
}
