export enum MoveType {
  up,
  down,
  top,
  bottom,
}

export enum ZoomMode {
  /**
   * 全屏铺满
   */
  auto,
  /**
   * 等比缩放宽度铺满
   */
  width,
  /**
   * 等比缩放高度铺满
   */
  height,
  /**
   * 等比缩放高度铺满并且可以左右移动
   */
  full,
  /**
   * 不缩放
   */
  disabled,
}

export enum ToolboxType {
  vertical = 'vertical',
  horizontal = 'horizontal',
  copy = 'copy',
  add = 'add',
  remove = 'remove',
}

export interface PageStyleFilter {
  enable: boolean
  hue: number
  saturate: number
  brightness: number
  contrast: number
  opacity: number
}

export interface PageVariable {
  /**
   * 定义事件中 emit 出的变量
   */
  componentsView: {
    [key: string]: {
      [key: string]: {
        enable: boolean
        fields: Record<string, string>
      }
    }
  }
  /**
   * 发布事件的组件
   *
   * 形如: { [变量名]: [组件id, ...] }
   */
  publishersView: Record<string, string[]>
  /**
   * 订阅事件的组件
   *
   * 形如: { [变量名]: [组件id, ...] }
   */
  subscribersView: Record<string, string[]>
}

export interface IEditorPage {
  id: number | string
  name: string
  type: 'dialog' | 'page'
  animation?: {
    duration: number
    loop: boolean
    type: 'css' | 'img' | 'video' | 'lottie'
    css: string
    img: string
    video: string
    lottie: string
  }
  children: string[]
}

export interface IAddress {
  id: number
  name?: string
  url: string
  tokenName: string
  token: string
  proxy: boolean
}

export interface PageConfig {
  width: number
  height: number
  bgcolor: string
  bgimage: string
  grid: number
  screenshot: string
  zoomMode: ZoomMode
  useWatermark: boolean
  styleFilterParams: PageStyleFilter
  // 夜间、日间
  model?: 'dark' | 'light'
  // 主题
  theme?: String[]
  // 子屏
  pages?: Array<IEditorPage>
  // 弹窗
  dialogs?: Array<IEditorPage>
  // 统一请求地址
  address?: Array<IAddress>
  // iframe嵌套时请求体、请求头配置
  iframe?: {
    title: string
    favico: string
    loadingTitle: string
    loadingIcon: string
    body: {
      name: string
      config: string
    }
    header: {
      name: string
      config: string
    }
  }
  // host
  host?: Array<{
    host: string
    name: string
    token: string
  }>
  // 默认子屏
  defaultPage?: string
  // 全局事件
  events?: Array<{
    name: string
    description: string
    // 是否启用
    enable: boolean
    // 事件类型
    type: EVENT_TYPE
    // 目标组件
    target: string
    // 执行动作
    actions?: EVENT_COM_ACTION & EVENT_SYS_ACTION & null
    customFunc?: string
    fields?: Array<any>
    // 跳转地址
    link?: string
    // 是否新窗口打开
    linkBlank?: boolean
    // 定时器 时间
    timer?: number
    // 是否循环
    loop?: boolean
    // 重新请求
    reRequest?: {
      fields: any[]
      func: string
    }
    // 更新数据
    updateData?: {
      func: string
    }
    // 更新配置
    updateConfig?: {
      func: string
    }
    // 切换显隐
    updateHiddle?: {
      fields: any[]
      func: string
    }
    // 定时器
    timers?: {
      // 定时器 时间
      timer?: number
      // 是否循环
      loop?: boolean
      func?: string
    }
    // 切换子屏
    sysUpScreen?: {
      fields: any[]
      func: string
    }
  }>

  variables?: {
    componentsView?: any
    publishersView?: any
    subscribersView?: any
  }
}

export interface AlignLine {
  top: number
  bottom: number
  left: number
  right: number
  vertical: number
  horizontal: number
  enable: boolean
  show: boolean
}
