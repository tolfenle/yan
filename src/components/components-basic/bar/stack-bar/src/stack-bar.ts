/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-17 11:38:30
 * @LastEditTime : 2023-11-17 12:20:15
 */
/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-11-17 11:38:57
 */
import { DatavEChartsComponent, DatavChartSeries } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'
import { EChartEasing } from '@/components/_models/echarts-animation'
import { _ } from 'iking-utils'

const fixConfig = {
  label: {
    show: true,
    distance: 5,
    rotate: 0, // -90 90
    offset: [0, 0],
    position: 'inside',
    formatter: {
      type: EFormatterType.配置,
      value: '{c}',
      function: 'return param.data.value',
    },
    align: 'center',
    erticalAlign: 'middle',
    font: {
      ...chartFont,
      color: useChartColor({
        value: '#fff',
      }),
    },
  },
}

export class StackBarSeries extends DatavChartSeries {
  constructor(name: string) {
    super('bar', name)
  }

  config = {
    customTheme: false,
    ..._.cloneDeep(useChartBarConfig(fixConfig)),
  }
}

/**18400578980
 * BasicBar
 */
export class StackBar extends DatavEChartsComponent {
  config = {
    generate: {
      ..._.cloneDeep(useGenerateConfig({ sameColor: false })),
    },
    quickly: [],
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 40,
        bottom: 50,
        left: 50,
        right: 40,
      },
      innerPadding: 20,
      outerPadding: 30,
      barWidth: 'auto',
      background: {
        show: true,
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    label: {
      show: false,
      position: 'top',
      textStyle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'normal',
      },
      offsetX: 0,
      offsetY: 0,
    },
    bar: _.cloneDeep({
      ...useChartBarPubConfig({
        barGap: 0.2,
      }),
      ...useChartBarConfig(fixConfig),
    }),
    grid: {
      ..._.cloneDeep(chartGridConfig),
      top: 40,
    },
    xAxis: _.cloneDeep(xAxisConfig),
    yAxis: _.cloneDeep(yAxisConfig),
    tooltip: _.cloneDeep(tooltipConfig),
    legend: {
      ..._.cloneDeep(chartLegendConfig),
      show: true,
    },
    series: [new StackBarSeries('系列1'), new StackBarSeries('系列2'), new StackBarSeries('系列3'), new StackBarSeries('系列4')],
    animation: _.cloneDeep(useChartAnimationConfig()),
  } as any

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('StackBar', { w: 455, h: 320 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '类目' }),
      createField('y', { description: '值' }),
      createField('z', { description: 'x轴' }),
      createField('s', { description: '堆叠类别' }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本柱状图接口',
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
    ]

    this.actions = {
    }

    return this
  }

  async loadData() {
    try {
      const path = 'bar/stack-bar'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default StackBar
