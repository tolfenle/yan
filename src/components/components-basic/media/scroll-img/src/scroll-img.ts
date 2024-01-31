/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-27 17:52:59
 * @LastEditTime : 2023-12-27 18:37:40
 */
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'

export class ScrollImgSeries {
  constructor(url) {
    this.y = url
  }

  x = '图片'
  y = ''
  s = ''
}

export class ScrollImg extends DatavComponent {
  config = {
    title: '轮播图',
    swiper: useSwiperConfig({
      row: 1,
      direction: 'horizontal',
    }),
    image: {
      fit: 'cover', // 'fill' | 'contain' | 'cover' | 'none' | 'scale'-down'
      lazy: false,
      alt: '',
    },
    series: [],
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('ScrollImg', { w: 995, h: 250 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('x', { description: '标题', optional: true }),
      createField('y', { description: '图片地址', optional: true }),
      createField('s', { description: '描述', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '信息轮播接口',
    })

    setApiData(this)

    this.events = {
      click: {
        enable: true,
        description: '当点击图片时',
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
      const path = 'media/scroll-img'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}
export default ScrollImg
