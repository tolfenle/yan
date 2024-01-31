/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2023-11-03 20:04:24
 */
import { netPost, netGet } from '@/utils/request'
import { updateComs } from './coms'
import { updateFilter } from './filter'

const PreviewKey = '金合可视化平台-Preview'

export function createScreen(data: any) {
  return netPost('/app/screen/screen/add', data)
}
export function createScreenByTemplate(data: any) {
  return netPost('/app/screen/screen/template', data)
}

export function getScreen(id: number | string) {
  return netGet(`/app/screen/screen/${id}`)
}

export function getScreenByProject(param) {
  return netGet(`/app/screen/screen/apps`, param)
}

export function updateScreen(data: any) {
  return netPost('/app/screen/screen/update', data)
}

export function saveScreen(data: any) {
  const resScreen = updateScreen({
    ...data.screen,
    ...data.config,
  })
  const resCom = updateComs(data.coms)

  Promise.all([resScreen, resCom]).then(() => {
    return {
      code: 1000,
      message: 'success',
      data: null,
    }
  })
}
