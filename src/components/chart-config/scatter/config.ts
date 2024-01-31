/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-06 10:57:40
 * @LastEditTime : 2024-01-02 17:26:06
 */
import { cloneDeep } from 'lodash-es'

export const useScatterConfig = (param = {}) => {

  return {
    type: 'scatter',
    symbol: {
      ...useSymbolConfigFunc(),
      symbolSize: 13,
    },
    effectType: 'ripple',
    rippleEffect: {
      color: useChartColor(),
      brushType: 'fill', // 'stroke' 和 'fill'
      period: 4,
      scale: 2.5,
      number: 3,
    },
    maxSize: 100,
    scale: 1,
    large: false,
    largeThreshold: 2000,
    label: {
      ...cloneDeep(useChartBaseLabel()),
      show: false,
    },
    itemStyle: cloneDeep(chartItemStyle),
    emphasis: {
      scale: 1,
      label: cloneDeep(useChartBaseLabel()),
      itemStyle: cloneDeep(chartItemStyle),
    },
    // 不常用属性
    legendHoverLink: true,
    coordinateSystem: 'cartesian2d',
    xAxisIndex: 0,
    yAxisIndex: 0,
    polarIndex: 0,
    geoIndex: 0,
    calendarIndex: 0,
    ...param,
  }
}


const TSCATTER = useScatterConfig()
export const parseScatterConfig = (config: TSCATTER) => {

  return {
    type: config.type,
    effectType: config.effectType,
    rippleEffect: {
      ...config.rippleEffect,
      color: setChartColor(config.rippleEffect.color.value),
    },
    maxSize: config.maxSize,
    scale: config.scale,
    large: config.large,
    largeThreshold: config.largeThreshold,
    label: {
      ...parseLabelConfig(config.label),
    },
    itemStyle: config?.itemStyle ? parseItemStyle(config?.itemStyle) : {},
    ...parseSymbolConfig(config.symbol),
  }
}
