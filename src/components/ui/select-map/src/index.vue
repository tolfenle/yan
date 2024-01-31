<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-08 15:08:26
 * @LastEditTime : 2024-01-30 12:03:55
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
    <!-- 输入地图JSON地址 -->
    <!-- <n-input
      :value="modelValue"
      size="small"
      placeholder="请输入地图地址"
      @update:value="handleInput"
    >
      <template #prefix>
        <n-icon>
          <IconLink />
        </n-icon>
      </template>
    </n-input> -->
    <NCascader
      v-model:value="map"
      placeholder="选择地图范围"
      expand-trigger="click"
      :options="options"
      filterable
      value-field="code"
      label-field="name"
      @update:value="handleUpdateValue"
    />
    <!-- <gl-map-area v-model="showSelect" /> -->
  </div>
</template>

<script lang='ts' setup>
import { Ref, computed, ref, watch } from 'vue'
import {
  useMessage,
  NButton,
  NInput,
  NIcon,
  NCascader,
  NSpin,
} from 'naive-ui'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { generateId } from '@/utils/util'
import { validAllowImg } from '@/utils/upload-util'
import { IconLink } from '@/icons'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '@/store/editor'
import axios from 'axios'
import * as echarts from 'echarts'
import { registerMapAsync } from '@/components/_utils/echarts-util'
const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: '',
  },
  inline: {
    type: [Boolean, String],
    default: false,
  },
})

const emits = defineEmits([UPDATE_MODEL_EVENT])

const { setUrl } = useEnvUrl()
const map = ref(props.modelValue)

const editorStore = useEditorStore()

const options = ref([])
onMounted(async() => {
  const mapJSON = await axios.get(setUrl('/public/mapjson/pca-code.json'))
  options.value = mapJSON.data
})

const handleUpdateValue = async (value: string) => {
  await registerMapAsync(value)
  nextTick(() => {
    emits(UPDATE_MODEL_EVENT, value)
  })
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
