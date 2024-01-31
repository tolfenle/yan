/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:01
 * @LastEditTime : 2024-01-11 17:43:28
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

const usePublicConfig = () => {

  return {
    background: useChartColor({ value: '#03172E', isCss: true }),
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
      ...useFontSimple({ color: useChartColor({ value: '#F0F0F0', isText: true }) }),
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
      value: '万元',
      left: 3,
      font: {
        ...useFontSimple({
          color: useChartColor({ value: '#F0F0F0', isText: true }),
        }),
      },
    },
    icon: {
      url: '',
      background: useChartColor({
        value: '#DF547B',
        isCss: true,
      }),
      radius: 50,
      size: [50, 50],
      padding: 8,
      shadow: {
        color: '',
        blur: 0,
        offset: [0, 0],
      },
    },
  }
}

export class Numerical1Series {
  public config
  constructor(mame, param = {}) {
    this.name = name
    this.config = {
      used: false,
      ...usePublicConfig(),
      ...param,
    }
  }
}
/**
 * Numerical1
 */
export class Numerical1 extends DatavComponent {
  config = {
    generate: {
      width: 200,
      height: 90,
      showSeparator: true,
      precision: 0,
      duration: 3000,
      gap: [16, 16],

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
    global: {
      scroll: {
        use: false,
        ...useSwiperConfig(),
      },
    },
    series: [new Numerical1Series('系列1', {
      background: useChartColor({ type: COLOR_TYPE.渐变, isCss: true, liner: 'linear-gradient(0deg, rgba(8, 43, 78, 1) 0%, rgba(22, 117, 218, 1) 100%)' }),
    }), new Numerical1Series('系列2', {
      background: useChartColor({ type: COLOR_TYPE.渐变, isCss: true, liner: 'linear-gradient(0deg, rgba(2, 49, 25, 1) 0%, rgba(0, 143, 102, 1) 100%)' }),
    })],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Numerical1', { w: 422, h: 90 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('title', { description: '标题', optional: true }),
      createField('count', { description: '值', optional: true }),
      createField('suffix', { description: '后缀', optional: true }),
      createField('icon', { description: '图标地址', optional: true }),
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
      const path = 'numerical/numerical1'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Numerical1
