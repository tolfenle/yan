/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-20 09:58:30
 * @LastEditTime : 2023-12-21 17:57:05
 */
let center = JSON.parse(localStorage.getItem('center')) || [0, 0]

export default {
  center: center,
  provinceName: '陕西省',
  cityName: '西安市',
  pollutionArr: [
    { name: '周至县', value: 8 },
    { name: '长安区', value: 25 },
    { name: '蓝田县', value: 16 },
    { name: '高陵区', value: 2 },
    { name: '鄠邑区', value: 4 },
  ],
}
