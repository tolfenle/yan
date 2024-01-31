/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-21 13:56:02
 * @LastEditTime : 2023-11-22 11:46:17
 */
const { setUrl } = useEnvUrl()

export const useSymbolConfigFunc = (param: any = {}) => {
  return {
    show: true,
    type: ESYMBOL_TYPE.默认图形,
    symbol: 'circle',
    image: '',
    svg: '',
    symbolSize: 1,
    symbolRotate: 0,
    symbolKeepAspect: true,
    showAllSymbol: 'auto',
    symbolOffset: [0, 0],
    silent: false,
    ...param,
  }
}

export const parseSymbolConfig = config => {
  if (!config) return { symbol: '' }
  return config?.show ? {
    symbolSize: config.symbolSize,
    symbolRotate: config.symbolRotate,
    symbolKeepAspect: config.symbolKeepAspect,
    showAllSymbol: config.showAllSymbol,
    symbolOffset: config.symbolOffset,
    silent: config.silent,
    symbol: config.type === 'image'
      ? `image://${setUrl(config?.image)}`
      : config?.symbol,
  } : { symbol: '' }
}
