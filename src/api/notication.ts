import { netPost, netGet } from '@/utils/request'


export const noticatApi = {
  getNewNotication: () => netPost('/admin/notication/notication/page', {
    page: 1,
    size: 1,
  }),
}
