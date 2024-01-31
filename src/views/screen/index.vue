<template>
  <div
    id="datav-loading"
    :style="{
      background: 'rgb(15, 42, 66)',
      display: loading ? 'block' : 'none',
    }"
  >
    <a target="_blank" href="javascript:;">
      <img class="datav-logo" :src="`${cdn}/datav-loading.gif`">
    </a>
  </div>
  <div class="datav-layout" :style="{ visibility: loading ? 'hidden' : 'visible' }">
    <a
      v-if="pageConfig.useWatermark"
      href="/"
      target="_blank"
      class="datav-watermark"
    >
      <img :src="LOGO">
    </a>
    <div class="scene">
      <!-- <template > -->
      <!-- <transition appear name="slide" mode="out-in"> -->
      <datav-com v-for="com in filterComs" :key="com.id" :com="com" />
      <!-- </transition> -->
      <!-- </template> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { globalConfig } from '@/config'
import { useEditorStore } from '@/store/editor'
import { useFilterStore } from '@/store/filter'
import { useComStore } from '@/store/com'
import { useEventStore } from '@/store/event'
import { PageConfig, ZoomMode } from '@/domains/editor'
import { setStyle, on } from '@/utils/dom'
import { getScreen } from '@/api/screen'
import DatavCom from './datav/index.vue'
import { ikMitt, ikStore } from 'iking-utils'
import { NInput, useDialog } from 'naive-ui'

const cdn = import.meta.env.VITE_APP_CDN

export default defineComponent({
  name: 'Preview',
  components: {
    DatavCom,
  },
  props: {
    screenId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const filterStore = useFilterStore()
    const editorStore = useEditorStore()
    const comStore = useComStore()
    const eventStore = useEventStore()
    const loading = ref(true)
    const { pageConfig } = storeToRefs(editorStore)
    const dialog = useDialog()

    const computedLoading = () => {
      if (location.href.includes('/share/#/') && (pageConfig.value as any).sharePassword) {
        if (!ikStore.session.getItem('shared')) {
          const pawd = ref('')
          const statu = ref()
          dialog.info({
            maskClosable: false,
            showIcon: false,
            autoFocus: true,
            closable: false,
            closeOnEsc: false,
            title: '请输入访问密码',
            class: 'render-v-modal_password',
            style: `width: 200px;`,
            positiveText: '确定',
            content: () => h(NInput, {
              modelValue: pawd.value,
              clearable: true,
              showPasswordOn: 'mousedown',
              type: 'password',
              status: statu.value,
              onChange: e => pawd.value = e,
              style: {
                width: '100%',
              },
            }),
            onPositiveClick: () => {
              if (pawd.value === (pageConfig.value as any).sharePassword) {
                statu.value = undefined
                ikStore.session.setItem('shared', '1')
                return true
              }
              else {
                statu.value = 'error'
                return false
              }
            },
          })
        }
      }
    }
    const filterComs = computed(() => {
      const _selectPage = !editorStore.selectedPage.id ? editorStore.pageConfig.pages[1] : editorStore.selectedPage
      const comdd = comStore.coms.filter(com => _selectPage?.children.includes(com.id) || editorStore.pageConfig.pages[0].children.includes(com.id))
      return comdd
    })

    const styleFilter = computed(() => {
      const sf = pageConfig.value.styleFilterParams
      let filter = ''
      if (sf.enable) {
        filter = `hue-rotate(${sf.hue}deg) contrast(${sf.contrast}%) opacity(${sf.opacity}%) saturate(${sf.saturate}%) brightness(${sf.brightness}%)`
      }
      return filter
    })

    const resizeAuto = (width: number, height: number) => {
      const cw = document.documentElement.clientWidth
      const ch = document.documentElement.clientHeight
      const ratioX = cw / width
      const ratioY = ch / height
      setStyle(document.body, {
        transform: `scale(${ratioX}, ${ratioY})`,
        transformOrigin: 'left top',
        backgroundSize: '100% 100%',
      } as CSSStyleDeclaration)
    }

    const resizeWidth = (width: number) => {
      const ratio = document.documentElement.clientWidth / width
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: '100%',
      } as CSSStyleDeclaration)
    }

    const resizeHeight = (width: number, height: number) => {
      const cw = document.documentElement.clientWidth
      const ch = document.documentElement.clientHeight
      const ratio = ch / height
      const gap = (cw - width * ratio) / 2
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: `${(width / cw * ratio) * 100}% 100%`,
        backgroundPosition: `${gap.toFixed(3)}px top`,
        marginLeft: `${gap.toFixed(3)}px`,
      } as CSSStyleDeclaration)
    }

    const resizeFull = (width: number, height: number) => {
      const cw = document.documentElement.clientWidth
      const ch = document.documentElement.clientHeight
      const ratio = ch / height
      const gap = (cw - width * ratio) / 2
      setStyle(document.body, {
        transform: `scale(${ratio})`,
        transformOrigin: 'left top',
        backgroundSize: `${(width / cw * ratio) * 100}% 100%`,
        backgroundPosition: `${gap.toFixed(3)}px top`,
        // marginLeft: `${gap.toFixed(3)}px`,
      } as CSSStyleDeclaration)

      document.documentElement.style.overflowX = 'scroll'
    }

    const resizeNone = () => {
      setStyle(document.body, {
        overflow: 'hidden',
        position: 'relative',
      } as CSSStyleDeclaration)
    }

    const resize = (config: PageConfig) => {
      switch (config.zoomMode) {
        case ZoomMode.auto:
          resizeAuto(config.width, config.height)
          break
        case ZoomMode.width:
          resizeWidth(config.width)
          break
        case ZoomMode.height:
          resizeHeight(config.width, config.height)
          break
        case ZoomMode.full:
          resizeFull(config.width, config.height)
          break
        default:
          resizeNone()
          break
      }
    }

    const { setUrl } = useEnvUrl()

    const initPageInfo = (config: PageConfig) => {
      document.title = editorStore.screen.name
      document.querySelector('meta[name="viewport"]')
        .setAttribute('content', `width=${config.width}`)

      setStyle(document.documentElement, {
        overflowX: 'hidden',
        overflowY: 'visible',
      } as CSSStyleDeclaration)

      setStyle(document.body, {
        width: `${config.width}px`,
        height: `${config.height}px`,
        backgroundImage: `url(${setUrl(pageConfig.value.bgimage)})`,
        backgroundColor: pageConfig.value.bgcolor,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      } as CSSStyleDeclaration)

      resize(config)
    }

    const router = useRouter()

    onMounted(async () => {
      try {

        const { data, code } = await getScreen(props.screenId)
        await filterStore.loadFilters({
          screenId: data?.id,
          projectId: data?.groupId,
        })

        if (code === 1000) {
          const page = {
            screen: {
              groupId: data.groupId,
              id: data.id,
              name: data.name,
            },
            config: data,
          }
          editorStore.setEditorOption(page)
          computedLoading()
          initPageInfo(page.config)
          const { componentsView, publishersView, subscribersView } = data.variables
          eventStore.$patch({ componentsView, publishersView, subscribersView })
          // filterStore.$patch({ dataFilters: data.dataFilters ?? [] })
          comStore.requestCom(data.id),
          on(window, 'resize', () => {
            resize(pageConfig.value)
          })
          loading.value = false
        } else {
          throw new Error('404')
        }
      } catch (error) {
        console.info('error: ', error)
        // router.replace({
        //   name: 'NotFound',
        //   params: { catchAll: 'error' },
        // })
      }
    })
    ikMitt.on('dv-dialog', com => {
      if (com.hided) {
        dialog.destroyAll()
        return
      }
      dialog.info({
        maskClosable: false,
        title: com?.dialog?.text,
        class: 'render-v-modal_d1',
        style: `width: ${com.dialog.width}px; height: ${com.dialog.height}px;`,
        content: () => h('div', {
          style: {},
        } ,com.children.map(co => h(resolveComponent(co.name), {
          com: co,
          style: {
            top: 0,
            left: 0,
            width: `${co.attr.w}px`,
            height: `${co.attr.h}px`,
            transform: `translate(${co.attr.x}px, ${co.attr.y}px)`,
            opacity: co.attr.opacity,
            position: 'absolute',
          },
        }))),
        onClose: () => {
          com.hided = true
          return true
        },
      })
    })

    return {
      cdn,
      LOGO: globalConfig.logo,
      loading,
      pageConfig,
      filterComs,
      styleFilter,
    }
  },
})
</script>

