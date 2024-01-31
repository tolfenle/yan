/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:40:10
 * @LastEditTime : 2024-01-24 09:29:59
 */
export const useChartAnimationConfig = (param = {}) => {
  return {
    animation: true,
    animationThreshold: 2000, //动画的阈值 当单个系列显示的图形数量大于这个阈值时会关闭动画
    // animationDuration: function (idx) { // 越往后的数据时长越大
    //   return idx * 100
    // },
    animationDuration: {
      delary: false,
      delaryTime: 100,
      value: 1000,
    },
    animationEasing: 'linear',
    animationDelay: 0,
    animationDurationUpdate: {
      delary: false,
      delaryTime: 100,
      value: 1000,
    },
    animationEasingUpdate: 'linear',
    animationDelayUpdate: 0,
    ...param,
  }
}
const chartAnimationConfig = useChartAnimationConfig()
export type TChartAnimationConfig = typeof chartAnimationConfig

export const parseAnimation = (animation: typeof useChartAnimationConfig) => {
  const { delary, delaryTime, value } = animation.animationDuration
  const { delary: delaryU, delaryTime: delayTimeU, value: valueU } = animation.animationDurationUpdate
  return {
    ...animation,
    animationDuration: delary ? function (idx) {
      return idx * delaryTime
    } : value,
    // animationDelayUpdate: delaryU ? function (idx) {
    //   return idx * delayTimeU
    // } : valueU,
  }
}
