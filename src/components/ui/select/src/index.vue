<template>
  <div
    class="datav-gui g-select"
    :class="[
      {
        '--inline': !!inline,
        '--single': inline === 'inline-single',
        '--disabled': disabled,
      }
    ]"
  >
    <n-select
      :value="modelValue"
      :options="data"
      :size="size"
      :disabled="disabled"
      :label-field="labelField"
      :value-field="valueField"
      @update:value="handleInput"
    />
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script lang='ts' setup>
import { PropType, computed } from 'vue'
import { NSelect } from 'naive-ui'
import type { Size } from 'naive-ui/es/select/src/interface'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'

defineProps({
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  data: {
    type: Array as PropType<{
      id?: string
      key?: string
      value: string
    }[]>,
    default: () => [],
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
  labelField: {
    type: String,
    default: 'value',
  },
  valueField: {
    type: String,
    default: 'id',
  },
  disabled: Boolean,
})
const emits = defineEmits([UPDATE_MODEL_EVENT])

const handleInput = (value: string | number) => {
  emits(UPDATE_MODEL_EVENT, value)
}
</script>
