/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 14:26:58
 * @LastEditTime : 2024-01-19 14:01:09
 */
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import {
  ApiConfigMap, ApiDataConfigMap, initApiConfig, initApiData,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'
import { createField } from '../../../../_models/data-field'

export interface IDiv {
  isDiv: boolean
  width: number
  height: number
  color: string
  backgroundColor: string

  fontSize: number
  fontWeight: number
  fontFamily: string

  roate: number
  image: string
  borderWidth: number
  borderColor: string
  borderRadius: number
}

const def = {
  isDiv: true,
  image: '',
  color: useChartColor({ value: '#fff' }),
  backgroundSize: 'contain',
  shadow: {
    shadowColor: useChartColor({ value: '#000' }),
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  },
}

export class BtnGroup extends DatavComponent {
  config = {
    global: {
      width: 80,
      height: 40,
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
      fontWeight: 500,
      letterSpacing:1,
      roate: 0,
      borderWidth: 0,
      borderType: 'solid',
      borderRadius: 0,
      shadow: {
        shadowColor: useChartColor({ value: '#000' }),
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      radius: {
        t: 0,
        r: 0,
        b: 0,
        z: 0,
      },
      btn: {
        t: 0,
        r: 0,
        b: 0,
        z: 0,
      },
    },
    padding: {
      t: 0,
      r: 0,
      b: 0,
      z: 0,
    },
    margin: {
      t: 0,
      r: 0,
      b: 0,
      z: 0,
    },
    defaul: {
      ...def,
      backgroundColor: useChartColor({ value: '#2681ff' }),
      borderColor: useChartColor({ value: '#2681ff' }),
    },
    hover: {
      show: true,
      ...def,
      backgroundColor: useChartColor({ value: '#2681ffb8' }),
      borderColor: useChartColor({ value: '#2681ffb8' }),
    },
    active: {
      show: true,
      ...def,
      backgroundColor: useChartColor({ value: '#2681ff' }),
      borderColor: useChartColor({ value: '#2681ff' }),
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('BtnGroup', { w: 200, h: 30 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '名称' }),
      createField('y', { description: '参数' }),
      createField('s', { description: '是否选中' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '按钮组接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击按钮时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当双击按钮时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      hover: {
        description: '当鼠标滑过时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
    }

    this.actions = {
    }
    return this
  }

  async loadData() {
    try {
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'button/btn-group'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default BtnGroup
