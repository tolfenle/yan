/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-24 14:23:00
 */
import { DatavEChartsComponent, DatavChartSeries } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { EChartEasing } from '@/components/_models/echarts-animation'
import { _ } from 'iking-utils'

const defaultConfig = {
  top: {
    show: true,
    type: 'default',
    inline: true,
    showType: 'default', // default image
    image: '',
    prefix: 'TOP',
    showNum: 0,
    background: useChartColor({ value: chartGenerateColor[0], isCss: true }),
    borderColor: useChartColor({ value: '#fff' }),
    borderType: 'solid', // solid dotted dashed
    borderWidth: 0,
    borderRadius: [4, 4, 4, 4],
    padding: 2,
    font: _.cloneDeep(chartFont),
  },
  title: {
    show: true,
    font: {
      ...chartFont,
      color: useChartColor({ isText: true, value: '#fff' }),
    },
  },
  count: {
    show: true,
    // 数值是否在进度前
    inStart: true,
    suffix: '万元',
    font: {
      ...chartFont,
      color: useChartColor({ isText: true, value: '#fff' }),
      fontWeight: 600,
    },
  },
  progress: {
    show: true,
    font: {
      ...chartFont,
      color: useChartColor({ isText: true, value: '#fff' }),
      fontWeight: 600,
    },
    suffix: {
      value: '%',
      // font: chartFont({
      //   color: useChartColor({ isText: true, value: chartGenerateColor[0] }),
      //   fontWeight: 600,
      // })
    },
  },
  bar: {
    // 是否和数值同行显示
    inline: false,
    width: 6,
    borderColor: useChartColor({ value: '#fff' }),
    borderType: 'solid', // solid dotted dashed
    borderWidth: 0,
    borderRadius: [0, 0, 0, 0],
    color: useChartColor({ isCss: true, value: chartGenerateColor[0] }),
    background: useChartColor({ isCss: true, value: '#0000003b' }),
  },
}

export class ScrollRankSeries extends DatavChartSeries {
  public config
  constructor(name: string, param = {}) {
    super('ScrollRank', name)
    this.config = {
      ..._.cloneDeep(defaultConfig),
      ...param,
    }
  }
}

/**
 * ScrollRank
 */
export class ScrollRank extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
      top: {
        type: 'default',
      },
    },
    swiper: useSwiperConfig(),
    ..._.cloneDeep(defaultConfig),
    global: {
      rankKey: 'z',
      barGap: 8,
      progressLeft: 8,
      titleLeft: 8,
      streamer: {
        width: 50,
        color: useChartColor({ isCss: true, value: '#ffffff69' }),
        speed: 500,
        step: true,
      },
      header: {
        show: false,
        font: {
          ...chartFont,
          color: useChartColor({ isText: true, value: '#eee' }),
        },
      },
      col: [{
        name: '序号',
        width: 50,
      }, {
        name: '类别',
        width: 50,
      }, {
        name: '数量',
        width: 50,
      }, {
        name: '占比',
        width: 50,
      }],
    },
    series: [new ScrollRankSeries('TOP1')],
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('ScrollRank', { w: 500, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
      createField('z', { description: '占比' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本排行图接口',
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据项时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当双击数据项时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
    }

    this.disActions = [
      EVENT_COM_ACTION.更新数据, EVENT_COM_ACTION.重新请求, EVENT_COM_ACTION.显示, EVENT_COM_ACTION.切换显隐, EVENT_COM_ACTION.隐藏, EVENT_COM_ACTION.更新配置,
    ] as any[]

    this.actions = {
    }

    return this
  }

  async loadData() {
    try {
      const path = 'rank/scroll-rank'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ScrollRank
