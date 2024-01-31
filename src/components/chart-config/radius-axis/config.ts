/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-16 16:39:50
 * @LastEditTime : 2023-11-16 17:57:12
 */
import { cloneDeep } from 'lodash-es'

export const chartRadisAxisConfig = (param = {}) => {
  const pubAxisConfig = cloneDeep(xAxisConfig)
  return {
    ...pubAxisConfig,
    polarIndex: 0,
    ...param,
  }
}

export const parseRadisAxisConfig = config => {
  const { polarIndex } = config
  return {
    ...parseXaxisConfig(config),
    polarIndex,
  }
}
