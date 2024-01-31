/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-12-05 13:42:39
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

export class ScrollTableSeries extends DatavChartSeries {
  public config
  constructor(name: string, param = {}) {
    super('ScrollTable', name)
    this.name = name
    this.config = {
      type: 'text',
      // 日期
      width: {
        auto: false,
        value: 100,
        isPercent: false,
      },
      date: {
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      event: [{
        static: true,
        use: true,
        key1: '',
        operator: '',
        key2: '',
        value: '',
        config: {
          ...chartFont,
          icon: '',
          layout: 'lr', // lr  rl
          ...useDefaultBorder(),
          background: useChartColor({ isCss: true }),
        },
      }],
      field: '',
      ...param,
    }
  }
}

/**
 * ScrollTable
 */
export class ScrollTable extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
      size: 'small', // small | 'medium' | 'large'
      single: {
        out: true,
        column: true, // 是否不设定行的分割线
        line: true, //是否不设定列的分割线，当参数值为 true 时，则单元格没有右边线
      },
      border: {
        show: false,
        ...useDefaultBorder(),
      },
      headerGap: 8,
      rowWap: 2,
      number: {
        animate: true,
        separator: true,
        suffix: '元',
        prefix: '',
      },
    },
    swiper: useSwiperConfig({
      row: 5,
    }),
    // 表头
    header: {
      background: useChartColor({ isCss: true, value: 'rgba(5, 28, 51, 0.54)' }),
      height: 45,
      font: {
        ...useFontSimple({
          color: useChartColor({ isText: true }),
          fontWeight: 600,
        }),
      },
      image: {
        use: false,
        url: '',
      },
    },
    // 奇数
    odd: {
      background: useChartColor({ isCss: true, value: 'rgba(14, 71, 129, 0.17)' }),
      font: {
        ...useFontSimple({
          color: useChartColor({ isText: true }),
        }),
        height: 35,
      },
      image: {
        use: false,
        url: '',
      },
    },
    // 偶数
    even: {
      background: useChartColor({ isCss: true, value: 'rgba(14, 71, 129, 0.17)' }),
      height: 35,
      font: {
        ...useFontSimple({
          color: useChartColor({ isText: true }),
        }),
      },
      image: {
        use: false,
        url: '',
      },
    },
    order: {
      show: true,
      addZero: true,
      width: 50,
      height: 30,
      name: '序号',
      ...useFontSimple(),
    },
    series: [
      new ScrollTableSeries('品牌', { field: 'name' }),
      new ScrollTableSeries('价格', {
        field: 'price',
        width: {
          auto: true,
          value: 60,
          isPercent: false,
        },
        event: [{
          static: true,
          use: true,
          key1: 'price',
          operator: '>=',
          key2: '',
          value: '7000',
          config: {
            ...chartFont,
            icon: '',
            layout: 'lr', // lr  rl
            ...useDefaultBorder(),
            color: useChartColor({ value: '#FF6300' }),
            background: useChartColor({ isCss: true }),
          },
        }],
      }),
      new ScrollTableSeries('颜色', {
        width: {
          auto: true,
          value: 60,
          isPercent: false,
        },
        field: 'color',
      }),
      new ScrollTableSeries('状态', {
        field: 'statu',
        width: {
          auto: true,
          value: 60,
          isPercent: false,
        },
        event: [{
          static: true,
          use: true,
          key1: 'statu',
          operator: '==',
          key2: '',
          value: '全新',
          config: {
            ...chartFont,
            icon: '',
            layout: 'lr', // lr  rl
            ...useDefaultBorder(),
            color: useChartColor({ value: '#0BD503' }),
            background: useChartColor({ isCss: true }),
          },
        }, {
          static: true,
          use: true,
          key1: 'statu',
          operator: '==',
          key2: '',
          value: '准新',
          config: {
            ...chartFont,
            icon: '',
            layout: 'lr', // lr  rl
            ...useDefaultBorder(),
            color: useChartColor({ value: '#85DB27' }),
            background: useChartColor({ isCss: true }),
          },
        }, {
          static: true,
          use: true,
          key1: 'statu',
          operator: '==',
          key2: '',
          value: '完好',
          config: {
            ...chartFont,
            icon: '',
            layout: 'lr', // lr  rl
            ...useDefaultBorder(),
            color: useChartColor({ value: '#08CD4D' }),
            background: useChartColor({ isCss: true }),
          },
        }, {
          static: true,
          use: true,
          key1: 'statu',
          operator: '==',
          key2: '',
          value: '良好',
          config: {
            ...chartFont,
            icon: '',
            layout: 'lr', // lr  rl
            ...useDefaultBorder(),
            color: useChartColor({ value: '#06CC90' }),
            background: useChartColor({ isCss: true }),
          },
        }],
      }),
      new ScrollTableSeries('介绍', { field: 'desc' }),
      new ScrollTableSeries('日期', {
        width: {
          auto: true,
          value: 100,
          isPercent: false,
        },
        field: 'date',
      }),
    ],
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('ScrollTable', { w: 500, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '索引值' }),
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
      const path = 'table/scroll-table'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ScrollTable
