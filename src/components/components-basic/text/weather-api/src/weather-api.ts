/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-27 14:50:42
 * @LastEditTime : 2023-11-21 12:14:28
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * Weather
 */
export class WeatherApi extends DatavComponent {
  config = {
    api: {
      type: '和风', // API类型
      key: '46251751685f4e35962f7d0e758cd4d5',
      // 是否为实时天气
      now: false,
    },
    font: {
      color: useChartColor('#ffffff'),
      fontSize: 30,
      fontWeight: 500,
      fontFamily: 'Microsoft Yahei',
      fontStyle: 'normal',
    },
    icon: {
      show: true,
      size: 30,
      colorBy: true,
      color: useChartColor('#ffffff'),
      path: 'https://a.hecdn.net/img/common/icon/202106d/',
    },
    // 日出时间，在高纬度地区可能为空
    sunrise: true,
    // 日落时间，在高纬度地区可能为空
    sunset: true,
    // 当天月升时间，可能为空
    moonrise: true,
    // 当天月落时间，可能为空
    moonset: true,
    // 月相名称
    moonPhase: true,
    // 月相图标代码
    moonPhaseIcon: true,
    // 预报当天最高温度
    tempMax: true,
    // 预报当天最低温度
    tempMin: true,
    // 预报白天天气状况的图标代码
    iconDay: true,
    // 预报白天天气状况文字描述，包括阴晴雨雪等天气状态的描述
    textDay: true,
    // 预报夜间天气状况的图标代码
    iconNight: true,
    // 预报晚间天气状况文字描述，包括阴晴雨雪等天气状态的描述
    textNight: true,
    // 预报白天风向360角度
    wind360Day: true,
    // 预报白天风向
    windDirDay: true,
    // 预报白天风力等级
    windScaleDay: true,
    // 预报白天风速，公里/小时
    windSpeedDay: true,
    // 预报夜间风向360角度
    wind360Night: true,
    // 预报夜间当天风向
    windDirNight: true,
    // 预报夜间风力等级
    windScaleNight: true,
    // 预报夜间风速，公里/小时
    windSpeedNight: true,
    // 相对湿度，百分比数值
    humidity: true,
    // 预报当天总降水量，默认单位：毫米
    precip: true,
    // 大气压强，默认单位：百帕
    pressure: true,
    // 能见度，默认单位：公里
    vis: true,
    // 云量，百分比数值。可能为空
    cloud: true,
    // 紫外线强度指数
    uvIndex: true,
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('WeatherApi', { w: 345, h: 45 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('province', { description: '省名称', optional: true }),
      createField('city', { description: '城市名称', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '外部天气接口',
    })

    setApiData(this)

    this.events = {}
    this.actions = {
      commapping: {
        description: '字段映射',
        fields: {},
      },
    }

    return this
  }

  async loadData() {
    try {
      const path = 'text/weather-api'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default WeatherApi
