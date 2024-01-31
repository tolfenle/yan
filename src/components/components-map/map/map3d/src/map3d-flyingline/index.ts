/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 12:02:04
 * @LastEditTime : 2024-01-24 09:34:13
 */
import { cloneDeep } from 'lodash-es'
import { ComType, DatavEChartsComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField, createFieldConfig } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
const COLORS = glThemeList[0]

/**
 * Map3dFlyingline
 */
export class Map3dFlyingline extends DatavEChartsComponent {
  config = {
    type: 'lines3D',
    name: '',
    coordinateSystem: 'geo3D',
    geo3DIndex: 0,
    bevelSmoothness: 2,
    stackStrategy: 'samesign',
    polyline: true,
    effect: {
      show: true,
      period: 4,
      trailWidth: 4,
      trailLength: 0.1,
      trailColor: {
        same: true,
        value: useChartColor({ value: COLORS[0] }),
      },
      trailOpacity: {
        same: true,
        value: 1,
      },
    },
    lineStyle: {
      color: useChartColor({ value: COLORS[0] }),
      opacity: 0.5,
      width: 1,
    },
    blendMode: 'source-over',
    animation: cloneDeep(useChartAnimationConfig()),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]
  constructor() {
    super('Map3dFlyingline', {}, ComType.subCom)

    this.initData()
  }

  initData() {
    const fields = [
      createField('from', { description: '起始坐标' }),
      createField('to', { description: '结束坐标' }),
      createField('name', {
        type: 'number',
        description: '名称',
        optional: true,
      }),
      createField('value', {
        type: 'string',
        description: '值',
        optional: true,
      }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    const fileConfig = createFieldConfig({ description: '区域关联id' })
    this.events = {
      click: {
        description: '点击区域时',
        fields: {
          area_id: { ...fileConfig },
        },
      },
      mouseout: {
        description: '鼠标移出区域触发',
        fields: {
          area_id: { ...fileConfig },
        },
      },
      mouseover: {
        description: '鼠标移入区域触发',
        fields: {
          area_id: { ...fileConfig },
        },
      },
    }
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      const path = 'map/map3d-flyingline'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Map3dFlyingline
