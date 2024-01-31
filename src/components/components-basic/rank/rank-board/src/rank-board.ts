/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-05-17 14:44:17
 * @LastEditTime: 2022-06-14 11:39:44
 */
import { cloneDeep } from 'lodash-es'
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'
const colorList = glThemeList[0]

export class RankBoard extends DatavComponent {
  config = {
    generate: {
      ...cloneDeep(useGenerateConfig()),
    },
    title: '轮播列表',
    prefixStyle: {
      ...useFontSimple({
        color: useChartColor({ value: '#eee' }),
      }),
      prefix: 'No.',
    },
    textStyle: {
      ...useFontSimple({
        color: useChartColor({ value: '#eee' }),
      }),
      left: 8,
    },
    barStyle: {
      color: useChartColor({ isCss: true, value: colorList[0] }),
      height: 8,
      radius: [0, 0, 0, 0],
    },
    borderStyle: {
      type: 'solid', // dashed dotted
      color: useChartColor({ value: colorList[0] }),
      width: 0,
      padding: [0, 0],
      background: useChartColor({ isCss: true, value: 'rgba(0,0,0,0.2)' }),
      top: 6,
    },
    numStyle: {
      ...useFontSimple({
        color: useChartColor({ value: '#eee' }),
      }),
      suffix: {
        show: true,
        value: '万元',
        ...useFontSimple({
          color: useChartColor({ value: '#eee' }),
        }),
      },
    },
    default: {
      rowNum: 4,
      waitTime: 2000,
      carousel: 1,
      unit: '',
      sort: true,
      valueFormatter: null,
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('RankBoard', { w: 450, h: 250 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('name', { description: '标题', optional: true }),
      createField('value', { description: '值', optional: true }),
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

    return this
  }

  async loadData() {
    try {
      const path = 'rank/rank-board'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}
export default RankBoard
