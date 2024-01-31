/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-05 11:50:36
 */
import { netPost, netGet } from '@/utils/request'

export function getFilters(params) {
  return netPost('/admin/filter/filter/lists', params)
}

export function createFilter(data: any) {
  return netPost('/admin/filter/filter/add', data)
}

export function updateFilter(data: any) {
  return netPost(`/admin/filter/filter/update`, data)
}

export function updateFilterName(data: any) {
  return netPost(``, data)
}

export function deleteFilter(id: number | string) {
  return netPost(`/admin/filter/filter/delete`, { ids: [id] })
}
