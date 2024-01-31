import { setComponentData } from '@/components/_mixins/use-data-center'

export const setComponentDataSimple = (com: any, apiKey = 'source') => {
  setComponentData(com.id, apiKey, com.apis.source, com.apiData.source)
}

export const checkOperator = (val1, operator, val2) => {
  switch (operator) {
    case '==':
      return val1 == val2
    case '>':
      return val1 > val2
    case '<':
      return val1 < val2
    case '>=':
      return val1 >= val2
    case '<=':
      return val1 <= val2
    case '!=':
      return val1 != val2
    default:
      return false
  }
}


export const parseFormatter = formatter => {
  return formatter ? formatter.type === EFormatterType.配置 ? formatter?.value?.replaceAll('*', '\n') : param => {
    const fun = new Function('param', formatter?.function)
    return fun(param)
  } : null
}

export const parseNotnullLabel = (config: any) => {
  const label = config.label.show ? {
    label: config.label,
  } : {
    label: {
      show: false,
    },
  }
  const labelLine = config.labelLine.show ? {
    labelLine: config.labelLine,
  } : {
    labelLine: {
      show: false,
    },
  }

  return {
    label,
    labelLine,
  }
}
