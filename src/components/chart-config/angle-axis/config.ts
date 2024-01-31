import { cloneDeep }from 'lodash-es'
export const useChartAngleAxisConfig = (param = {}) => {
  const pubAxisConfig = cloneDeep(xAxisConfig)
  return {
    ...pubAxisConfig,
    polarIndex: 0,
    // startAngle: 90,
    // clockwise: true,
    ...param,
  }
}

export const parseAngleAxisConfig = config => {
  const { polarIndex, startAngle, clockwise } = config
  return {
    ...parseXaxisConfig(config),
    polarIndex,
    startAngle,
    clockwise,
  }
}
