/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2024-01-12 15:50:37
 */
import { netGet, netPost } from '@/utils/request'

export function getComs(screenId: number | string) {
  return netGet('/app/coms/component/coms', { screenId })
}

export function addCom(data: any) {
  return netPost('/app/coms/component/add', data)
}

export function addComs(data: any[]) {
  return netPost('/app/coms/component/adds', data)
}

export function updateComs(data: any[]) {
  return netPost('/app/coms/component/updates', data)
}

export function deleteComs(ids: string | string[]) {
  return netPost(`/app/coms/component/del`, ids)
}

export function copyCom(ids: string | string[]) {
  return netPost(`/app/coms/component/copy`, ids)
}

/**
 * A function that takes the "coms" parameter and sends a POST request to the "/admin/coms/component/collection" endpoint.
 *
 * @param {type} coms - The "coms" parameter is a collection of components.
 * @return {type} The return value is the result of the POST request.
 */
export function collectionComs(coms) {
  return netPost(`/admin/coms/component/collection`, coms)
}

export function getCollectComs() {
  return netGet('/admin/coms/component/list')
}

export const collectApi = {
  getCollectComs: () => netGet('/admin/coms/component/list'),
  deleteCollect: ids => netPost('/admin/coms/component/delete/collection', { ids: Array.isArray(ids) ? ids : [ids] }),
}
