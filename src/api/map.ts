/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-12-08 17:51:53
 */
import { netPost, netGet } from '@/utils/request'

export const mapApi = {
  mapList: async param => await netPost('/app/map/map/page', param),
  addMap: async param => await netPost('/app/map/map/add', param),
  deleteMAp: async id => await netPost('/app/map/map/delete', { id }),
  mapLists: async () => await netPost('/app/map/map/list'),
}
