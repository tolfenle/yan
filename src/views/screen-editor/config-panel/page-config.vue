<template>
  <div class="config-manager-page">
    <div class="config-manager-head">
      <n-radio-group
        v-model:value="pageView"
        size="small"
        :focusable="false"
      >
        <n-radio-button :value="0">页面配置</n-radio-button>
        <n-radio-button :value="1">其它配置</n-radio-button>
        <n-radio-button :value="2">全局事件</n-radio-button>
      </n-radio-group>
    </div>
    <div v-if="!pageView" class="config-manager-body">
      <div class="page-config">
        <div class="page-config-wp">
          <g-field label="屏幕大小" :is-flat="true">
            <g-input-number
              v-model="pageConfig.width"
              label="宽度"
              :min="100"
              :max="20000"
              inline
              @change="onSizeChange"
            />
            <g-input-number
              v-model="pageConfig.height"
              label="高度"
              :min="100"
              :max="20000"
              inline
              @change="onSizeChange"
            />
          </g-field>
          <g-field label="背景颜色">
            <g-color-picker v-model="pageConfig.bgcolor" />
          </g-field>
          <g-field label="背景图">
            <g-upload-image v-model="pageConfig.bgimage" />
          </g-field>
          <g-field label="重置">
            <n-button
              size="tiny"
              style="width: 100%;"
              :focusable="false"
              @click="resetBGImage"
            >
              恢复默认背景
            </n-button>
          </g-field>
        </div>

        <div class="page-config-wp">
          <g-field label="页面缩放方式">
            <n-radio-group v-model:value="pageConfig.zoomMode" name="zoomMode" size="small">
              <n-radio-button v-for="zm in zoomModes" :key="zm.value" :value="zm.value">
                <n-tooltip>
                  <template #trigger>
                    <n-icon>
                      <IconAdaptAuto v-if="zm.value === ZoomMode.auto" />
                      <IconAdaptWidth v-else-if="zm.value === ZoomMode.width" />
                      <IconAdaptHeight v-else-if="zm.value === ZoomMode.height" />
                      <IconFullscreen v-else-if="zm.value === ZoomMode.full" />
                      <IconStop v-else />
                    </n-icon>
                  </template>
                  {{ zm.label }}
                </n-tooltip>
              </n-radio-button>
            </n-radio-group>
          </g-field>
          <g-field label="栅格间距" tooltip="每次移动的距离，单位px">
            <g-input-number
              v-model="pageConfig.grid"
              :min="1"
              :max="20"
              suffix="px"
            />
          </g-field>
        </div>
        <div class="page-config-wp">
          <g-field label="缩略图">
            <n-upload
              abstract
              accept="image/*"
              :action="cover.uploadHost"
              :multiple="false"
              :show-file-list="false"
              :data="form"
              @before-upload="beforeUpload"
              @finish="finishUpload"
            >
              <n-button-group>
                <n-button
                  size="tiny"
                  class="cover-btn"
                  :focusable="false"
                  @click="cutCover"
                >
                  <n-spin v-if="cover.loading" :size="14" />
                  <template v-else>
                    截取封面
                  </template>
                </n-button>
                <n-upload-trigger #="{handleClick}" abstract>
                  <n-button
                    size="tiny"
                    class="cover-btn"
                    :focusable="false"
                    @click="handleClick"
                  >
                    <n-spin v-if="uploadLoading" :size="14" />
                    <template v-else>
                      上传封面
                    </template>
                  </n-button>
                </n-upload-trigger>
              </n-button-group>
            </n-upload>
            <div class="screen-preview">
              <img v-if="pageConfig.screenshot" :src="setUrl(pageConfig.screenshot)">
              <img v-else :src="setUrl(cover.img)" style="object-fit: contain; opacity: 0.25; filter: grayscale(1);">
              <input readonly="true" class="screen-preview-paste" @paste="onPaste">
            </div>
            <span class="upload-tip">*选中封面，从剪贴板粘贴</span>
          </g-field>
          <g-field label="使用水印">
            <n-switch v-model:value="pageConfig.useWatermark" />
          </g-field>
        </div>
      </div>
    </div>
    <div v-else-if="pageView === 1" class="config-manager-body">
      <div class="page-config-wp">
        <g-field label="默认显示子屏">
          <g-select
            v-model="pageConfig.defaultPage"
            :data="pageConfig.pages"
            label-field="name"
          />
        </g-field>
      </div>
      <div class="page-config-wp">
        <!-- 全局HOST配置 -->
        <g-field-collapse
          v-for="(item, index) in pageConfig.host"
          :key="index"
          :class="{'is-config': item.host}"
          :label="`请求配置${index + 1} ${item.host ? '  （已配置）' : '  （尚未配置请求）'}`"
        >
          <g-field label="配置名称">
            <g-input v-model="item.name" clearable />
          </g-field>
          <g-field label="请求地址">
            <g-input v-model="item.host" clearable />
          </g-field>
          <g-field label="测试Token">
            <g-input
              v-model="item.token"
              clearable
            />
          </g-field>
          <g-field label="">
            <n-button
              style="width: 100%;"
              size="tiny"
              type="error"
              :focusable="false"
              @click="handRemoveHost(index)"
            >
              删除配置
            </n-button>
          </g-field>
        </g-field-collapse>
        <g-field label-span="0">
          <n-button
            style="width: 100%;"
            size="tiny"
            :focusable="false"
            @click="handAddHost"
          >
            添加请求配置
          </n-button>
        </g-field>
      </div>
      <div class="page-config-wp">
        <g-field-collapse label="权限配置">
          <g-field label="请求头名称" tooltip="作为iframe或者通过项目页面打开时，通过url传递的请求头参数；如配置为header，则打开大屏分享地址http://xxx?header={token: 'asdaxasda78'}时所有请求都将携带header中的参数">
            <g-input v-model="pageConfig.iframe.header.name" label="" />
          </g-field>
          <g-field label="请求体名称" tooltip="作为iframe或者通过项目页面打开时，通过url传递的请求头参数；如配置为body，则打开大屏分享地址http://xxx?header={token: 'asdaxasda78'}&body={name: 'test'}时所有请求都将携带body中的参数">
            <g-input v-model="pageConfig.iframe.body.name" />
          </g-field>
          <g-field label-span="24" class="next-line" :label="`访问示例:http://iking.datav.com?${pageConfig.iframe.header.name}={}&${pageConfig.iframe.body.name}={}`" />
        </g-field-collapse>
        <g-field-collapse label="分享配置">
          <g-field label="浏览器页签文字" tooltip="">
            <g-input v-model="pageConfig.iframe.title" />
          </g-field>
          <g-field label="浏览器页签图标" tooltip="">
            <g-upload-image v-model="pageConfig.iframe.favico" />
          </g-field>
          <g-field label="加载文字" tooltip="">
            <g-input v-model="pageConfig.iframe.loadingTitle" />
          </g-field>
          <g-field label="加载图标" tooltip="">
            <g-upload-image v-model="pageConfig.iframe.loadingIcon" />
          </g-field>
        </g-field-collapse>
      </div>
    </div>
    <div v-else class="config-manager-body">
      <div class="page-config-wp">
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'
import { UploadFileInfo, useMessage } from 'naive-ui'
import html2canvas from 'html2canvas'
import { globalConfig } from '@/config'
import { useToolbarStore } from '@/store/toolbar'
import { useEditorStore } from '@/store/editor'
import { ZoomMode } from '@/domains/editor'
import { uploadHost, previewHost, validAllowImg, dataURLtoBlob } from '@/utils/upload-util'
import { getTokenByEnv, upload } from '@/api/qiniu'
import { generateId } from '@/utils/util'
import { IconFullscreen, IconAdaptAuto, IconAdaptWidth, IconAdaptHeight, IconStop } from '@/icons'

