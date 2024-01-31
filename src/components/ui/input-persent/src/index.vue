<template>
  <div
    class="datav-gui g-input-number is-persent"
    :class="[
      {
        '--inline': !!inline,
        '--single': inline === 'inline-single',
      }
    ]"
  >
    <n-config-provider :theme-overrides="themeOverrides" abstract>
      <div style="display: flex;">
        <n-switch v-model:value="value.isPersent" style="width: 80px;" @update:value="handleInput">
          <template #checked>
            百分比
          </template>
          <template #unchecked>
            数值
          </template>
        </n-switch>
        <n-input-number
          v-model:value="value.value"
          :size="size"
          :min="min"
          :max="max"
          :step="step"
          placeholder=""
          @update:value="handleInput"
        >
          <template #suffix>
            {{ suffix || (value.isPersent ? '%' : 'px') }}
          </template>
          <template v-if="prefix" #prefix>
            {{ prefix }}
          </template>
        </n-input-number>
      </div>
    </n-config-provider>
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { NConfigProvider, NInputNumber } from 'naive-ui'
import type { Size } from 'naive-ui/es/input-number/src/interface'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Object as PropType<{
      isPersent: boolean
      value: number
    }>,
    default: () => ({
      isPersent: false,
      value: 0,
    }),
  },
  label: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<Size>,
    default: 'small',
  },
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },
  inline: {
    type: [Boolean, String],
    default: false,
  },
  prefix: String,
  suffix: String,
})
const emits = defineEmits([UPDATE_MODEL_EVENT])

const value = ref(props.modelValue)

const handleInput = () => {
  emits(UPDATE_MODEL_EVENT, value.value)
}

const themeOverrides = {
  Button: {
    textColorText: 'var(--datav-font-color)',
    fontSizeMedium: '12px',
    iconSizeMedium: '12px',
  },
}

if (props.size === 'medium') {
  themeOverrides.Button.fontSizeMedium = '14px'
  themeOverrides.Button.iconSizeMedium = '14px'
}
</script>
