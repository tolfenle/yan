import { setChartColor } from './../public/chartFont'
import { _ } from 'iking-utils'
const { setUrl } = useEnvUrl()

export const useChartBaseLabel = (param = {}) => {
  return {
    show: true,
    distance: 5,
    rotate: 0, // -90 90
    offset: [0, 0],
    position: 'top',
    formatter: {
      type: EFormatterType.配置,
      value: '{c}',
      function: 'return ',
    },
    align: 'center',
    erticalAlign: 'middle',
    font: {
      ...chartFont,
      color: useChartColor({
        type: COLOR_TYPE.继承,
      }),
    },
    ...param,
  }
}

// FIXME
export const chartItemStyle = {
  color: {
    auto: true,
    value: useChartColor(),
  },
  borderColor: '#000',
  borderType: 'solid', // solid dotted dashed
  borderWidth: 0,
  borderRadius: [0, 0, 0, 0],
  shadow: true,
  shadowBlur: 10,
  shadowColor: useChartColor(),
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 1,
  decal: {
    show: false,
    symbol: {
      type: 'default',
      value: '',
      image: '',
      svg: '',
    },
    symbolSize: 1,
    symbolKeepAspect: true,
    color: 'rgba(0, 0, 0, 0.2)',
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0, // -3  3
    maxTileWidth: 512,
    maxTileHeight: 512,
  },
}
export const useChartBarConfig = (param = {}) => {

  return {
    type: 'bar',
    name: '',
    legendHoverLink: true,
    coordinateSystem: 'cartesian2d',
    xAxisIndex: 0,
    yAxisIndex: 0,
    polarIndex: 0,
    roundCap: false,
    realtimeSort: false,
    showBackground: false,
    backgroundStyle: {
      color: useChartColor({
        value: 'rgba(180, 180, 180, 0.1)',
      }),
      borderColor: 'rgba(180, 180, 180, 0.2)',
      borderType: 'solid', // solid dotted dashed
      borderWidth: 0,
      borderRadius: [0, 0, 0, 0],
      opacity: 1,
    },
    label: _.cloneDeep(useChartBaseLabel()),
    labelLine: {
      show: false,
      lineStyle: {
        ...chartLineStyle,
        color: useChartColor({
          type: COLOR_TYPE.继承,
        }),
      },
    },
    itemStyle: _.cloneDeep(chartItemStyle),
    emphasis: {
      disabled: false,
      focus: 'none',
      label: _.cloneDeep(useChartBaseLabel()),
      itemStyle: _.cloneDeep(chartItemStyle),
    },
    select: {
      disabled: false,
      label: _.cloneDeep(useChartBaseLabel()),
      itemStyle: _.cloneDeep(chartItemStyle),
    },
    stack: '',
    stackStrategy: 'samesign',
    sampling: '',
    markPoint: {
      show: false,
      symbol: 'pin',
      symbolSize: [50, 50],
      symbolOffset: [0, 0],
      label: {
        formatter: '',
      },
      type: {
        min: true,
        max: true,
        average: true,
      },
    },
    markLine: {
      show: false,
      symbol: 'pin',
      precision: 2,
      label: {
        formatter: '',
      },
      type: {
        min: true,
        max: true,
        average: true,
      },
    },
    markArea: {},
    ...param,
  }
}

// 柱状图公共属性
export const useChartBarPubConfig = (param = {}) => {
  return {
    barGap: 1,
    barCategoryGap: 20,
    barWidth: {
      auto: false,
      value: 20,
      isPercent: false,
    },
    barMaxWidth: {
      auto: true,
      value: '',
      isPercent: false,
    },
    barMinWidth: {
      auto: true,
      value: '',
      isPercent: false,
    },
    ...param,
  }
}

