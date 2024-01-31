/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:33:05
 * @LastEditTime : 2024-01-15 18:19:18
 */
import { netPost, netGet } from '@/utils/request'

export const connecting = param => netPost('/admin/database/base/test/connection', param)

export const dbApi = {
  getSqltype: () => netPost('/app/datasource/source/list'),

  addDb: param => netPost('/admin/database/base/add', param),
  queryDb: () => netPost('/admin/database/base/lists'),
  updateDb: param => netPost('/admin/database/base/update', param),
  deleteDb: id => netPost(`/admin/database/base/delete`, { ids: [id] }),
  queryDBBases: id => netGet('/admin/database/base/bases', { id }),
  queryDBTables: param => netPost('/admin/database/base/tables', param),
  queryDBTableKeys: param => netPost('/app/database/base/table/keys', param),
}
