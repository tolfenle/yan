/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-06-24 18:08:35
 * @LastEditTime: 2022-09-21 20:17:50
 */
import { _ } from 'iking-utils'
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import { ApiConfigMap, ApiDataConfigMap, setApiConfig, setApiData } from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'
const COLOR = glThemeList[0]

export class TitleNum extends DatavComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    bg: {
      color: useChartColor({ type: COLOR_TYPE.渐变, liner: 'linear-gradient(69deg, rgba(5, 160, 69, 1) 18%, rgba(4, 98, 68, 1) 97%)', isCss: true }),
      radius: {
        t: 5,
        r: 5,
        b: 5,
        l: 5,
      },
    },
    line: {
      show: true,
      style: {
        color: useChartColor({ value: COLOR[0], isCss: true }),
        radius: {
          t: 0,
          r: 0,
          b: 0,
          l: 0,
        },
        h: 12,
        w: 2,
      },
    },
    num: {
      font: {
        ...useFontSimple({
          color: useChartColor({ value: '#fff', isText: true }),
        }),
      },
      from: 0,
      active: true,
      duration: 3000,
      precision: 0,
      showSeparator: true,
    },
    title: {
      left: 5,
      font: {
        ...useFontSimple({
          color: useChartColor({ value: '#E3E3E2FF', isText: true }),
        }),
      },
    },
    suffix: {
      left: 3,
      value: '万元',
      font: {
        ...useFontSimple({
          color: useChartColor({ value: '#FFA600FF', isText: true }),
        }),
      },
    },
    icon: {
      show: false,
      size: 12,
      left: 8,
      check: [{
        icon: 'jh-shangsheng1',
        color: useChartColor({ value: 'rgba(254, 71, 5, 1)' }),
      }],
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('TitleNum', { w: 265, h: 30 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '标题' }),
      createField('y', { description: '值' }),
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
      const path = 'numerical/title-num'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default TitleNum
