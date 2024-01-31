/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-07-19 16:28:53
 * @LastEditTime: 2022-07-20 12:00:35
 */
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'
import { useDefaultColor } from '@/components/_utils/echarts-util'
import { useTheme } from '@/utils/base-color'

const colors = glThemeList[0]
/**
 * Html
 */
export class Html extends DatavComponent {
  config = {
    html: '<h1 style="color:red;font-size:25px">我是自定义的HTML片段</h1>',
    background: useChartColor({ type: COLOR_TYPE.渐变, isCss: true, liner: 'linear-gradient(0deg, rgba(17, 84, 162, 1) 0%, rgba(10, 40, 77, 1) 100%)' }),
    border: useDefaultBorder(),
    padding: [0, 0, 0, 0],
  }
  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>
  constructor() {
    super('Html', { w: 300, h: 100 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('html', { description: '自定义HTML片段', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
    })

    setApiData(this)

    this.events = {
      onClick: {
        description: '点击片段时',
        fields: Object.assign({}, ...fields),
      },
    }
    this.disActions = [
      EVENT_COM_ACTION.更新数据, EVENT_COM_ACTION.重新请求, EVENT_COM_ACTION.显示, EVENT_COM_ACTION.切换显隐, EVENT_COM_ACTION.隐藏, EVENT_COM_ACTION.更新配置,
    ] as any[]

    return this
  }

  async loadData() {
    try {
      const path = 'media/html'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Html
