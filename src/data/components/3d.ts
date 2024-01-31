/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-11 16:24:05
 * @LastEditTime : 2024-01-26 17:03:56
 */
import { ComDataType } from '../system-components'
const COM_CDN = import.meta.env.VITE_APP_CDN

export const D3Bar: ComDataType = {
  type: 'title',
  name: '柱状图',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VD3Bar',
      alias: '3D柱状图',
      img: `${COM_CDN}/d3-bar-332-144.jpg`,
      thum: `${COM_CDN}/d3-bar-332-144.jpg`,
      used: true,
    },
    {
      name: 'VD3Bars',
      alias: '3D多柱柱状图',
      img: `${COM_CDN}/d3-bars-332-144.jpg`,
      thum: `${COM_CDN}/d3-bars-332-144.jpg`,
      used: true,
    },
    {
      name: 'VD3BarStack',
      alias: '3D堆叠柱状图',
      img: `${COM_CDN}/d3-barstack-332-144.jpg`,
      thum: `${COM_CDN}/d3-barstack-332-144.jpg`,
      used: true,
    },
    {
      name: 'VD3Circle',
      alias: '3D圆柱图',
      img: `${COM_CDN}/d3-barcircle-332-144.jpg`,
      thum: `${COM_CDN}/d3-barcircle-332-144.jpg`,
      used: true,
    },
  ],
}

export const D3Pie: ComDataType = {
  type: 'title',
  name: '饼环图',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VD3Pie',
      alias: '3D饼图',
      img: `${COM_CDN}/d3-pie-332-144.jpg`,
      thum: `${COM_CDN}/d3-pie-332-144.jpg`,
      used: true,
    },
    {
      name: 'VD3PieCircle',
      alias: '3D圆环图',
      img: `${COM_CDN}/d3-circle-332-144.jpg`,
      thum: `${COM_CDN}d3-circle-332-144.jpg`,
      used: true,
    },
  ],
}

export const D3Line: ComDataType = {
  type: 'title',
  name: '折线图',
  icon: 'v-icon-title',
  data: [
    {
      name: 'VD3Line',
      alias: '3D折线图',
      img: `${COM_CDN}/d3-line-332-144.jpg`,
      thum: `${COM_CDN}/d3-line-332-144.jpg`,
      used: true,
    },
  ],
}

