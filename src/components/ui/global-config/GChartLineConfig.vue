<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 10:48:18
 * @LastEditTime : 2023-12-06 09:30:21
-->
<script setup lang="ts" name="ChartLineConfig">
import { chartLineStyle } from '@/components/chart-config/public/chartFont'
import { PropType } from 'vue'
import { cloneDeep } from 'lodash-es'
import { IconDelete } from '@/icons'

const props = defineProps({
  config: {
    type: Object as PropType<typeof chartLineStyle>,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
  allowImg: {
    type: Boolean,
    default: true,
  },
  allowInherit: {
    type: Boolean,
    default: false,
  },
  allShadow: {
    type: Boolean,
    default: true,
  },
})

const lineStyles = GlLineStyles

const isMutilColor = computed(() => Array.isArray(props.config.color))

const handAddColor = () => {
  props.config.color.push(cloneDeep(props.config.color[0]))
}

const handRemoveColor = index => {
  props.config.color.splice(index, 1)
}
</script>

<template>
  <g-field :label="`${label}颜色`">
    <!-- TODO 颜色可以是多选 -->
    <g-color-picker
      v-if="!isMutilColor"
      v-model="config.color"
      :allow-img="allowImg"
      :allow-inherit="allowInherit"
    />
    <template v-else>
      <div v-for="(color,index) in config.color" :key="index" class="color-mutil-picker">
        <g-color-picker
          v-model="config.color[index]"
          :allow-img="allowImg"
          :allow-inherit="allowInherit"
        />
        <IconDelete v-if="index" @click="handRemoveColor(index)" />
      </div>
      <n-button size="small" class="mutil-color-btn" @click="handAddColor">添加颜色</n-button>
    </template>
  </g-field>
  <g-field :label="`${label}设置`">
    <g-input-number
      v-model="config.opacity"
      :min="0"
      :max="1"
      :step="0.1"
      inline
      label="透明度"
    />
    <g-input-number v-model="config.width" inline label="宽度" />
    <g-select
      v-model="config.type"
      label="类型"
      inline
      :data="lineStyles"
    />
    <g-input-number
      v-if="config.type === 'dashed'"
      v-model="config.dashOffset"
      inline
      label="虚线偏移量"
    />
    <tempalte v-if="allShadow">
      <g-input-number
        v-model="config.shadowBlur"
        inline
        label="阴影范围"
      />
      <g-color-picker v-model="config.shadowColor" inline label="阴影颜色" />
      <g-input-number
        v-model="config.shadowOffsetX"
        inline
        label="阴影水平偏移量"
      />
      <g-input-number
        v-model="config.shadowOffsetY"
        inline
        label="阴影垂直偏移量"
      />
    </tempalte>
  </g-field>
</template>

<style lang="scss" scoped>
.color-mutil-picker {
  width: 100%;
  display: flex;
  align-items: center;
  height: 35px;

  &:first-child {
    width: calc(100% - 28px);
  }

  svg {
    width: 24px;
    fill: var(--el-color-info);
    cursor: pointer;
    margin-left: 6px;
    transition: fill 0.25s;

    &:hover {
      fill: var(--el-color-danger);
    }
  }
}

.mutil-color-btn {
  width: calc(100% - 28px);
}
</style>
