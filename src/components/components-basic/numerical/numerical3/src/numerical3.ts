/*
 * @Author       : wfl
 * @LastEditors: fj
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:01
 * @LastEditTime: 2024-01-03 15:54:39
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { cloneDeep } from 'lodash-es'

export enum ENumType {
  '数值图标题' = 1,
  '数值图标图标题' = 2,
  '图数值' = 3
}

export const usePublicConfig = () => {

  return {
    label: {
      align: 'center',
      valign: 'flex-start',
      animate: true,
      position: {
        top: 20,
        left: 45,
      },
      font: cloneDeep({
        ...chartFont,
        color: useChartColor({ value: '#F0F0F0', isText: true }),
      }),
      number: cloneDeep({
        ...chartFont,
        fontFamily: 'Number1',
        color: useChartColor({ value: '#fff', isText: true }),
        fontSize: 28,
        bottom: 6,
      }),
      suffix: {
        show: true,
        font: {
          ...cloneDeep(chartFont),
          fontSize: 12,
        },
        left: 5,
      },
      percent: {
        show: true,
        title: '趋势',
        font: {
          ...cloneDeep(chartFont),
          color: useChartColor({ isText: true, value: '#dedede' }),
          fontSize: 12,
        },
        left: 5,
        icon: {
          url: '',
          left: 5,
        },
      },
    },
    image: {
      url: '',
      size: [110, 110],
      padding: 8,
      left: 0,
      top: 0,
    },
  }
}

export class Numerical3Series {
  public config
  constructor(name, param = {}) {
    this.name = name
    this.config = {
      ...usePublicConfig(),
      ...param,
    }
  }
}
/**
 * Numerical3
 */
export class Numerical3 extends DatavComponent {
  config = {
    generate: {
      type: ENumType.图数值,
      showSeparator: true,
      precision: 0,
      gap: [16, 16],
      duration: 3000,
      // 每行显示数量
      lineCount: 2,
      configType: 'basic',
    },
    ...usePublicConfig(),
    global: {
      scroll: {
        use: false,
        ...useSwiperConfig(),
      },
    },
    animation: useNumberAnimation(),
    event: [{
      static: true,
      use: true,
      key1: '',
      operator: '',
      key2: '',
      value: '',
      config: usePublicConfig(),
    }],
    series: [new Numerical3Series('系列1', {
      image: {
        url: 'public/uploads/___17___/c0a3fe2d5ce44929b21a1b3541349a89_34114c08fb8d49698affa49105a21e68_底座元素28-2.png',
        size: [50, 50],
        padding: 8,
      },
    }), new Numerical3Series('系列2', {
      image: {
        url: 'public/uploads/___17___/c0a3fe2d5ce44929b21a1b3541349a89_34114c08fb8d49698affa49105a21e68_底座元素28-2.png',
        size: [50, 50],
        padding: 8,
      },
    }), new Numerical3Series('系列3', {
      image: {
        url: 'public/uploads/___17___/c0a3fe2d5ce44929b21a1b3541349a89_34114c08fb8d49698affa49105a21e68_底座元素28-2.png',
        size: [50, 50],
        padding: 8,
      },
    }), new Numerical3Series('系列4', {
      image: {
        url: 'public/uploads/___17___/c0a3fe2d5ce44929b21a1b3541349a89_34114c08fb8d49698affa49105a21e68_底座元素28-2.png',
        size: [50, 50],
        padding: 8,
      },
    })],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Numerical3', { w: 400, h: 228 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('title', { description: '标题', optional: true }),
      createField('count', { description: '值', optional: true }),
      createField('percent', { description: '占比/幅度', optional: true }),
      createField('suffix', { description: '后缀', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)
    this.events = {
      change: {
        description: '当数据变化时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      click: {
        description: '当点击击数据时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
    }

    this.disActions = [
      EVENT_COM_ACTION.更新数据, EVENT_COM_ACTION.重新请求, EVENT_COM_ACTION.显示, EVENT_COM_ACTION.切换显隐, EVENT_COM_ACTION.隐藏, EVENT_COM_ACTION.更新配置,
    ] as any[]


    return this
  }

  async loadData() {
    try {
      const path = 'numerical/numerical3'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Numerical3
