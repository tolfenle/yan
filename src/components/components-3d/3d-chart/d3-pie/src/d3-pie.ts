import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { cloneDeep } from 'lodash-es'
import { useD3PublicConfig } from '../../d3-config'

const colorList = glThemeList[0]
/**
 * D3Pie
 */
export class D3Pie extends DatavComponent {
  config = {
    generate: {
      ...useGenerateConfig({}, true),
    },
    global: {
      center: {
        x: 50,
        y: 50,
      },
    },
    chart: {
      type: 'pie',
      slicedOffset: 20,// 突出间距
      backgroundColor: 'transparent',
      margin: [10, 10, 10, 10],
      label: {
        color: useChartColor({ value: '#fff' }),
        fontSize: 14,
        fontWeight: 600,
      },
      shadow: false,
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
        depth: 55,
      },
    },
    plotOptions: {
      pie: {
        // innerSize: 86,
        depth: 55,
        minSize: 80,
        opacity: 1,
        shadow: false,
        showInLegend: true,
        showCheckbox: false,
        dataLabels: {
          enabled: true,
          shadow: false,
          color: useChartColor({ value: '#fff' }),
          connectorPadding: 5,
          connectorShape: 'crookedLine',
          connectorWidth: 2,
          distance: 10,
          format: '{point.name}',// {point.y}
        },
        states: {
          hover: {
            halo: {
              opacity: 0.2,
              size: 350,
            },
          },
          inactive: {
            halo: {
              opacity: 0.2,
              size: 550,
            },
          },
        },
      },
    },
    ...cloneDeep(useD3PublicConfig()),
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('D3Pie', { w: 400, h: 400 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目', optional: true }),
      createField('y', { description: '值', optional: true }),
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
      const path = 'd3/pie'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default D3Pie
