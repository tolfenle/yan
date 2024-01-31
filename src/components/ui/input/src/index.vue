<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2023-11-10 18:37:55
-->
<template>
  <div
    class="datav-gui g-input"
    :class="[
      {
        '--inline': !!inline,
        '--single': inline === 'inline-single',
      }
    ]"
  >
    <n-input
      :value="modelValue"
      :size="size"
      :placeholder="placeholder"
      @update:value="handleInput"
      @blur="handBlur"
    />
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { NInput } from 'naive-ui'
import type { Size } from 'naive-ui/es/input/src/interface'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'

defineProps({
  modelValue: {
    type: [String],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<Size>,
    default: 'small',
  },
  inline: {
    type: [Boolean, String],
    default: false,
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
})
const emits = defineEmits([UPDATE_MODEL_EVENT, 'blur'])

const handleInput = (value: string | number) => {
  emits(UPDATE_MODEL_EVENT, value)
}

const handBlur = (value: any) => {
  emits('blur', value)
}
</script>
