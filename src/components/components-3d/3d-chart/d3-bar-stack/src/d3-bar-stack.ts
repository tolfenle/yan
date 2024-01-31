/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-12 09:35:11
 * @LastEditTime : 2024-01-25 17:35:23
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
import { useD3PublicConfig, useD3AxisConfig } from '../../d3-config'
/**
 * D3BarStack
 */
export class D3BarStack extends DatavComponent {
  config = {
    generate: {
      ...useGenerateConfig({}, true),
    },
    chart: {
      type: 'column',
      margin: [60, 10, 10, 10],
      label: {
        color: useChartColor({ value: '#fff' }),
        fontSize: 14,
        fontWeight: 600,
      },
      shadow: false,
      options3d: {
        enabled: true,
        alpha: 17,
        beta: 20,
        depth: 55,
        viewDistance: 25,
      },
    },
    plotOptions: {
      column: {
        depth: 45,
        pointWidth: 10, // 设置柱子宽度为20像素，默认值为null，表示自动计算宽度
      },
      series: { // 或者直接使用 plotOptions.bar 如果只针对柱状图
        dataLabels: {
          enabled: true, // 开启数据标签显示
          formatter: 'return data.y',
          style: {
            fontSize: 14, // 字体大小调整
            color: useChartColor({ value: '#fff' }), // 颜色调整
          },
        },
      },
    },
    xAxis: cloneDeep(useD3AxisConfig()),
    yAxis: cloneDeep(useD3AxisConfig()),
    ...cloneDeep(useD3PublicConfig()),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('D3BarStack', { w: 400, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类别', optional: true }),
      createField('y', { description: '值', optional: true }),
      createField('name', { description: '类目', optional: true, isChild: true }),
      createField('data', { description: '类目值', optional: true, isChild: true }),
      createField('type', { description: '堆叠类型', optional: true, isChild: true }),
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
      const path = 'd3/bar-stack'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default D3BarStack
