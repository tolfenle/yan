/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2024-01-15 15:48:22
 */
import { netPost, netGet } from '@/utils/request'
import request from '@/utils/request'

export function getProjects() {
  return netPost('/admin/base/sys/department/list')
}

// 创建项目
export function createProject(data: any) {
  return netPost('/app/project/bigscreen/add', data)
}
// 删除项目
export function deleteProject(id: number | string) {
  return netPost('/app/screen/screen/delete', { ids: id })
}
export function deleteProjectComs(id: number | string) {
  return netPost('/app/coms/component/delete/by/screen', { id })
}


export function copyProject(id: number | string) {
  return netPost(`/app/screen/screen/copy`, { id })
}

export function updateProjectName(id: number | string, name: string) {
  return netPost(`/app/screen/screen/rename`, { id, name })
}

export function getShareUrl(id: number | string) {
  return netPost(`/app/screen/screen/publish/url`, { id })
}

export function getPublishInfo(id: number | string) {
  return netPost(`/app/screen/screen/publish/info`, { id })
}

export function publishApp(id: number | string, data: any) {
  return netPost(`/app/screen/screen/publish`, { id, ...data })
}

export function exportScreen(param) {
  return netPost(`/app/screen/screen/export/screen`, param, {
    responseType: 'blob',
  })
}

export function exportScreens(param) {
  return netPost(`/app/screen/screen/export/screens`, param)
}

// 获取可下载的文件列表
export function getScreenZipList(param) {
  return netPost(`/admin/release/release/page`, param)
}

export function publishTemplate(data) {
  return netPost(`/admin/template/template/template/add`, data)
}


// ===================================================old============================================================


export function getProject(id: number) {
  return request.get(`/project/${id}`)
}

export function moveProject(id: number | string, fromId: number | string, toId: number | string) {
  return request.put(`/project/${id}/group`, { fromId, toId })
}

export function createProjectGroup(data: any) {
  return request.post('/project/group', data)
}

export function deleteProjectGroup(id: number | string) {
  return request.delete(`/project/group/${id}`)
}

export function getMockTemplates() {
  return request.get('/project/template')
}
