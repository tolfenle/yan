/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 15:16:39
 * @LastEditTime : 2024-01-24 13:32:54
 */

const { loadUrl, setUrl } = useEnvUrl()
export interface IChartColor {
}

export enum COLOR_TYPE {
  单色 = 'color',
  渐变 = 'liner',
  图片 = 'image',
  继承 = 'inherit'
}
const defaultColor = {
  type: COLOR_TYPE.单色,
  // 背景色
  isCss: false,
  // 文本色
  isText: false,
  // d3图表
  isD3: false,
  value: '',
  liner: '',
  image: {
    value: '',
    repeat: 'repeat', // 是否平铺，可以是 repeat 'repeat-x', 'repeat-y', 'no-repeat'
  }
}
export const useChartColor = (option: any = {}) => {
  return {
    ...defaultColor,
    ...option
  }
}
export const setChartColor = (color: typeof defaultColor, single = false) => {
  if (!color || typeof color === 'string') return color
  if (color.isDefault) {
    if (color.type === COLOR_TYPE.单色) {
      return color.value
    } else if (color.type === COLOR_TYPE.图片) {
      return setUrl(color.image.value)
    } else {
      return color.liner
    }
  }
  // 背景色
  if (color.isCss) {
    if (color.type === COLOR_TYPE.单色) {
      return {
        backgroundColor: color.value
      }
    } else if (color.type === COLOR_TYPE.渐变) {
      return {
        backgroundImage: color.liner
      }
    } else if (color.type === COLOR_TYPE.图片) {
      return {
        backgroundImage: `url(${setUrl(color.image.value)})`
      }
    }
  }
  // 文本色
  if (color.isText) {
    if (color.type === COLOR_TYPE.单色) {
      return {
        color: color.value
      }
    } else if (color.type === COLOR_TYPE.渐变) {
      return {
        backgroundImage: color.liner,
        '-webkit-background-clip': 'text',
        color: 'transparent'
      }
    }
  }

  if (color.type === COLOR_TYPE.单色) {
    return color.value
  } else if (color.type === COLOR_TYPE.渐变) {
    if (!color.liner) return ''
    const isLiner = color.liner.startsWith('linear-gradient')
    const color1 = color.liner.match(/rgba\(.+?\)/g)[1]
    const color2 = color.liner.match(/rgba\(.+?\)/g)[0]
    if (single) {
      return color1
    }

    // 图表色
    const middle = (Number.parseInt(color.liner.match(/\d+%/g)[1])) / 100
    const deg = isLiner ? Number.parseInt(color.liner.match(/\d+deg/g)[0]) : 0
    const fixColor1 = deg >= 180 ? color2 : color1
    const fixColor2 = deg >= 180 ? color1 : color2
    return isLiner ? {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: fixColor1 // 0% 处的颜色
      }, {
        offset: middle, color: fixColor2 // 100% 处的颜色
      }, {
        offset: 1, color: fixColor2 // 100% 处的颜色
      }],
      global: false // 缺省为 false
    } : {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: [{
        offset: 0, color: fixColor1 // 0% 处的颜色
      }, {
        offset: 1, color: fixColor2// 100% 处的颜色
      }],
      global: false // 缺省为 false
    }
  } else if (color.type === COLOR_TYPE.图片) {
    return {
      image: setUrl(color.image.value), // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
      repeat: color.image.repeat // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
    }
  } else {
    if (single) {
      if (!color.liner) return 'inherit'
      const color1 = color.liner.match(/rgba\(.+?\)/g)[1]
      return color1
    }
    return 'inherit'
  }
}

export const chartFont = {
  color: useChartColor(),
  fontFamily: null,
  fontStyle: null,
  fontSize: 12,
  fontWeight: null,
  width: null,
  height: null,
  lineHeight: null,
  padding: [0, 0, 0, 0],
  letterSpacing: 0,
  shadowColor: 'transparent',
  shadowBlur: 4,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  overflow: 'break', // 'truncate' 截断  'break' 换行 'breakAll' 换行
  ellipsis: '...', // 在overflow配置为'truncate'的时候，可以通过该属性配置末尾显示的文本
}

export const useFontSimple = (param = {}) => {
  return {
    color: useChartColor(),
    fontFamily: null,
    fontStyle: null,
    fontSize: 12,
    fontWeight: null,
    lineHeight: null,
    letterSpacing: 0,
    padding: [0, 0, 0, 0],
    ...param
  }
}

export const setFontConfig = (config) => {
  const color = config.color.isText ? setChartColor(config.color) as any : { color: setChartColor(config.color) }
  return {
    ...config,
    ...color,
    'font-size': useNumberToPx(config.fontSize),
    'letter-spacing': useNumberToPx(config.letterSpacing),
    padding: useNumberToPx(config.padding || [0, 0, 0, 0])?.join(' ')
  }
}

export const chartLineStyle = {
  color: useChartColor(),
  width: 1,
  type: 'solid', // 'solid' 'dashed' 'dotted'
  dashOffset: 0,
  shadowColor: 'transparent',
  shadowBlur: 4,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  opacity: 1,
  cap: 'butt',
  // TODO
  join: 'bevel', // 'bevel'  'round'  'miter'
}
