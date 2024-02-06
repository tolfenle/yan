/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-31 14:54:34
 * @LastEditTime : 2024-02-06 10:38:12
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

const defaultConfig = {
  prop: '',
  label: '',
  // 日期
  width: 0,
  minWidth: 0,
  render: '',
  fixed: '', // left right
  align: 'left',
  formatter: '',
  type: 'text',
  // 日期
  date: {
    format: 'YYYY-MM-DD HH:mm:ss',
  },
  number: {
    suffix: '元',
    prefix: '',
    animation: useNumberAnimation(),
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
}

export class BasicTableSeries {
  public columns: typeof defaultConfig
  constructor(config) {
    this.columns = {
      ...defaultConfig,
      ...config,
    }
  }
}

/**
 * PageTable
 */
export class PageTable extends DatavComponent {
  config = {
    generate: useGenerateConfig({
      textStyle: {
        color: '#eeeeee',
        fontStyle: 'normal', // 'normal' 'italic'  'oblique'
        fontWeight: 'normal', // normal bold bolder lighter
        fontFamily: 'sans-serif', // 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'
        fontSize: 14,
      },
    }, true),
    page: {
      page: 'page',
      rows: 'rows',
      small: false,
      hideOnSinglePage: false,
      layout: ['prev', 'pager', 'next'],
      pageSize: [10, 20, 30, 40, 50, 100],
      position: 'flex-end',
      background: false,
      marginTop: 8,
      backgroundColor: useChartColor({ value: 'rgba(5, 28, 51, 0.54)' }),
      color: useChartColor({ value: '#e1e1e1' }),
      activeBg: useChartColor({ value: '#0b549d8a' }),
      activeColor: useChartColor({ value: '#eeeeee' }),
      disableBg: useChartColor({ value: 'rgba(5, 28, 51, 0.54)' }),
      disableColor: useChartColor({ value: '#e1e1e1' }),
    },
    table: {
      stripe: false,
      border: false,
      borderBottom: true,
      fit: true,
      showHeader: true,
      highlightCurrentRow: true,
      emptyText: '',
      showOverflowTooltip: true,
      borderStyle: {
        ...useCssBorder({
          borderWidth: 1,
          borderColor: '#363637',
        }),
      },
      borderBottomStyle: {
        ...useCssBorder({
          borderWidth: 1,
          borderColor: '#363637',
        }),
      },
      header: {
        height: 40,
        background: useChartColor({ isCss: true, value: 'rgba(5, 28, 51, 0.54)' }),
        ...useFontSimple({
          color: useChartColor({ value: '#eeeeee' }),
          fontSize: 14,
        }),
      },
      body: {
        height: 40,
        // 奇数行
        odd: {
          enable: false,
          background: useChartColor({ isCss: true, value: '' }),
          color: useChartColor({ value: '#eeeeee' }),
        },
        // 偶数行
        even: {
          enable: false,
          background: useChartColor({ isCss: true, value: '' }),
          color: useChartColor({ value: '#eeeeee' }),
        },
        background: useChartColor({ isCss: true, value: 'rgba(5, 28, 51, 0.24)' }),
        ...useFontSimple({
          color: useChartColor({ value: '#eeeeee' }),
        }),
      },
    },
    series: [
      new BasicTableSeries({ prop: 'date', label: '日期' }),
      new BasicTableSeries({ prop: 'name', label: '名称' }),
      new BasicTableSeries({ prop: 'address', label: '地址' }),
    ],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('PageTable', { w: 600, h: 400 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('data', { description: '值' }),
      createField('total', { description: '总条数' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    this.events = {}
    this.actions = {}

    return this
  }

  async loadData() {
    try {
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'table/page-table'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default PageTable
