/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-12 09:35:11
 * @LastEditTime : 2024-01-25 16:55:18
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
 * D3Line
 */
export class D3Line extends DatavComponent {
  config = {
    generate: {
      ...useGenerateConfig({}, true),
    },
    chart: {
      type: 'line',
      margin: [70, 10, 10, -27],
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
      series: { // 或者直接使用 plotOptions.bar 如果只针对柱状图
        dataLabels: {
          enabled: true, // 开启数据标签显示
          formatter: 'return data.y',
          style: {
            fontSize: 14, // 字体大小调整
            color: useChartColor({ value: '#b3b3b3' }), // 颜色调整
          },
        },
        line: {
          marker: {
            enabled: false,
            radius: 4,
            symbol: 'circle',
          },
        },
        lineWidth: 2,
        linecap: 'stroke-linecap',
        connectNulls: true,
        connectEnds: true,
        dashStyle: 'solid',
        shadow: true,
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
    super('D3Line', { w: 540, h: 300 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类别', optional: true }),
      createField('y', { description: '类目', optional: true }),
      createField('z', { description: '值', optional: true }),
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
      const path = 'd3/line'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default D3Line
