/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2023-12-29 09:57:39
 */
import request from '@/utils/request'
import { netPost, netGet } from '@/utils/request'

export async function getCaptcha() {
  return await netGet('/admin/base/open/captcha', {
    height: 40,
    width: 100,
    color: '#2c3142',
  })
}

export async function login(param) {
  return await netPost('/admin/base/open/login', param)
}

export async function logout() {
  return await netPost('/admin/base/comm/logout')
}

export async function getInfo() {
  return await netGet('/admin/base/comm/person')
}
export async function getHomeImage() {
  return await netGet('/admin/base/sys/param/home/image')
}

export const sysApi = {
  getUserList: param => netPost('/admin/base/sys/user/page', param),
  addDep: param => netPost('/admin/base/sys/department/add', param),
  updateDep: param => netPost('/admin/base/sys/department/update', param),
  deleteDep: param => netPost(`/admin/base/sys/department/delete`, param),
}
