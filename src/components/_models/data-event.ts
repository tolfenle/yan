/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-12 12:18:06
 */
import { FieldConfig } from './data-field'

export enum EVENT_SHOW_HIDDEN {
  显示 = 'show',
  隐藏 = 'hidden',
}

export enum EVENT_TYPE {
  系统事件 = 'sys-event',
  组件事件 = 'com-event',
  自定义事件 = 'custom-event',
}

export enum EVENT_COM_ACTION {
  重新请求 = 're-request',
  重新渲染 = 're-render',
  更新配置 = 'up-config',
  更新数据 = 'up-data',
  显示 = 'show',
  隐藏 = 'hide',
  切换显隐 = 'show-hide',
}

export enum EVENT_SYS_ACTION {
  切换子屏 = 'changr-screen',
  跳转链接 = 'jump',
  定时器 = 'timer',
  重新加载 = 'reload',
  设置参数 = 'set-param'
}

export interface DataEventConfig {
  description: string
  fields: Record<string, FieldConfig>
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
    // 自定义事件
    customEvent?: {
      func: string
    }
  }>
}

export interface EventItemConfig {
  name: string
  description: string
  enable: boolean
  fields: {
    name: string
    map: string
    description: string
    custom?: boolean
  }[]
}