const cdn = import.meta.env.VITE_APP_CDN

export default defineComponent({
  name: 'PageConfig',
  components: {
    IconFullscreen,
    IconAdaptAuto,
    IconAdaptWidth,
    IconAdaptHeight,
    IconStop,
  },
  setup() {

    const pageView = ref(0)

    const nMessage = useMessage()
    const toolbarStore = useToolbarStore()
    const editorStore = useEditorStore()
    const pageConfig = computed(() => editorStore.pageConfig)

    const { setUrl } = useEnvUrl()

    const zoomModes = [
      { value: ZoomMode.auto, label: '全屏铺满' },
      { value: ZoomMode.width, label: '等比缩放宽度铺满' },
      { value: ZoomMode.height, label: '等比缩放高度铺满' },
      { value: ZoomMode.full, label: '等比缩放高度铺满（可滚动）' },
      { value: ZoomMode.disabled, label: '不缩放' },
    ]

    const cover = ref({
      loading: false,
      img: globalConfig.logo,
      uploadHost,
    })
    const uploadLoading = ref(false)
    const form = ref({
      key: '',
      token: '',
    })

    const resetBGImage = () => {
      pageConfig.value.bgimage = `${cdn}/datav/bj.png`
    }

    const uploadCover = async (blob: Blob) => {
      try {
        toolbarStore.addLoading()
        const token = await getTokenByEnv()
        const formData = new FormData()
        formData.append('file', blob)
        formData.append('token', token)
        formData.append('dir', editorStore.screen.groupId as any)
        formData.append('key', `${editorStore.screen.id}_screenshot.png`)
        formData.append('filename', `${editorStore.screen.name}.png`)

        const res = await upload(uploadHost, formData)
        if (res.data.code === 1000) {
          pageConfig.value.screenshot = res.data.data.path
        }
      } catch (error) {
        throw error
      } finally {
        toolbarStore.removeLoading()
      }
    }

    const cutCover = async () => {
      const dom = document.getElementById('canvas-coms')
      if (!dom || cover.value.loading) {
        return
      }

      // 这里直接操作的 dom
      const { transform } = dom.style
      dom.style.transform = 'scale(1) translate(0px, 0px)'
      cover.value.loading = true
      setTimeout(async () => {
        try {
          const res = await html2canvas(dom, {
            scale: 1.2,
            logging: false,
            useCORS: true,
            backgroundColor: null,
            scrollX: 0,
            scrollY: 0,
          })

          dom.style.transform = transform
          const blob = dataURLtoBlob(res.toDataURL('image/jpeg', 0.8))
          await uploadCover(blob)
        } catch (error) {
          nMessage.error(error.message)
        } finally {
          cover.value.loading = false
        }
      }, 500)
    }

    const beforeUpload = async (options: { file: UploadFileInfo; event: Event; }) => {
      const valid = validAllowImg(options.file.file, {})

      if (valid) {
        nMessage.error(valid)
        return false
      }

      try {
        toolbarStore.addLoading()
        uploadLoading.value = true
        form.value.token = await getTokenByEnv()
        form.value.key = `upload/${generateId()}_${options.file.name}`
        return true
      } catch (error) {
        toolbarStore.removeLoading()
        uploadLoading.value = false
        nMessage.error(error.message)
      }

      return false
    }

    const finishUpload = (options: { file: UploadFileInfo; event: Event; }) => {
      toolbarStore.removeLoading()
      uploadLoading.value = false

      const res = JSON.parse((options.event.target as XMLHttpRequest).response)
      if (res.error) {
        nMessage.error(res.error)
      } else {
        pageConfig.value.screenshot = res?.key || res.data?.path
      }
    }

    const onPaste = async (ev: ClipboardEvent) => {
      if (ev.type === 'paste' && ev.clipboardData) {
        try {
          const item = ev.clipboardData.items[0]
          if (item && item.type.includes('image')) {
            const file = item.getAsFile()
            if (file) {
              await uploadCover(file)
            }
          }
        } catch (error) {
          nMessage.error(error.message)
        }
      }
    }

    const onSizeChange = () => {
      editorStore.autoCanvasScale(() => toolbarStore.getPanelOffset)
    }

    const handAddHost = () => {
      pageConfig.value.host.push({
        name: '',
        host: '',
        token: '',
      })
    }

    const handRemoveHost = index => {
      pageConfig.value.host.splice(index, 1)
    }

    return {
      pageView,
      ZoomMode,
      pageConfig,
      zoomModes,
      cover,
      uploadLoading,
      form,
      setUrl,
      resetBGImage,
      cutCover,
      beforeUpload,
      finishUpload,
      onPaste,
      onSizeChange,
      handAddHost,
      handRemoveHost,
    }
  },
})
</script>

<style lang="scss" scoped>
@import './config.scss';

.page-config {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 12px;
  color: var(--datav-gui-font-color-1);
}

.page-config-wp {
  position: relative;

  &:not(:last-child)::after {
    position: absolute;
    bottom: 1px;
    left: 1%;
    width: 95%;
    height: 1px;
    background: var(--datav-dark-color);
    content: '';
  }
}

.cover-btn {
  width: 96px;
}

.screen-preview {
  position: relative;
  width: 192px;
  height: 108px;
  margin-top: 8px;

  img {
    width: 100%;
    height: 100%;
  }

  .screen-preview-paste {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: 0 0;
    border: var(--datav-outline);
    transition: border-color 0.2s;

    &:hover {
      border-color: var(--datav-main-color);
    }
  }
}

.upload-tip {
  color: var(--datav-gui-font-color-description);
  margin-top: 4px;
  display: box;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
