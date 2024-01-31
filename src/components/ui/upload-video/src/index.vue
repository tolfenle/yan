<template>
  <div
    class="datav-gui g-upload"
    :class="[
      {
        '--inline --single': !!inline,
      },
    ]"
  >
    <n-input
      :value="modelValue"
      size="small"
      placeholder="请输入视频地址"
      @update:value="handleInput"
    >
      <template #prefix>
        <n-icon>
          <IconLink />
        </n-icon>
      </template>
    </n-input>
    <n-upload
      accept="video/*"
      :action="action"
      :multiple="false"
      :data="form"
      :show-file-list="false"
      :headers="headerParam"
      @before-upload="beforeUpload"
      @finish="finishUpload"
    >
      <n-upload-dragger>
        <n-spin :show="loading">
          <div
            class="g-upload-image-wrap"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            <div class="g-upload-image-content">
              <div class="g-upload-tip">
                <n-icon size="60">
                  <i class="jh jh-shipin" style="font-size: 50px;"></i>
                </n-icon>
                <div>点击或拖拽文件到这里更换</div>
              </div>
            </div>
            <div v-if="modelValue" class="g-upload-image-cover">
              <span>更改</span>
              <p style="padding: 0 10px;">|</p>
              <span @click.stop="removeVideo">删除</span>
            </div>
          </div>
        </n-spin>
      </n-upload-dragger>
    </n-upload>
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage, UploadFileInfo } from 'naive-ui'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { uploadHeader, uploadHost, previewHost, validAllowVideo } from '@/utils/upload-util'
import { saveProjectFile } from '@/api/image'
import { IconLink } from '@/icons'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'GUploadVideo',
  components: {
    IconLink,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    allowType: {
      type: String,
      default: 'mp4,webm',
    },
    size: {
      type: Number,
      default: 10,
    },
    action: {
      type: String,
      default: uploadHost,
    },
    previewHost: {
      type: String,
      default: previewHost,
    },
    label: {
      type: String,
      default: '',
    },
    inline: {
      type: [Boolean, String],
      default: false,
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    // const { proxy } = getCurrentInstance();
    const nMessage = useMessage()
    const loading = ref(false)
    const form = ref({
      key: '',
      token: '',
      projectId: '',
      dir: '',
    })
    const headerParam = uploadHeader()
    const visibleCover = ref(false)

    const editorStore = useEditorStore()
    const { screen } = storeToRefs(editorStore)

    const beforeUpload = async (options: { file: UploadFileInfo; event: Event; }) => {
      try {
        loading.value = true
        form.value.token = localStorage.getItem(
          import.meta.env.VITE_DATAV_TOKEN_KEY as string,
        )
        form.value.dir = screen.value.groupId as any
        return true
      } catch (error) {
        loading.value = false
        nMessage.error(error.message)
      }

      return false
    }

    const finishUpload = (options: { file: UploadFileInfo; event: Event; }) => {
      loading.value = false
      const obj = (options.event.target as XMLHttpRequest).response
      const res = JSON.parse(obj)
      if (!res.code === 1000) {
        nMessage.error(res.msg)
      } else {
        const { file, event } = options
        const response = JSON.parse((event?.target as any)?.response || '{}')
        saveProjectFile({
          ...(response?.data || {}),
          size: file.file.size,
          fileName: file.name,
          type: file.type,
          projectId: screen.value.groupId,
        }).then(() => {
        })
        ctx.emit(UPDATE_MODEL_EVENT, `${res.data.path}`)
      }
    }

    const handleInput = (value: string) => {
      ctx.emit(UPDATE_MODEL_EVENT, value)
    }

    const handleMouseEnter = () => {
      if (props.modelValue) {
        visibleCover.value = true
      }
    }

    const handleMouseLeave = () => {
      visibleCover.value = false
    }

    const removeVideo = () => {
      handleInput('')
      visibleCover.value = false
    }

    return {
      loading,
      form,
      visibleCover,
      headerParam,
      beforeUpload,
      finishUpload,
      handleInput,
      handleMouseEnter,
      handleMouseLeave,
      removeVideo,
    }
  },
})
</script>
