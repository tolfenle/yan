/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-30 12:22:27
 */
import Accounting from 'accounting'
import { getMap, registerMap } from 'echarts/core'
import { getStaticData } from '@/api/data'
import axios from 'axios'

export type MapChartType = 'China' | 'USA'

export const getAutoValue = (val: string | number) => {
  if (typeof val === 'number') {
    return val
  }

  return parseFloat(val) || null
}

export const getLimitValue = (val: string | number) => {
  if (val === 'dataMin' || val === 'dataMax') {
    return val
  }

  return getAutoValue(val)
}

export const valueFormater = (val: string, format: string) => {
  if (format === 'd') {
    return Accounting.toFixed(+val)
  }

  if (format === '.1f') {
    return Accounting.toFixed(+val, 1)
  }

  if (format === '.2f') {
    return Accounting.toFixed(+val, 2)
  }

  if (format === '.0%') {
    return `${Accounting.toFixed(parseFloat(val) * 100)}%`
  }

  if (format === '.1%') {
    return `${Accounting.toFixed(parseFloat(val) * 100, 1)}%`
  }

  if (format === '.2%') {
    return `${Accounting.toFixed(parseFloat(val) * 100, 2)}%`
  }

  if (format === 'th') {
    return Accounting.formatNumber(+val)
  }

  if (format === '.1t') {
    return Accounting.formatNumber(+val, 1)
  }

  if (format === '.2t') {
    return Accounting.formatNumber(+val, 2)
  }

  return val
}

// 不满足六位，末尾补0
export const padNumberToSixDigits = (num: number | string): string => {
  const numString = num.toString()
  if (numString.length >= 6) {
    return numString
  } else {
    return numString + '0'.repeat(6 - numString.length)
  }
}
export const registerMapAsync = async (mayType: string) => {
  const map = getMap(mayType)
  if (map) {
    return
  }
  const { setUrl } = useEnvUrl()
  const regex = /^\d+$/
  const res = await axios.get(`${setUrl('/public/mapjson')}/${regex.test(mayType)?padNumberToSixDigits(mayType) : mayType}.json`)
  registerMap(mayType, res.data)
}
