
import { paramType, _ } from 'iking-utils'


/**
 * @description: 自定义label
 * @return {*}
 */
export const chartRichTextConfig = (option: any = {}) => {
  return {
    oneLine: true,
    param: {
      key: '',
      style: _.cloneDeep(chartFont),
    },
    suffix: {
      value: '',
      style: _.cloneDeep(chartFont),
    },
    ...option,
  }
}

export const ChartRichTextConfig = chartRichTextConfig()

/**
 * @description: 解析自定义label
 * @param {Array} configArr: label配置
 * @param {any} data: 图表数据
 * @return {*}
 */
export const parseChartRichlText = (configArr: Array<typeof ChartRichTextConfig>, data: any) => {
  if (!paramType.isArray(configArr))
    throw new Error('参数必须是数组')

  let formatter = ''
  const rich: any = {}
  configArr.forEach(config => {
    formatter += `{${config.param.key}|${data[config.param.key]}} {${config.param.key}1|${config.suffix.value}}${config.oneLine ? '\n' : ''}`
    rich[config.param.key] = {
      ...config.param.style,
      color: setChartColor(config.param.style.color),
    }
    rich[`${config.param.key}1`] = {
      ...config.suffix.style,
      color: setChartColor(config.suffix.style.color),
    }
  })
  return {
    formatter,
    rich,
  }
}
