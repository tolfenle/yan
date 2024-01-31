/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:09:50
 * @LastEditTime : 2024-01-24 14:10:17
 */
export const chartGenerateColor = ['#85A5FF', '#597EF7', '#2F54EB', '#1D39C4', '#10239E', '#061178', '#030852']

export const useGenerateConfig = (param = {}, simple = false) => {
  const chartGenerate = simple ? {} : {
    lineStyle: {
      color: {
        type: COLOR_TYPE.单色,
        value: '#dedede',
        liner: '',
        image: {
          value: '',
          repeat: 'repeat', // 是否平铺，可以是 repeat 'repeat-x', 'repeat-y', 'no-repeat'
        },
      },
    },
  }
  return {
    sameColor: false,
    changeXY: false,
    // 统一配色
    color: chartGenerateColor,
    textStyle: {
      color: '#dedede',
      fontStyle: 'normal', // 'normal' 'italic'  'oblique'
      fontWeight: 'normal', // normal bold bolder lighter
      fontFamily: 'sans-serif', // 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'
      fontSize: 12,
    },
    info: {
      type: 'normal', // normal detail
    },
    bgAnimate: '',
    bgImage: '',
    configType: 'basic',
    ...chartGenerate,
  }
}

const generateConfig = useGenerateConfig()
export type TGenerateConfig = typeof generateConfig

export const setGenerateConfig = (config: TGenerateConfig) => {

}

export const changeBarToLineBar = (changeXY, xAxis, yAxis) => {
  if (changeXY) {
    xAxis.type = 'value'
    yAxis.type = 'category'
    yAxis.data = xAxis.data
    delete xAxis.data
  }
  // if (!xAxis.data)避免首次渲染丢失数据
  else if (!xAxis.data) {
    yAxis.type = 'value'
    xAxis.type = 'category'
    xAxis.data = yAxis.data
    delete yAxis.data
  }
}
