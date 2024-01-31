import { mapApi } from '@/api/map'
import { ikStore } from 'iking-utils'

export const useChartMap = async () => {
  const map = await mapApi.mapLists()
  if (map.code === 1000) {
    ikStore.local.setItem(ELOCAL_TYPE.地图, map.data)
    return map.data
  } else {
    return []
  }
}
