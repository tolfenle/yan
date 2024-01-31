import { netPost, netGet } from '@/utils/request'

export async function getSysTemplates(data?: any) {
  return netPost('/admin/template/template/page', data )
}

export async function getSysTemplate(id: number) {
  return axios.get(`/templates/tpl-${id}.json`)
}
