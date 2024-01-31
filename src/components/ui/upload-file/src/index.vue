<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-08 15:08:26
 * @LastEditTime : 2024-01-19 11:30:50
-->
<template>
  <div
    class="datav-gui g-upload"
    :class="[
      {
        '--inline --single': !!inline,
      },
    ]"
  >
    <!-- 输入文件地址 -->
    <n-input
      :value="modelValue"
      size="small"
      placeholder="请输入文件地址"
      @update:value="handleInput"
    >
      <template #prefix>
        <n-icon>
          <IconLink />
        </n-icon>
      </template>
    </n-input>
    <!-- 文件上传 -->
    <n-upload
      accept=""
      :action="action"
      :multiple="mutil"
      :show-file-list="false"
      :data="form"
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
                  <IconBox />
                </n-icon>
                <div>点击或拖拽文件到这里更换</div>
              </div>
            </div>
            <div v-if="visibleCover" class="g-upload-image-cover">
              <span>更改</span>
              <p style="padding: 0 10px;">|</p>
              <span @click.stop="removeImage">删除</span>
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

<script lang='ts' setup>
import { ref, watch } from 'vue'
import {
  useMessage,
  UploadFileInfo,
  NInput,
  NUpload,
  NIcon,
  NSpin,
  NUploadDragger,
} from 'naive-ui'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { generateId } from '@/utils/util'
import { validAllowImg } from '@/utils/upload-util'
import { getImageType, getImageList,getProjectImages, saveProjectFile } from '@/api/image'
import { IconLink, IconBox, IconArrowRight } from '@/icons'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/store/editor'
const props = defineProps({
  modelValue: String,
  allowType: {
    type: String,
    default: '',
  },
  accept: {
    type: String,
    default: '*',
  },
  size: {
    type: Number,
    default: 20,
  },
  action: {
    type: String,
    default: import.meta.env.VITE_UPLOAD_URL,
  },
  previewHost: {
    type: String,
    default: import.meta.env.VITE_LOAD_URL,
  },
  label: {
    type: String,
    default: '',
  },
  inline: {
    type: [Boolean, String],
    default: false,
  },
  dir: {
    type: String,
    default: '',
  },
  mutil: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits([UPDATE_MODEL_EVENT])
const { VITE_LOAD_URL } = import.meta.env

const { setUrl } = useEnvUrl()
const imgUrl = computed(() => setUrl(props.modelValue))

const editorStore = useEditorStore()
const { screen } = storeToRefs(editorStore)

const nMessage = useMessage()
const loading = ref(false)
const form = ref({
  key: '',
  token: '',
  projectId: '',
  dir: '',
})
const iserr = ref(false)
const visibleCover = ref(false)

const imageLists = ref([])
const projectImages  =ref([])

const typeList = ref([])
const selected: Ref<any> = ref({})


const handleUpdateValue= (value: any) => {
  if(value == 1){
    getType()
  } else {
    getProjectList()
  }
}

const beforeUpload = async (options: { file: UploadFileInfo; }) => {
  try {
    loading.value = true
    form.value.token = localStorage.getItem(
      import.meta.env.VITE_DATAV_TOKEN_KEY as string,
    )
    form.value.dir = props.dir
    return true
  } catch (error) {
    loading.value = false
    nMessage.error(error.message)
  }
  return false
}

const finishUpload = (options: {
  file: UploadFileInfo
  event?: ProgressEvent
}) => {
  loading.value = false
  const res = JSON.parse((options.event.target as XMLHttpRequest).response)
  if (res.code !== 1000) {
    nMessage.error(res.error)
  } else {
    emits(UPDATE_MODEL_EVENT, `${res.data.path}`)
  }
}

const beforeUploadMutil = async (options: { file: UploadFileInfo; }) => {
  const valid = validAllowImg(options.file.file, {
    allowType: props.allowType,
    allowSize: props.size,
  })

  if (valid) {
    nMessage.error(valid)
    return false
  }
  try {
    loading.value = true
    form.value.token = localStorage.getItem(
      import.meta.env.VITE_DATAV_TOKEN_KEY as string,
    )
    form.value.dir = props.dir
    return true
  } catch (error) {
    loading.value = false
    nMessage.error(error.message)
  }
  return false
}
const finishUploadMutil = (options: {
  file: UploadFileInfo
  event?: ProgressEvent
}) => {
  const { file, event } = options
  const response = JSON.parse((event?.target as any)?.response || '{}')
  emits(UPDATE_MODEL_EVENT, `${response.data.path}`)
  loading.value = false
}

const handleInput = (value: string) => {
  emits(UPDATE_MODEL_EVENT, value)
}
const handleMouseEnter = () => {
  if (props.modelValue) {
    visibleCover.value = true
  }
}

const handleMouseLeave = () => {
  visibleCover.value = false
}

const removeImage = () => {
  handleInput('')
  visibleCover.value = false
}
</script>

<style lang="scss">
.datav-ready-photo-dialog.n-dialog {
  .n-dialog__content {
    padding: 0 16px;
  }

  .n-tabs .n-tabs-tab .n-tabs-tab__label {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>

<style lang="scss" scoped>
.comWarp {
  height: calc(100vh - 180px);
  padding: 10px 0 0;

  .left {
    width: 160px;
    border-right: 1px solid #454851;
    height: 100%;
    overflow-y: auto;

    .active {
      color: #fff !important;
      background-color: var(--datav-main-color) !important;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      box-sizing: border-box;
      padding: 10px;
      margin: 0 10px;
      cursor: pointer;
      font-size: 13px;
      margin-bottom: 10px;
      border-radius: 4px;
      position: relative;
      background: var(--datav-component-bg);
      box-shadow: inset 0 0 0 1px rgb(255 235 235 / 10%), 0 0 0 1px #181818;
    }
  }

  .right {
    width: calc(100% - 160px);
    height: 100%;
    overflow-y: auto;
    padding-left: 10px;
  }
}

.uploaded-image-list {
  column-count: 6;
  column-gap: 10px;
  overflow-x: hidden;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 200px);

  .n-upload-dragger {
    height: 268px;
    display: flex;
    align-items: center;
  }

  div:not(:first-child) {
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--datav-border);
    cursor: pointer;
    padding: 8px;
    margin-bottom: 8px;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;

    &:hover {
      border: var(--datav-border-primary);
    }
  }
}
</style>
