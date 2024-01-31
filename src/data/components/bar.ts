/*
 * @Author: fj
 * @LastEditors: fj
 * @description:
 * @updateInfo: 本次更新内容：
 * @Date: 2023-12-27 15:18:16
 * @LastEditTime: 2024-01-08 15:37:41
 */

import { ComDataType } from '../system-components'

const COM_CDN = import.meta.env.VITE_APP_CDN
export const bar: ComDataType = {
  type: 'bar',
  name: '柱状图',
  icon: 'v-icon-chart-bar',
  data: [
    {
      name: 'VBasicBar',
      alias: '柱状图',
      img: `${COM_CDN}/basic-bar-332-144.png`,
      thum: `${COM_CDN}/basic-bar-332-144.png`,
      used: true,
    }, {
      name: 'VWaterfullBar',
      alias: '瀑布柱状图',
      img: `${COM_CDN}/waterfull-bar-332-144.png`,
      thum: `${COM_CDN}/waterfull-bar-332-144.png`,
      used: true,
    }, {
      name: 'VBasicBars',
      alias: '多柱柱状图',
      img: `${COM_CDN}/basic-bars-332-144.png`,
      thum: `${COM_CDN}/basic-bars-332-144.png`,
      used: true,
    }, {
      name: 'VPolarBar',
      alias: '玉环图',
      img: `${COM_CDN}/arc-bar-160-116.png`,
      thum: `${COM_CDN}-thum/arc-bar-368-208.png`,
      used: true,
    }, {
      name: 'VStackBar',
      alias: '堆叠柱状图',
      img: `${COM_CDN}/stack-bar-332-144.png`,
      thum: `${COM_CDN}-thum/stack-bar-332-144.png`,
      used: true,
    }, {
      name: 'VLineBarChart',
      alias: '折线柱图',
      img: `${COM_CDN}/line-bar-chart-332-144.png`,
      thum: `${COM_CDN}-thum/line-bar-chart-368-208.png`,
      used: false,
    }, {
      name: 'VSingleBar',
      alias: '百分比单柱图',
      img: `${COM_CDN}/single-bar.png`,
      thum: `${COM_CDN}-thum/single-bar.png`,
      used: true,
    },
  ],
}

export const barChart = {
  type: 'barChart',
  name: '条形图',
  icon: 'v-icon-chart-bar',
  data: [
    {
      name: 'VBasicBarChart1',
      alias: '条形图1',
      img: `${COM_CDN}/basic-bar-332-144.png`,
      thum: `${COM_CDN}/basic-bar-332-144.png`,
      used: true,
    },
  ],
}
