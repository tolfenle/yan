/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-22 13:47:39
 * @LastEditTime : 2024-01-10 18:50:44
 */
import { cloneDeep } from 'lodash-es'

// 饼图切换为圆环图
export const changePieToCircle = ({ radius }, bool) => {
  if(!radius?.[0]) return
  radius[0] = bool ? radius[1] - 20 : 0
}

export const useChartPieConfig = (param = {}, isRose = false) => {
  const roseObj = isRose ? {
    roseType: 'radius', // radius  area
  } : {}
  const borderStyle = cloneDeep(chartItemStyle)
  delete borderStyle.decal
  // 无数据时饼图样式
  const emptyCircleStyle = {
    color: useChartColor({ value: '#fff' }),
    ...borderStyle,
  }

  return {
    zlevel: 0,
    z: 2,

    colorBy: 'data',
    silent: false,
    legendHoverLink: true,
    avoidLabelOverlap: true,
    clockwise: true,
    stillShowZeroSum: true,
    showEmptyCircle: true,
    emptyCircleStyle,
    coordinateSystem: 'none',
    geoIndex: 0,
    calendarIndex: 0,
    selectedMode: 'series',
    selectedOffset: 10,
    startAngle: 90,
    minAngle: 0,
    minShowLabelAngle: 0,
    percentPrecision: 2,
    ...roseObj,

    label: {
      show: true,
      ...cloneDeep({
        ...chartFont,
        color: useChartColor({ type: COLOR_TYPE.继承 }),
      }),
      position: 'outside',
      formatter: {
        type: EFormatterType.配置,
        value: '{b}*{c}',
        function: 'return ',
      },
      rotate: 0,
      alignTo: 'labelLine',
      // position = outer & alignTo = edge
      edgeDistance: {
        isPersent: true,
        value: 25,
      },
      // position = outer & alignTo != edge
      bleedMargin: 10,
      distanceToLabelLine: 5,
    },
    labelLine: {
      show: true,
      showAbove: true,
      length: {
        auto: true,
        value: 10,
      },
      length2: {
        auto: true,
        value: 10,
      },
      smooth: false,
      minTurnAngle: 0,
      maxSurfaceAngle: 180,
      lineStyle: cloneDeep({
        ...chartLineStyle,
        color: useChartColor({ type: COLOR_TYPE.继承 }),
      }),
    },
    itemStyle: cloneDeep(chartItemStyle),

    emphasis: {
      disabled: true,
      scaleSize: 10,
      scale: true,
      focus: 'none',
      label: {
        show: true,
        ...cloneDeep(chartFont),
        position: 'outside',
        formatter: {
          type: EFormatterType.函数,
          value: '{c}',
          function: 'return ',
        },
        rotate: 0,
        alignTo: 'labelLine',
        // position = outer & alignTo = edge
        edgeDistance: {
          isPersent: true,
          value: 25,
        },
        // position = outer & alignTo != edge
        bleedMargin: 10,
        distanceToLabelLine: 5,
      },
      itemStyle: cloneDeep(chartItemStyle),
    },
    ...param,
  }
}

const TCHART_PIE = typeof useChartPieConfig()

export const parseChartPie = (config: TCHART_PIE) => {
  const getLabel = () => {
    const __label = config.label
    return __label.show ? {
      ...__label,
      formatter: parseFormatter(config?.label?.formatter),
      color: setChartColor(__label.color),
      edgeDistance: __label.edgeDistance.isPersent ? `${__label.edgeDistance.value}%` : __label.edgeDistance.value,
    } : {}
  }

  const getLabelLine = () => {
    const __line = cloneDeep(config.labelLine)
    const len = cloneDeep(__line)
    if (len.length.auto) {
      delete len.length
    } else {
      len.length = len.length.value
    }
    if (len.length2.auto) {
      delete len.length2
    } else {
      len.length2 = len.length2.value
    }

    const __color = __line.lineStyle.color.type === COLOR_TYPE.继承 ? {} : {
      color: setChartColor(__line.lineStyle.color),
    }
    if (__line.lineStyle.color.type === COLOR_TYPE.继承) {
      delete __line.lineStyle.color
    }
    return {
      ...len,
      lineStyle: {
        ...__line.lineStyle,
        ...__color,
      },
    }
  }

  const getItemStyle = () => {
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

    return {
      ...config.itemStyle,
      color: setChartColor(config.itemStyle.color.value),
      ...shadow,
      decal: parseDecal(config.itemStyle.decal),
    }
  }

  const rose = config.roseType ? { roseType: config.roseType } : {}
  return {
    // ...config,
    ...rose,
    colorBy: config.colorBy,
    silent: config.silent,
    legendHoverLink: config.legendHoverLink,
    avoidLabelOverlap: config.avoidLabelOverlap,
    clockwise: config.clockwise,
    stillShowZeroSum: config.stillShowZeroSum,
    showEmptyCircle: config.showEmptyCircle,
    emptyCircleStyle: config.emptyCircleStyle,
    coordinateSystem: config.coordinateSystem,
    geoIndex: config.geoIndex,
    calendarIndex: config.calendarIndex,
    selectedMode: config.selectedMode,
    selectedOffset: config.selectedOffset,
    startAngle: config.startAngle,
    minAngle: config.minAngle,
    minShowLabelAngle: config.minShowLabelAngle,
    percentPrecision: config.percentPrecision,
    emphasis: {
      disabled: !config.emphasis.disabled,
      scaleSize: config.emphasis.scaleSize ?? 10,
      scale: config.emphasis.scale ?? true,
    },
    label: getLabel(),
    labelLine: getLabelLine(),
    itemStyle: getItemStyle(),
  }
}
