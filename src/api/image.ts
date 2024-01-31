
import { netPost } from '@/utils/request'
// 获取平台图片分类
export function getImageType(params) {
  return netPost('/admin/space/type/page',params)
}
// 获取平台图片分类下的图片
export function getImageList(params) {
  return netPost('/admin/space/info/page',params)
}
// 获取系统的图片
export function getProjectImages(params) {
  return netPost('/app/files/file/list',params)
}
//
export function saveProjectFile(data: any) {
  return netPost('/app/base/comm/screen/file/add', data)
}

export function deleteProjectFile(data: any) {
  return netPost('/app/files/file/deletes', { ids: data })
}


