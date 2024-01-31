<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2023-12-11 14:00:52
-->
<template>
  <div
    class="datav-gui g-color-picker"
    :class="[
      {
        '--inline': !!inline,
        '--single': inline === 'inline-single',
      }
    ]"
  >
    <n-radio-group
      v-if="(allowImg || allowInherit) && !isStringColor"
      v-model:value="colorType"
      size="small"
      @change="handChange"
    >
      <n-radio-button :value="COLOR_TYPE.单色">自定义颜色</n-radio-button>
      <n-radio-button v-if="allowImg" :value="COLOR_TYPE.图片">图片</n-radio-button>
      <n-radio-button v-if="allowInherit" :value="COLOR_TYPE.继承">继承父级颜色</n-radio-button>
    </n-radio-group>
    <div v-if="isStringColor">
      <color-picker
        ref="refColorPicker"
        v-model:pureColor="color"
        v-model:gradientColor="color"
        :use-type="allowType"
        :active-key="activeKey"
        theme="black"
        :size="size"
        :style="{
          width: 'var(--n-height)',
          flex: `0 0 var(--n-height)`
        }"
        @update:pureColor="handleInput"
        @update:gradientColor="handleInputGradient"
        @activeKeyChange="handActiveChange"
      />
    </div>
    <div v-else-if="isArrayColor" class="color-tag">
      <div v-for="(item, index) in color" :key="index">
        <color-picker
          ref="refColorPicker"
          v-model:pureColor="color[index]"
          v-model:gradientColor="color[index]"
          :use-type="allowType"
          :active-key="(typeof item === 'string' ? item.startsWith('linear') : item.type === COLOR_TYPE.渐变) ? 'gradient' : 'pure'"
          theme="black"
          :size="size"
          :style="{
            width: 'var(--n-height)',
            flex: `0 0 var(--n-height)`
          }"
          @update:pureColor="handleInput($event, index)"
          @update:gradientColor="handleInputGradient($event, index)"
          @activeKeyChange="handActiveChange"
        />
        <n-icon
          v-show="color.length > 1"
          size="14"
          class="delete"
          @click="handDelete(index)"
        >
          <IconPlus />
        </n-icon>
      </div>
      <n-button
        tertiary
        size="tiny"
        style="margin-top: 2px;"
        @click="handAddColor"
      >
        <template #icon>
          <IconPlus />
        </template>
      </n-button>
    </div>
    <div v-else :style="{'margin-top': allowImg ? '11px' : 0}">
      <div v-if="colorType === 'color'" class="g-color-picker__inner">
        <color-picker
          ref="refColorPicker"
          v-model:pureColor="color.value"
          v-model:gradientColor="color.liner"
          :use-type="allowType"
          :active-key="activeKey"
          theme="black"
          :size="size"
          :style="{
            width: 'var(--n-height)',
            flex: `0 0 var(--n-height)`
          }"
          @update:pureColor="handleInput"
          @update:gradientColor="handleInputGradient"
          @activeKeyChange="handActiveChange"
        />
      </div>
      <g-upload-image v-else-if="colorType === 'image'" v-model="color.image.value" />
    </div>
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script lang='ts' setup>
import { PropType, ref, computed } from 'vue'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { COLOR_TYPE } from '@/components/chart-config/public/chartFont'
import { IconPlus, IconDelete } from '@/icons'

defineProps({
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'small',
  },
  label: {
    type: String,
    default: '',
  },
  inline: {
    type: [Boolean, String],
    default: false,
  },
  // 允许图片
  allowImg: {
    type: Boolean,
    default: false,
  },
  allowType: {
    type:String as PropType< 'pure' | 'gradient' | 'both'>,
    default: 'both',
  },
  // 支持继承
  allowInherit: {
    type: Boolean,
    default: false,
  },
})

const color = defineModel({
  type: Object as PropType<any> || String || Array as PropType<Array<String>>,
  default: () => {},
})

// 是否是纯字符串颜色
const isStringColor = computed(() => typeof color.value === 'string')
// 是否是数组类型颜色
const isArrayColor = computed(() => Array.isArray(color.value))
const handAddColor = () => {
  color.value.push('#000000')
}
const handDelete = (index: number) => {
  color.value.splice(index, 1)
}


const refColorPicker = ref(null)
const emits = defineEmits([UPDATE_MODEL_EVENT])
const handleInput = (value: string, index?: number) => {
  if (isStringColor.value) {
    color.value = value
    return
  } else if (isArrayColor.value) {
    color.value[index] = value
    return
  }
  color.value.type = COLOR_TYPE.单色
  color.value.value = value
}
const handleInputGradient = (value: string, index?: number) => {
  if (isStringColor.value) {
    color.value = value
    return
  }else if (isArrayColor.value) {
    color.value[index] = value
    return
  }
  color.value.type = COLOR_TYPE.渐变
  color.value.liner = value
}
const colorType = ref(color.value.type === COLOR_TYPE.继承 ? COLOR_TYPE.继承 : color.value.type === COLOR_TYPE.图片 ? COLOR_TYPE.图片 : COLOR_TYPE.单色)

const activeKey = computed(() => {
  return isStringColor.value ? color.value?.startsWith('linear-gradient') ? 'gradient' : 'pure' : color.value.type === COLOR_TYPE.渐变 ? 'gradient' : 'pure'
})

const handChange = val => {
  color.value.type = val.target.value
}

const handActiveChange = val => {
  if (isStringColor.value || isArrayColor.value) {
    return
  }
  color.value.type = val === 'pure' ? COLOR_TYPE.单色 : COLOR_TYPE.渐变
}
</script>

<style lang="scss" scoped>
:deep(.vc-color-wrap) {
  margin-right: 0;
  width: 100%;
  height: 24px;
  top: -2px;
  right: 0;
}

.color-tag {
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin: 0 7px 7px 0;
    position: relative;

    :deep(.vc-color-wrap) {
      width: 30px !important;

      .current-color {
        width: 30px;
        height: 24px;
      }
    }
  }
}

.delete.n-icon {
  color: var(--datav-gray-color);
  transform: rotateZ(45deg);
  position: absolute;
  right: -4px;
  top: -2px;
  cursor: pointer;

  &:hover {
    color: var(--datav-red-color);
  }
}
</style>
