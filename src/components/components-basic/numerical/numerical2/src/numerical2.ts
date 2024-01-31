/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:01
 * @LastEditTime : 2024-01-11 18:33:47
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

export const usePublicConfig = () => {

  return {
    range: {
      isAdd: true,
      icon: {
        show: true,
        url: '',
        style: {
          ...useFontSimple({
            fontSize: 18,
          }),
        },
      },
      style: {
        ...useFontSimple({
          color: useChartColor({ value: '#fff', isText: true }),
          fontSize: 18,
        }),
      },
    },
    background: useChartColor({ value: '#03172E', isCss: true }),
    chart: {
      show: true,
      type: 'bar', // barVer  line area  pie  bar
      color: useChartColor({ type: 'liner', liner: 'linear-gradient(0deg, rgba(8, 43, 78, 1) 0%, rgba(22, 117, 218, 1) 100%)' }),
      width: 8,
      gap: true,
      label: {
        ...useFontSimple(),
      },
    },
    shadow: {
      color: '',
      blur: 5,
      offset: [0, 0],
    },
    border: {
      custom: false,
      width: 0,
      type: '',
      radius: '',
      color: '',
      left: {
        width: 0,
        type: '',
        color: '',
      },
      right: {
        width: 0,
        type: '',
        color: '',
      },
      top: {
        width: 0,
        type: '',
        color: '',
      },
      bottom: {
        width: 0,
        type: '',
        color: '',
      },
    },
    labelFont: cloneDeep({
      ...useFontSimple({
        color: useChartColor({ value: '#F0F0F0', isText: true }),

      }),
    }),
    numberFont: cloneDeep({
      ...useFontSimple({
        fontFamily: 'Number1',
        color: useChartColor({ value: '#fff', isText: true }),
        fontSize: 28,
      }),
    }),
    suffix: {
      show: true,
      font: cloneDeep(useFontSimple()),
    },
  }
}

export class Numerical2Series {
  constructor(mame) {
    this.name = name
  }
  config = usePublicConfig()
}
/**
 * Numerical2
 */
export class Numerical2 extends DatavComponent {
  config = {
    generate: {
      width: 240,
      height: 120,
      showSeparator: true,
      precision: 0,
      gap: [16, 16],
      duration: 3000,

      configType: 'basic',
      lr: 'icon-left', // icon-left  icon-right  icon-top  icon-bottom
      labelTb: 'label-top', // label-top  label-bottom
      vAlign: 'middle', // middle  top  bottom
      hAlign: 'left', // left  center  right
      padding: [10, 10, 10, 10],
      labelGap: 6, // label和number间距
      radius: [8, 8, 8, 8],
      iconGap: 18,
      background: useChartColor({ value: '#03172E', isCss: true }),
      iconSize: [50, 50],
      // 每行显示数量
      lineCount: 2,
      rowCount: 2,
      // 左右、上下间隔
      margin: [10, 10],
    },
    animation: useNumberAnimation(),
    ...usePublicConfig(),
    event: [{
      static: true,
      use: true,
      key1: '',
      operator: '',
      key2: '',
      value: '',
      config: usePublicConfig(),
    }],
    global: {
      scroll: {
        use: false,
        ...useSwiperConfig(),
      },
    },
    series: [new Numerical2Series('系列1')],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Numerical2', { w: 500, h: 175 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('title', { description: '标题', optional: true }),
      createField('count', { description: '值', optional: true }),
      createField('suffix', { description: '后缀', optional: true }),
      createField('range', { description: '涨跌幅度', optional: true }),
      createField('data', { description: '图表数据', optional: true }),
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
      const path = 'numerical/numerical2'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Numerical2
