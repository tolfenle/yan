import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'

const COLOR = glThemeList[0]
export class BaseListSeries {
  constructor(name, color) {
    this.name = name
    this.use = false
    this.color = useChartColor({ value: COLOR[0], isText: true })
    this.color2 = useChartColor({ value: '#ffffff', isText: true })
    this.color3 = useChartColor({ value: COLOR[0], isText: true })
  }
  color: any
  name: string
  use: boolean
  color2: any
  color3: any
}

/**
 * BaseList
 */
export class BaseList extends DatavComponent {
  config = {
    generate: {
      color: chartGenerateColor,
      colums: 1,
      mrHor: 0,
      mrVer: 20,
      configType: 'basic',
      titleInColor: false,
      numberInColor: false,
      progressInColor: false,
    },
    global: {
      border: {
        show: true,
        height: 1,
        width: 100,
        type: 'solid',
        left: 0,
        top: 0,
        color: useChartColor({ value: '#4b4b4b', isCss: true }),
      },
      overflow: 'auto',
    },
    process: {
      show: true,
      font: {
        ...useFontSimple({
          color: useChartColor({ value: COLOR[0], isText: true }),
          fontSize: 16,
          letterSpacing: 0,
        }),
        marginLeft: 10,
        marginRight: 0,
      },
    },
    icon: {
      show: true,
      color: useChartColor({ value: COLOR[0], isText: true }),
      width: 10,
      height: 10,
      right: 5,
      border: {
        radius: 0,
        width: 0,
        padding: 0,
        type: 'solid',
        color: useChartColor({ value: COLOR[0] }),
      },
    },
    title: {
      font: {
        ...useFontSimple({
          color: useChartColor({ value: '#fff', isText: true }),
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: 0,
        }),
      },
    },
    number: {
      font: {
        ...useFontSimple({
          color: useChartColor({ value: '#fff', isText: true }),
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: 0,
        }),
      },
      suffix: {
        left: 5,
        bottom: 0,
        value: '',
        ...useFontSimple({
          fontSize: 12,
          color: useChartColor({ value: '#eee', isText: true }),
        }),
      },
    },
    series: [
      new BaseListSeries('系列1', COLOR[0]),
      new BaseListSeries('系列2', COLOR[1]),
      new BaseListSeries('系列3', COLOR[2]),
      new BaseListSeries('系列4', COLOR[3])],
  }


  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('BaseList', { w: 320, h: 320 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目', optional: true }),
      createField('y', { description: '值', optional: true }),
      createField('z', { description: '百分比', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    this.events = {
      click: {
        description: '当点击数据时',
        fields: Object.assign({}, ...fields),
        events: [],
      },
      dbclick: {
        description: '当双击数据时',
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
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'numerical/base-list'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default BaseList
