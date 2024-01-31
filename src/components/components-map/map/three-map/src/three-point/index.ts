import { ComType, DatavEChartsComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField, createFieldConfig } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * ThreePoint
 */
export class ThreePoint extends DatavEChartsComponent {
  config = {
    bottomRadius: 0.5,
    topRadius: 0.2,
    bottomColor: useChartColor({ value: '#EE4DA1' }),
    topColor: useChartColor({ value: '#ffffff' }),
    material: {
      transparent: true,
      side: 2,
      opacity: 1,
      vertexColors: true,
    },
    label: {
      show: true,
      z: 0.5,
      innerHTML: 'return `${data.name} ${data.value}万元`',
      style: {
        ...useFontSimple(),
      },
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]
  constructor() {
    super('ThreePoint', {}, ComType.subCom)

    this.initData()
  }

  initData() {
    const fields = [
      createField('name', { description: '名称' }),
      createField('adcode', {
        type: 'string',
        description: '行政区划代码',
        optional: true,
      }),
      createField('value', {
        type: 'number',
        description: '值',
        optional: true,
      }),
      createField('lonlat', {
        type: 'array',
        description: '坐标',
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
      const path = 'map/three-map-point'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ThreePoint
