/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 12:02:04
 * @LastEditTime : 2023-12-11 14:18:58
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
 * Map3dBar
 */
export class Map3dBar extends DatavEChartsComponent {
  config = {
    type: 'bar3D',
    name: '',
    coordinateSystem: 'geo3D',
    geo3DIndex: 0,
    bevelSmoothness: 2,
    stack: '',
    stackStrategy: 'samesign',
    minHeight: 0,
    barSize: 0.7,
    scale: 1,
    itemStyle: {
      color: useChartColor({ value: COLORS[0] }),
      opacity: 1,
    },
    label: {
      ...cloneDeep(useChartBaseLabel()),
      show: false,
    },
    emphasis: {
      itemStyle: {
        color: [useChartColor({ value: COLORS[0] }), useChartColor({ value: COLORS[1] }), useChartColor({ value: COLORS[2] })],
        opacity: 1,
      },
      label: {
        ...cloneDeep(useChartBaseLabel()),
      },
    },
    shading: 'color',
    //shading === realistic
    realisticMaterial: {
      detailTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
      textureTiling: 1,
      textureOffset: 0,
      roughness: 0.5,
      metalness: 0,
      roughnessAdjust: 0.5,
      metalnessAdjust: 0.5,
      ormalTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
    },
    //shading === lambert
    lambertMaterial: {
      detailTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '/public/uploads/___11___/50e5d482a7f7469e8720be3fbe2a21ff_背景13.jpg', repeat: 'repeat' } }),
      textureTiling: 1,
      textureOffset: 0,
    },
    //shading === color
    colorMaterial: {
      detailTexture: useChartColor({ type: COLOR_TYPE.图片, image: { value: '', repeat: 'repeat' } }),
      textureTiling: 1,
      textureOffset: 0,
    },
    animation: cloneDeep(useChartAnimationConfig()),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]
  constructor() {
    super('Map3dBar', {}, ComType.subCom)

    this.initData()
  }

  initData() {
    const fields = [
      createField('lon', { description: '经度' }),
      createField('lat', {
        type: 'string',
        description: '维度',
        optional: true,
      }),
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
      const path = 'map/map3d-bar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Map3dBar
