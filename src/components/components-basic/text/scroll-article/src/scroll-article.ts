/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-09-29 11:01:28
 * @LastEditTime: 2022-09-30 10:56:15
 */
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
  setApiConfig, setApiData,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'

const COLORS = glThemeList[0]
/**
 * ScrollArticle
 */
export class ScrollArticle extends DatavComponent {
  config = {
    global: {
      background: useChartColor({ type: COLOR_TYPE.渐变, isCss: true, liner: 'linear-gradient(289deg, rgba(100, 181, 246, 0.76) 0%, rgba(14, 68, 129, 1) 100%)' }),
      padding: [8, 8],
      justifyContent: 'flex-start',
      alignItems: 'center',
      // 超出多少行显示省略号
      overRow: 1,
      // 行间距
      rowMargin: 0,
      // 主副标题间距
      subMargin: 8,
      // 副标题与日期间距
      timeMargin: 8,
      // 左侧点距文本距离
      right: 13,
    },
    swiper: useSwiperConfig({
      row: 5,
    }),
    title: {
      font: {
        ...useFontSimple({
          color: useChartColor({ isText: true, value: '#ffffff' }),
        }),
      },
      overRow: 1,
    },
    subTitle: {
      justifyContent: 'flex-start',
      font: {
        ...useFontSimple({
          color: useChartColor({ isText: true, value: '#eeeeee' }),
          fontSize: 13,
        }),
      },
      show: true,
      overRow: 1,
    },
    date: {
      show: true,
      position: 'middle', // top 顶部 middle 与副标题同级 bottom底部
      font: {
        ...useFontSimple({
          color: useChartColor({ isText: true, value: '#eeeeee' }),
          fontSize: 13,
        }),
      },
      format: 'YYYY-MM-DD',
    },
    point: {
      show: false,
      background: useChartColor({ isCss: true, value: '#07E73F' }),
      height: 15,
      width: 15,
      radius: 40,
      position: 'top', // top 顶部 middle bottom
      image: {
        show: true,
        size: 'cover', // contain cover auto
        radius: 40,
        width: 40,
        height: 40,
      },
    },
    order: {
      show: true,
      addZero: true,
      width: 50,
      height: 30,
      name: '序号',
      ...useFontSimple(),
    },
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>

  constructor() {
    super('ScrollArticle', { w: 465, h: 320 })
    this.initData()
  }

  initData() {
    const fields = [
      createField('title', { description: '主标题', optional: true }),
      createField('subTitle', { description: '副标题', optional: true }),
      createField('link', { description: '链接地址', optional: true }),
      createField('date', { description: '日期', optional: true }),
      createField('img', { description: '图片', optional: true }),
    ]

    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '信息轮播接口',
    })

    setApiData(this)

    this.events = {
      click: {
        enable: true,
        description: '当点击数据项时',
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
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'text/scroll-article'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default ScrollArticle
