/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-21 13:47:48
 * @LastEditTime : 2024-01-10 17:54:58
 */
import { cloneDeep } from 'lodash-es'

export const useChartLineConfig = (param = {}, isArea = false) => {
  const areaStyle = {
    color: useChartColor({ value: '', type: COLOR_TYPE.继承 }),
    origin: 'auto', // auto start end number
    shadowBlur: 10,
    shadowColor: useChartColor({ value: '#000' }),
    shadowOffset: [0, 0],
    opacity: 0.7,
    number: 0,
  }

  const itemStyleUnDecal = cloneDeep(chartItemStyle)
  delete itemStyleUnDecal.decal

  const config = {
    type: 'line',
    colorBy: 'series',
    coordinateSystem: 'cartesian2d',
    xAxisIndex: 0,
    yAxisIndex: 0,
    symbol: useSymbolConfigFunc(),
    legendHoverLink: true,
    stack: 'value',// value log
    stackStrategy: 'samesign',
    connectNulls: false,
    clip: true,
    step: false,
    selectedMode: 'series',
    smooth: false,
    smoothMonotone: 'x',
    sampling: 'lttb',
    label: cloneDeep({
      ...useChartBaseLabel(),
      show: false,
    }),
    endLabel: cloneDeep({
      ...useChartBaseLabel(),
      show: false,
    }),
    labelLine: {
      show: false,
      showAbove: true,
      length2: 8,
      smooth: false,
      minTurnAngle: 0,
      lineStyle: cloneDeep(chartLineStyle),
    },
    itemStyle: itemStyleUnDecal,
    lineStyle: cloneDeep(chartLineStyle),
  }
  if (isArea)
    config.areaStyle = { ...areaStyle }
  return {
    ...config,
    emphasis: {
      disabled: false,
      scale: 1.1,
      focus: 'none',
      blurScope: 'coordinateSystem',
      label: cloneDeep(useChartBaseLabel()),
      endLabel: cloneDeep(useChartBaseLabel()),
      labelLine: {
        show: false,
        showAbove: true,
        length2: 8,
        smooth: false,
        minTurnAngle: 0,
        lineStyle: cloneDeep(chartLineStyle),
      },
      itemStyle: cloneDeep(chartItemStyle),
      lineStyle: cloneDeep(chartLineStyle),
      areaStyle: { ...areaStyle },
    },
    select: {},
    ...param,
  }
}

const TYPE = typeof useChartLineConfig()

export const parseChartLineConfig = (config: TYPE) => {
  const setLabelColor = label => {
    return label.color.type === COLOR_TYPE.继承 && config.itemStyle.color.value.type !== COLOR_TYPE.单色 ? config.itemStyle.color.value : label.color
  }

  const markPoint = {
    ...config.markPoint,
    data: [],
  }
  const markLine = {
    ...config.markLine,
    data: [],
  }
  if (config?.markPoint?.show) {
    config.markPoint.type.min && markPoint.data.push({ type: 'min' })
    config.markPoint.type.max && markPoint.data.push({ type: 'max' })
    config.markPoint.type.average && markPoint.data.push({ type: 'average' })
  }

  if (config?.markLine?.show) {
    config.markLine.type.min && markLine.data.push({ type: 'min' })
    config.markLine.type.max && markLine.data.push({ type: 'max' })
    config.markLine.type.average && markLine.data.push({ type: 'average' })
  }

  let shadow: any = {
    shadowBlur: 0,
  }
  if (config.itemStyle.shadow) {
    shadow = {
      shadowBlur: config.itemStyle.shadowBlur,
      shadowColor: setChartColor(config.itemStyle.shadowColor),
      shadowOffsetX: config.itemStyle.shadowOffsetX,
      shadowOffsetY: config.itemStyle.shadowOffsetY,
    }
  }

  let areaStyle: any = null

  if (config.areaStyle) {
    areaStyle = config.areaStyle.color.type === COLOR_TYPE.继承 ? {} : {
      ...config.areaStyle,
      origin: config.areaStyle.origin !== 'number' ? config.areaStyle.origin : config.areaStyle.number,
      color: setChartColor(config.areaStyle.color),
    }
  }

  return {
    // ...config,
    type: config.type,
    colorBy: config.colorBy,
    coordinateSystem: config.coordinateSystem,
    xAxisIndex: config.xAxisIndex,
    yAxisIndex: config.yAxisIndex,
    legendHoverLink: config.legendHoverLink,
    stack: config.stack,
    stackStrategy: config.stackStrategy,
    connectNulls: config.connectNulls,
    clip: config.clip,
    step: config.step,
    selectedMode: config.selectedMode,
    smooth: config.smooth,
    smoothMonotone: config.smoothMonotone,
    sampling: config.sampling,
    ...parseSymbolConfig(config?.symbol),
    lineStyle: {
      ...config.lineStyle,
      color: setChartColor(config.lineStyle.color),
    },
    areaStyle,
    label: {
      ...config.label,
      ...config.label.font,
      color: setChartColor(setLabelColor(config.label.font), true),
      formatter: config?.label?.formatter ? config.label.formatter.type === EFormatterType.配置 ? config.label?.formatter?.value?.replaceAll('*', '\n') : param => {
        const fun = new Function('param', config.label?.formatter?.function)
        return fun(param)
      } : null,
    },
    endLabel: {
      ...config.endLabel,
      ...config.endLabel.font,
      color: setChartColor(setLabelColor(config.endLabel.font), true),
      formatter: config?.endLabel?.formatter ? config.endLabel.formatter.type === EFormatterType.配置 ? config.endLabel?.formatter?.value?.replaceAll('*', '\n') : param => {
        const fun = new Function('param', config.endLabel?.formatter?.function)
        return fun(param)
      } : null,
    },
    labelLine: {
      show: config.labelLine.show,
      lineStyle: {
        ...config.labelLine.lineStyle,
        color: setChartColor(config.labelLine.lineStyle.color),
      },
    },
    itemStyle: {
      ...config.itemStyle,
      color: setChartColor(config.itemStyle.color.value),
      ...shadow,
    },
    // emphasis: {
    //   // ...config.emphasis,
    //   scale: config.emphasis.scale,
    //   focus: config.emphasis.focus,
    //   blurScope: config.emphasis.blurScope,
    //   ...parseSymbolConfig(config?.emphasis?.symbol),
    //   disabled: !config.emphasis.disabled,
    //   label: {
    //     ...config.emphasis.label,
    //     ...config.emphasis.label.font,
    //     color: setChartColor(config.emphasis.label.font.color),
    //   },
    //   lineStyle: {
    //     ...config.emphasis.lineStyle,
    //     color: setChartColor(config.emphasis.lineStyle.color),
    //   },
    //   areaStyle: config.emphasis.areaStyle,
    //   itemStyle: {
    //     ...config.emphasis.itemStyle,
    //     ...parseSymbolConfig(config?.emphasis?.symbol),
    //     color: setChartColor(config.emphasis.itemStyle.color.value),
    //     shadowColor: setChartColor(config.emphasis.itemStyle.shadowColor),
    //   },
    // },
  }
}