<style lang="scss">
html,
body {
  min-width: auto;
}

.render-v-modal_password {
  box-shadow: 0 0 1000px 1000px #000;
}

#datav-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f2a42;
  z-index: 2;

  .datav-logo,
  .text-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .datav-logo {
    width: 120px;
  }

  .text-logo {
    margin-top: 73px;
    width: 100px;
  }
}

.datav-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;

  .-datav-com.absolute {
    position: absolute !important;
    margin: 0 !important;
  }
}

.datav-watermark {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 99999999;
  width: 50px;

  img {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}

// 主内容区动画
.fade-enter-active,
.slide-left-enter-active,
.slide-right-enter-active,
.slide-top-enter-active,
.slide-bottom-enter-active {
  transition: 0.2s;
}

.fade-leave-active,
.slide-left-leave-active,
.slide-right-leave-active,
.slide-top-leave-active,
.slide-bottom-leave-active {
  transition: 0.15s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-from {
  opacity: 0;
  margin-left: 20px;
}

.slide-left-leave-to {
  opacity: 0;
  margin-left: -20px;
}

.slide-right-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.slide-right-leave-to {
  opacity: 0;
  margin-left: 20px;
}

.slide-top-enter-from {
  opacity: 0;
  margin-top: 20px;
}

.slide-top-leave-to {
  opacity: 0;
  margin-top: -20px;
}

.slide-bottom-enter-from {
  opacity: 0;
  margin-top: -20px;
}

.slide-bottom-leave-to {
  opacity: 0;
  margin-top: 20px;
}
</style>
