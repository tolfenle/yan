/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-19 10:33:14
 * @LastEditTime : 2024-01-19 11:22:16
 */
import { DatavComponent } from '@/components/_models/datav-component'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { createField } from '@/components/_models/data-field'
import { DataEventConfig } from '@/components/_models/data-event'
import { getStaticData } from '@/api/data'

/**
 * Lottie
 */
export class Lottie extends DatavComponent {
  config = {
    assetsPath: '/public/videos/JjaqlQO9Ot.json',
    json: '',
    // 动画的速度。该值必须是大于 0 的数字。您可以使用 0 到 1 之间的值来减慢动画速度，使用大于 1 的值来加快动画速度。
    speed: 1,
    // 动画的方向  forward或reverse或alternate
    direction: 'forward',
    // 循环播放
    loop: true,
    // 自动播放
    autoPlay: true,
    // 延迟动画 毫秒为单位
    delay: 0,
    backgroundColor: 'transparent',
    // 自动边距
    noMargin: false,
    // 缩放比例
    scale: 1,
    // svg或canvas或html
    renderer: 'svg',
    // 用于配置渲染器的道具
    rendererSettings: {},
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>
  events: Record<string, DataEventConfig>
  actions: Record<string, DataEventConfig>

  constructor() {
    super('Lottie', { w: 200, h: 200 })

    this.initData()
  }

  initData() {
    const fields = []

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
      this.apiData.source.config.data = ''
    } catch (error) {
      throw error
    }
  }
}

export default Lottie
