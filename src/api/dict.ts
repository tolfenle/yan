import { netGet, netPost } from '@/utils/request'

const dictApi = {
  getDictTypes: async () => await netPost('/admin/dict/type/list'),
  getDictValues: async (types: string[]) => await netPost('/admin/dict/info/data', { types }),
}

export default dictApi