const BarPubConfig = useChartBarPubConfig()
const BarConfig = useChartBarConfig()
// 解析公共属性
export const parseBarPubConfig = (config: typeof BarPubConfig) => {
  const obj: any = {
    barWidth: null,
    barMaxWidth: null,
    barMinWidth: null,
  }
  if (!config.barWidth.auto) {
    obj.barWidth = config.barWidth.isPercent
      ? `${config.barWidth.value}%`
      : config.barWidth.value
  }
  if (!config.barMaxWidth.auto) {
    obj.barMaxWidth = config.barMaxWidth.isPercent
      ? `${config.barMaxWidth.value}%`
      : config.barMaxWidth.value
  }
  if (!config.barMinWidth.auto) {
    obj.barMinWidth = config.barMinWidth.isPercent
      ? `${config.barMinWidth.value}%`
      : config.barMinWidth.value
  }
  return {
    barGap: config.barGap,
    barCategoryGap: config.barCategoryGap,
    ...obj,
  }
}

// 解析贴画图案配置
export const parseDecal = (decal: typeof chartItemStyle.decal) => {
  return decal?.show ? {
    ...decal,
    symbol:
      decal?.symbol?.type === 'image'
        ? `image://${setUrl(decal.symbol?.image)}`
        : decal.symbol?.value,
  } : null
}
// 解析series中的属性
export const parseBarConfig = (config: typeof BarConfig) => {
  const { decal } = config.itemStyle
  const markPoint = {
    ...config.markPoint,
    data: [],
  }
  const markLine = {
    ...config.markLine,
    data: [],
  }
  if (config.markPoint.show) {
    config.markPoint.type.min && markPoint.data.push({ type: 'min' })
    config.markPoint.type.max && markPoint.data.push({ type: 'max' })
    config.markPoint.type.average && markPoint.data.push({ type: 'average' })
  }

  if (config.markLine.show) {
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

  const labelTextColor = config.label.font.color.type === COLOR_TYPE.继承 && config.itemStyle.color.value.type !== COLOR_TYPE.单色 ? config.itemStyle.color.value : config.label.font.color

  return {
    ...config,
    backgroundStyle: {
      ...config.backgroundStyle,
      color: setChartColor(config.backgroundStyle.color),
    },
    label: {
      ...parseLabelConfig(config.label),
      color: setChartColor(labelTextColor, true),
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
      decal: parseDecal(decal),
    },
    emphasis: {
      ...config.emphasis,
      disabled: !config.emphasis.disabled,
      label: {
        ...config.emphasis.label,
        ...config.emphasis.label.font,
        color: setChartColor(config.emphasis.label.font.color),
      },
      itemStyle: {
        ...config.emphasis.itemStyle,
        color: setChartColor(config.emphasis.itemStyle.color.value),
        shadowColor: setChartColor(config.emphasis.itemStyle.shadowColor),
        decal: parseDecal(config.emphasis.itemStyle.decal),
      },
    },
    select: {
      ...config.select,
      label: {
        ...config.select.label,
        ...config.select.label.font,
        color: setChartColor(config.select.label.font.color),
      },
      itemStyle: {
        ...config.select.itemStyle,
        color: setChartColor(config.select.itemStyle.color.value),
        shadowColor: setChartColor(config.select.itemStyle.shadowColor),
        decal: parseDecal(config.select.itemStyle.decal),
      },
    },
  }
}

export const parseItemStyle = (itemStyle: any) => {
  const { decal } = itemStyle
  let shadow: any = {
    shadowBlur: 0,
  }
  if (itemStyle.shadow) {
    shadow = {
      shadowBlur: itemStyle.shadowBlur,
      shadowColor: setChartColor(itemStyle.shadowColor),
      shadowOffsetX: itemStyle.shadowOffsetX,
      shadowOffsetY: itemStyle.shadowOffsetY,
    }
  }

  const isAuto = itemStyle.color.hasOwnProperty('auto')

  return {
    ...itemStyle,
    color: isAuto ? itemStyle.color.auto ? 'inherit' : setChartColor(itemStyle.color?.value) : setChartColor(itemStyle.color),
    ...shadow,
    decal: parseDecal(decal),
  }
}

export const parseLineStyle = (lineStyle: typeof chartLineStyle) => {
  return {
    ...lineStyle,
    color: Array.isArray(lineStyle.color) ? lineStyle.color.map(co => setChartColor(co)) :  setChartColor(lineStyle.color),
  }
}

export const parseLabelConfig = (config: typeof chartLabelConfig) => {
  return {
    ...config,
    ...config.font,
    color: setChartColor(config?.font?.color, true),
    formatter: parseFormatter(config?.formatter),
  }
}

