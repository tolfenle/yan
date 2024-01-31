/*
 * @Author       : wfl
 * @LastEditors: fj
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 18:08:05
 * @LastEditTime: 2024-01-04 17:41:32
 */
const COM_CDN = import.meta.env.VITE_APP_CDN

export const numerical: ComDataType = {
  type: 'numerical',
  name: '数值展示',
  icon: 'v-icon-relation',
  data: [
    {
      name: 'VNumerical1',
      alias: '数值展示1',
      img: `${COM_CDN}/number1-160-116.png`,
      thum: `${COM_CDN}/number1-160-116.png`,
      used: true,
    }, {
      name: 'VNumerical2',
      alias: '数值展示2',
      img: `${COM_CDN}/number2-160-116.png`,
      thum: `${COM_CDN}/number2-160-116.png`,
      used: true,
    }, {
      name: 'VNumerical3',
      alias: '数值展示3',
      img: `${COM_CDN}/numberical3.jpg`,
      thum: `${COM_CDN}/numberical3.jpg`,
      used: true,
    }, {
      name: 'VBaseList',
      alias: '数值展示4',
      img: `${COM_CDN}/base-list-332-144.png`,
      thum: `${COM_CDN}/base-list-332-144.png`,
      used: true,
    }, {
      name: 'VTitleNum',
      alias: '数值展示5',
      img: `${COM_CDN}/title-num-332-144.png`,
      thum: `${COM_CDN}/title-num-332-144.png`,
      used: true,
    }, {
      name: 'VNumerical4',
      alias: '数值展示6',
      img: `${COM_CDN}/numerical4.png`,
      thum: `${COM_CDN}/numerical4.png`,
      used: true,
    },
  ],
}
