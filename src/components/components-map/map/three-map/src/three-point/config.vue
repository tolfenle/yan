<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-25 16:07:09
 * @LastEditTime : 2023-12-26 15:49:54
-->
<template>
  <div class="setting-panel-gui">
    999999
    <!-- <g-field-collapse :level="2" label="柱体">
      <g-field :level="2" label-span="6" label="颜色">
        <g-color-picker v-model="config.bottomColor" label="圆柱顶颜色" inline />
        <g-color-picker v-model="config.topColor" label="圆柱底颜色" inline />
      </g-field>
      <g-field :level="2" label-span="6" label="半径">
        <g-input-number
          v-model="config.topRadius"
          inline
          :min="0"
          :step="0.01"
          label="顶部半径"
        />
        <g-input-number
          v-model="config.bottomRadius"
          inline
          :min="0"
          :step="0.01"
          label="底部半径"
        />
      </g-field>
      <g-field :level="2" label-span="6" label="柱体材质">
        <g-switch v-model="config.material.transparent" inline label="允许透明" />
        <g-input-number
          v-model="config.material.opacity"
          inline
          :min="0"
          :step="0.1"
          :max="1"
          label="透明度"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      v-model="config.label.show"
      toggle
      :level="2"
      label="柱体文本"
    >
      <g-field :level="2" label-span="6" label="文本内容">
        <g-monaco-editor
          language="javascript"
          :code="config.label.innerHTML"
          :height="180"
          editor-class="formatter-editor-three-bar"
          @change="handChangeCode"
          @blur="updateCode"
        />
      </g-field>
      <g-field :level="2" label-span="6" label="顶部偏移">
        <g-input-number
          v-model="config.label.z"
          :step="0.01"
        />
      </g-field>
      <g-field :level="2" label-span="6" label="字体">
        <GChartFontConfig :config="config.label.style" />
      </g-field>
    </g-field-collapse> -->
  </div>
</template>

<script lang='ts' setup>
import { onBeforeUnmount, ref, toRef } from 'vue'
import { ThreePoint } from './index'

const props = defineProps<{
  com: ThreePoint
}>()

const config = toRef(props.com, 'config')

const code = ref(config.value.label.innerHTML)
const handChangeCode = val => {
  props.com.config.label.innerHTML = val.value
}
const updateCode = val => {
  code.value = val.value
}
onBeforeUnmount(() => {
  props.com.config.label.innerHTML = code.value
})
</script>

<style lang="scss" scoped>
.formatter-editor-three-bar {
  width: 100%;
}
</style>
