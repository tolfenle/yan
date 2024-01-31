/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-24 13:43:49
 */
import { defineStore } from 'pinia'
import { debounce } from 'lodash-es'
import { Project } from '@/domains/project'
import { PageConfig, AlignLine } from '@/domains/editor'
import { getScreen } from '@/api/screen'
import {
  DatavComponent,
} from '@/components/_models/datav-component'
import { IEditorPage } from '@/domains/editor'
import { calcIntersectingLines } from '@/utils/editor'
import { useComStore } from './com'
import { useEventStore } from './event'
import { generateId } from '@/utils/util'
import { updateScreen } from '@/api/screen'

export interface IEditorState {
  editMode: boolean
  screen: Partial<Project>
  pageConfig: PageConfig
  canvas: {
    scale: number
    width: number
    height: number
  }
  guideLine: {
    h: number[]
    v: number[]
  }
  referLine: {
    enable: boolean
  }
  alignLine: AlignLine
  areaData: {
    top: number
    left: number
    width: number
    height: number
  }
  contextMenu: {
    show: boolean
  }
  isNormalResizeMode: boolean
  selectPage: string | number
}

export const useEditorStore = defineStore('editor', {
  state: (): IEditorState => ({
    editMode: false,
    screen: {
      id: 0,
      name: '',
      sharePassword: '',
      shareTime: '',
      shareUrl: '',
      shared: false,
      thumbnail: '',
      groupId: 0,
    },
    pageConfig: {
      width: 1920,
      height: 1080,
      bgimage: '',
      bgcolor: '#262626',
      grid: 8,
      screenshot: '',
      zoomMode: 1,
      useWatermark: true,
      styleFilterParams: {
        enable: false,
        hue: 0,
        saturate: 100,
        brightness: 100,
        contrast: 100,
        opacity: 100,
      },
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
      variables: {
        componentsView: {},
        publishersView: {},
        subscribersView: {},
      },
      pages: [
        {
          id: 0,
          type: 'page',
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
        },
      ],
      dialogs: [],
      address: [],
      host: [{
        host: '',
        name: '',
        token: '',
      }],
      events: [],
      defaultPage: 0,
    },
    canvas: {
      scale: 0.2,
      width: 1920,
      height: 1080,
    },
    guideLine: {
      h: [],
      v: [],
    },
    referLine: {
      enable: true,
    },
    alignLine: {
      enable: false,
      show: false,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      vertical: 0,
      horizontal: 0,
    },
    areaData: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    contextMenu: {
      show: false,
    },
    isNormalResizeMode: true,
    // 当前选中子页面，
    selectPage: '主屏',
  }),
  getters: {
    selectedPage(): IEditorPage {
      return this.pageConfig.pages.find(page => page.name === this.selectPage)
    },
  },
  actions: {
    setEditMode() {
      this.editMode = true
    },
    setSelectPage(name: string) {
      this.selectPage = name
    },
    setEditorOption(payload: {
      screen?: Partial<Project>
      config?: Partial<PageConfig>
      guideLine?: {
        h: number[]
        v: number[]
      }
    }) {
      if (payload.screen) {
        this.screen = { ...this.screen, ...payload.screen }
      }

      if (payload.config) {
        this.pageConfig = { ...this.pageConfig, ...payload.config }
      }

      if (payload.guideLine) {
        this.guideLine = { ...payload.guideLine }
      }
    },
    calcAlignLine(com: DatavComponent) {
      if (!this.alignLine.enable) {
        return
      }

      const comStore = useComStore()
      const attr = calcIntersectingLines(com, comStore.coms, this.canvas.scale)
      this.alignLine = { ...this.alignLine, ...attr, show: true }
    },
    hideAlignLine(id: string) {
      if (!this.alignLine.enable) {
        return
      }

      const comStore = useComStore()
      if (this.alignLine.show) {
        this.alignLine.show = false
        comStore.select(id)
      }
    },
    async autoCanvasScale(offset: () => { x: number; y: number; }) {
      const resize = debounce(() => {
        const { x, y } = offset()
        const width = document.documentElement.clientWidth - x
        const height = document.documentElement.clientHeight - y

        const a = (width - 180) / this.pageConfig.width
        const b = (height - 200) / this.pageConfig.height
        const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100

        this.setCanvasScale(scale, x, y)
      }, 200)

      window.onresize = resize

      resize()
    },
    async setCanvasScale(scale: number, offsetX: number, offsetY: number) {
      // 减去滚动条 4px
      let width = document.documentElement.clientWidth - offsetX - 4
      let height = document.documentElement.clientHeight - offsetY - 4
      const deltaS = Math.min(Math.max(scale, 10), 200) / 100

      // 方便计算滚动条 和 标尺
      const deltaW = this.pageConfig.width * deltaS
      const deltaH = this.pageConfig.height * deltaS
      if (width < deltaW) {
        width = deltaW + 400
      }

      if (height < deltaH) {
        height = deltaH + 390
      }

      this.canvas = { scale: deltaS, width, height }
    },
    // 更新配置
    async updateScreen() {
      const res = await updateScreen({
        ...this.screen,
        ...this.pageConfig,
      })
    },
    // 加载内容
    async loadScreen(screenId: string | number) {
      try {
        const eventStore = useEventStore()
        const { data, code, message } = await getScreen(screenId)
        if (code === 1000) {
          this.setEditorOption({
            screen: {
              groupId: data.groupId,
              id: screenId,
              name: data.name,
            },
            config: {
              ...data,
            },
          })
          const { componentsView, publishersView, subscribersView } =
            data.variables
          eventStore.$patch({ componentsView, publishersView, subscribersView })
        } else {
          throw Error(message)
        }
      } catch (error) {
        throw error
      }
    },
    // 新建子屏
    handleAddPage(type: 'dialog' | 'page' = 'page') {
      if (type === 'page')
        this.pageConfig.pages.push({
          id: generateId(),
          type: 'page',
          name: `子屏${this.pageConfig.pages.length}`,
          children: [],
        })
      else
        this.pageConfig.dialogs.push({
          id: generateId(),
          type: 'dialog',
          name: `弹窗${this.pageConfig.dialogs.length + 1}`,
          config: {
            header: {
              background: useChartColor({ value: '#0000', isCss: true }),
              height: 40,
            },
            title: {
              show: true,
              ...useFontSimple({
                color: useChartColor({ value: '#fff', isText: true }),
              }),
            },
            close: {
              show: true,
              color: useChartColor({ value: '#fff' }),
            },
          },
          children: [],
        })
    },
    // 移除子屏
    removePage(name: string) {
      const nowIndex = this.pageConfig.pages.findIndex(p => p.name === name)
      if (nowIndex > 0) {
        this.pageConfig.pages.splice(nowIndex, 1)
        // 如果关闭的是当前子屏，则渲染主屏
        if (this.selectPage === name) {
          this.selectPage = '主屏'
        }
      } else {
        const nowIndex = this.pageConfig.dialogs.findIndex(p => p.name === name)
        if (nowIndex >= 0) {
          this.pageConfig.dialogs.splice(nowIndex, 1)
          // 如果关闭的是当前子屏，则渲染主屏
          if (this.selectPage === name) {
            this.selectPage = '主屏'
          }
        }
      }
    },
    // 向子屏添加组件
    addPageCom(id: string) {
      const nowPage = this.pageConfig.pages.find(
        p => p.name === this.selectPage,
      )
      // page
      if (nowPage) {
        if (!nowPage.children.includes(id)) {
          nowPage.children = [...nowPage.children, ...(id.split(','))]
        }
      }
      // 弹窗
      else {
        const nowDialog = this.pageConfig.dialogs.find(
          p => p.name === this.selectPage,
        )
        if (nowDialog) {
          if (!nowDialog.children.includes(id)) {
            nowDialog.children = [...nowDialog.children, ...(id.split(','))]
          }
        }
      }

    },
    removePageCom(ids: string[]) {
      const nowPage = this.pageConfig.pages.find(
        p => p.name === this.selectPage,
      )
      if (nowPage) {
        nowPage.children = nowPage.children.filter(c => !ids.includes(c))
      }
      this.updateScreen()
    },
  },
})
