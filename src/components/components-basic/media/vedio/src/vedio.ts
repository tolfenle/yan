/*
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-07-20 16:39:20
 * @LastEditTime: 2022-09-21 20:20:00
 */
import { getStaticData } from '@/api/data'
import { DataEventConfig } from '@/components/_models/data-event'
import { createField } from '@/components/_models/data-field'
import {
  ApiConfigMap, ApiDataConfigMap,
} from '@/components/_models/data-source'
import { DatavComponent } from '@/components/_models/datav-component'

const getbackRate = () => {
  let num = 0.5
  const arr = []
  while (num < 20) {
    arr.push(num)
    num += 0.25
  }
  return arr
}

/**
 * Vedio
 */
export class Vedio extends DatavComponent {
  config = {
    url: '/public/videos/架构模板.mp4',
    autoplay: true, // true、false、muted、play、any
    loop: true,
    controls: false, // 交互的控件
    fluid: true, // 流式布局
    videoInit: true, // 显示视频首帧 在移动端无效。
    fitVideoSize: 'fixed', // fixWidth fixHeight auto
    videoFillMode: 'fill',
    volume: 0, // 0 - 1
    poster: '', // 封面图
    playbackRate: getbackRate(), // 播放速率
    defaultPlaybackRate: 1, // 默认播放速率
    download: true, //设置download控件显示
    pip: true, // 画中画
    miniplayer: true, // 迷你播放器
    miniplayerConfig: { // 迷你播放器配置
      bottom: 200,
      right: 0,
      width: 320,
      height: 180,
    },
    progressDot: [ // 进度条特殊点标记  -  保留但暂不支持配置
      // {
      //   time: 10, //展示标记的时间
      //   text: '标记文字', //鼠标hover在标记时展示的文字
      //   duration: 8, //标记段长度（以时长计算）
      //   style: { //标记样式
      //     background: 'blue'
      //   }
      // }, {
      //   time: 22,
      //   text: '标记文字'
      // }, {
      //   time: 56,
      //   duration: 8,
      // }, {
      //   time: 76,
      // }
    ],
    ignores: [], // 忽略的控件 ['time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'poster', 'progress', 'replay', 'volume']
  }

  apis: Partial<ApiConfigMap>
  apiData: Partial<ApiDataConfigMap>

  events: Record<string, DataEventConfig>

  actions: Record<string, DataEventConfig>
  disActions?: string[]

  constructor() {
    super('Vedio', { w: 480, h: 270 })

    this.initData()
  }

  initData() {
    const fields = [
      createField('url', { description: '视频地址', optional: true }),
    ]

    setApiData(this)
    setApiConfig(this, {
      fields: Object.assign({}, ...fields),
      description: '基本视频接口',
    })

    this.events = {
      finish: {
        description: '播放结束',
        fields: Object.assign({}, ...fields),
      },
    }
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
      // 组件静态数据来源，当前项目统一管理目录：public/data/*
      // 如：public/data/demo/data.json 简写为 => demo/data
      const path = 'media/video'
      const res = await getStaticData(this.id, path)
      this.apiData.source.config.data = JSON.stringify(res.data)
    } catch (error) {
      throw error
    }
  }
}

export default Vedio
