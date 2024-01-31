/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 11:18:37
 * @LastEditTime : 2024-01-29 17:51:38
 */
export const yAxisConfig = {
  show: true,
  position: 'left', // 'left' right
  type: 'value', // 'value' 数值轴  'category' 类目轴  'time' 时间轴  'log' 对数轴
  name: {
    show: false,
    value: 'Y轴',
  },
  alignTicks: true,
  nameLocation: 'start', // 'start'  'middle'   'end'
  nameStyle: {
    ...chartFont,
    align: 'right',
    verticalAlign: 'top',
  },
  nameGap: 15, // 坐标轴名称与轴线之间的距离。
  nameRotate: 0,
  inverse: false,
  boundaryGap: true,
  minInterval: 0,
  silent: false,

  axisLine: {
    show: true,
    symbol: ['none', 'none'], // none arrow
    symbolSize: [10, 15],
    lineStyle: chartLineStyle,
  },
  axisTick: {
    show: true,
    alignWithLabel: true,
    inside: false,
    length: 5,
    lineStyle: chartLineStyle,
  },
  axisLabel: {
    show: true,
    interval: {
      auto: true,
      value: 0,
    },
    inside: false,
    rotate: 0,
    margin: 8,
    formatter: {
      // 字段
      fields: 'x',
      // 分隔符
      split: '',
      // 后缀
      suffix: '',
      // 前缀
      prefix: '',
      // 自定义函数
      diy: '',
    }, // '{value} kg'
    ...chartFont,
  },
  splitLine: {
    show: false,
    lineStyle: {
      ...chartLineStyle,
      color: ['#eee'],
    },
  },
}


export const parseYaxisConfig = (xAxis: typeof xAxisConfig, generate?: any) => {
  const nameTextStyle = {
    ...xAxis.nameStyle,
    color: setChartColor(xAxis.nameStyle.color),
  }
  if (!nameTextStyle.color) {
    delete nameTextStyle.color
  }

  return {
    ...xAxis,
    name: xAxis.name.show ? xAxis.name.value : '',
    nameTextStyle,
    axisLine: {
      ...xAxis.axisLine,
      lineStyle: {
        ...xAxis.axisLine.lineStyle,
        color: setChartColor(xAxis.axisLine.lineStyle.color.value ? xAxis.axisLine.lineStyle.color : generate?.lineStyle?.color),
      },
    },
    axisTick: {
      ...xAxis.axisTick,
      lineStyle: {
        ...xAxis.axisLine.lineStyle,
        color: setChartColor(xAxis.axisLine.lineStyle.color),
      },
    },
    axisLabel: {
      ...xAxis.axisLabel,
      interval: xAxis.axisLabel.interval.auto ? 'auto' : xAxis.axisLabel.interval.value,
      width: xAxis.axisLabel.width ? xAxis.axisLabel.width : null,
      color: setChartColor(xAxis.axisLabel.color),
    },
    splitLine: {
      ...xAxis.splitLine,
    },
  }
}
