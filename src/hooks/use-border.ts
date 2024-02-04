/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:33:07
 * @LastEditTime : 2024-01-26 18:02:22
 */
export const useDefaultBorder = (color?: string) => {
  return {
    // color: useChartColor(),
    borderColor: useChartColor(),
    borderWidth: 0,
    borderType: 'solid',
    borderDashOffset: 0,
    borderCap: 'butt',
    borderJoin: 'bevel',
    shadowBlur: 0,
    shadowColor: useChartColor(),
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1,
  }
}

export const setDefaultBorder = border => {
  if (!border) return {}
  return {
    ...border,
    // color: setChartColor(border.color),
    borderStyle: border.borderType,
    borderColor: setChartColor(border.borderColor),
    shadowColor: setChartColor(border.shadowColor),
    borderWidth: useNumberToPx(border.borderWidth),
    shadowBlur: useNumberToPx(border.shadowBlur),
    shadowOffsetX: useNumberToPx(border.shadowOffsetX),
    shadowOffsetY: useNumberToPx(border.shadowOffsetY),
    borderDashOffset: useNumberToPx(border.borderDashOffset),
  }
}

export const useCssBorder = (param = {}) => {
  return {
    borderColor: useChartColor(),
    borderWidth: 0,
    borderType: 'solid',
    borderRadius: 4,
    ...param,
  }
}
