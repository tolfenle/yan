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
  '图标' = 1,
  '标题' = 2,
  '图标加标题' = 3
}


export class Numerical4Series {
  public config
  constructor(name, param = {}) {
    this.name  = name
    this.config = {
      suffix:{
        label:'个',
      },
      left:{
        url:'',
        bgColor: '',
      },
      right:{
        url:'',
        bgColor: '',
      },
      ...param,
    }
  }
}

/**
 * Numerical4
 */
export class Numerical4 extends DatavComponent {
  config = {
    generate: {
      type: ENumType.标题,
      configType: 'basic',
      seriesMargin:45,
      textChartMargin:10,
      imageChartMargin:10,
      font: cloneDeep({
        ...chartFont,
        fontSize:15,
        fontWeight:500,
        color: useChartColor({ value: '#C9CACB', isText: true }),
      }),
      image:{
        width:50,
        height:50,
      },
    },
    split: {
      show: true,
      type:'rect',
      background: '#2a2a2a',
      rote: 90,
      width: 10,
      split: 50,
      height: 15,
    },
    carousel: {
      ...useCarousel(),
      slidesPerView: 2,
    },
    num:{
      font: cloneDeep({
        ...chartFont,
        fontSize:27,
        fontWeight:700,
        color: useChartColor({ value: '#F0F0F0', isText: true }),
      }),
      margin:5,
    },
    suffix:{
      font: cloneDeep({
        ...chartFont,
        fontSize:12,
        fontWeight:600,
        color: useChartColor({ value: '#7B7C7C', isText: true }),
      }),
      margin:5,
    },
    series: [new Numerical4Series('系列1',{
      left:{
        url:'',
        bgColor: useChartColor({ isCss: true, value: '#2F7DF1' }),
      },
      right:{
        url:'',
        bgColor: useChartColor({ isCss: true, value: '#F7C652' }),
      },
    }),
    new Numerical4Series('系列2',{
      left:{
        url:'',
        bgColor: useChartColor({ isCss: true, value: '#88CF4B' }),
      },
      right:{
        url:'',
        bgColor: useChartColor({ isCss: true, value: '#E84F92' }),
      } }),
    ],
    animation: useNumberAnimation(),
  }


  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Numerical4', { w: 400, h: 260 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('titleX', { description: '左侧标题', optional: true }),
      createField('x', { description: '左侧数值', optional: true }),
      createField('titleY', { description: '右侧标题', optional: true }),
      createField('y', { description: '右侧数值', optional: true }),
      createField('count', { description: '总数', optional: true }),
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
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'numerical/numerical4'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Numerical4
