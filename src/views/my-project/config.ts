/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2023-11-03 19:53:36
 */
import { InjectionKey } from 'vue'

interface ProjectInjection {
  dragStart: Function
  dragEnd: Function
}

interface ProjectListInjection {
  publish: (appId: number | string) => void
}

export const projectInjectionKey: InjectionKey<ProjectInjection> = Symbol('projectInjectionKey')

export const projectListInjectionKey: InjectionKey<ProjectListInjection> = Symbol('projectListInjectionKey')

export const useDefaultScreen = (name, groupId, template=null) => {
  return {
    width: 1920,
    height: 1080,
    bgimage: '',
    bgcolor: '#262626',
    grid: 8,
    screenshot: '',
    zoomMode: 1,
    useWatermark: true,
    name: name || `新建大屏_${new Date().getTime()}`,
    groupId: groupId,
    templateId: template ?? null,
    pages: [{
      id: 0,
      name: '主屏',
      animation: {
        duration: 1000,
        loop: true,
        type: 'css',
        css: '',
        img: '',
        video: '',
        lottie: '',
      },
      children: [],
    }],
    iframe: {
      title: '',
      favico: '',
      loadingTitle: '',
      loadingIcon: '',
      body: {
        name: 'body',
        config: '',
      },
      header: {
        name: 'header',
        config: '',
      },
    },
    dialogs: [],
    styleFilterParams: {
      enable: false,
      hue: 0,
      saturate: 100,
      brightness: 100,
      contrast: 100,
      opacity: 100,
    },
    variables: {
      componentsView: {},
      publishersView: {},
      subscribersView: {},
    },
    host: [{
      host: '',
      name: '',
      token: '',
    }],
    events: [],
    defaultPage: 0,
  }
}
