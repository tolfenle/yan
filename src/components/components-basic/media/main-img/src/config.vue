<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-01 11:36:48
 * @LastEditTime : 2023-11-13 12:13:11
-->
<template>
  <div class="setting-panel-gui">
    <g-field label="图片类型">
      <n-radio-group v-model:value="config.imageType" size="small">
        <n-radio-button v-for="em in imageTypes" :key="em.id" :value="em.id">
          {{ em.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field label="背景图">
      <g-upload-image v-model="config.backgroundImage" />
    </g-field>
    <g-field v-if="config.imageType === 'vector'" label="矢量图">
      <g-upload-image v-model="config.vectorImage" />
    </g-field>
    <g-field v-if="config.imageType === 'vector'" label="填充色">
      <g-color-picker v-model="config.vectorFill" />
    </g-field>
    <g-field label="图片重复">
      <g-select v-model="config.repeat" :data="repeatTypes" />
    </g-field>
    <g-field label="圆角">
      <g-input-number
        v-model="config.radius"
        :min="0"
        :step="1"
        suffix="px"
      />
    </g-field>
    <g-field label="背景图模式">
      <n-switch v-model:value="config.bgModel" />
    </g-field>
    <g-field label="自适应尺寸">
      <n-switch v-model:value="config.auto" />
    </g-field>
    <g-field label="手势光标">
      <n-switch v-model:value="config.cursor" />
    </g-field>
    <g-field-collapse
      tooltip="点击图片区域可跳转至设定的超链接"
      label="超链接配置"
    >
      <g-field :level="2" label="超链接">
        <g-input v-model="config.urlConfig.url" />
      </g-field>
      <g-field :level="2" label="是否打开新窗口">
        <n-switch v-model:value="config.urlConfig.ifBlank" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { MainImg } from './main-img'

export default defineComponent({
  name: 'VMainImgProp',
  props: {
    com: {
      type: Object as PropType<MainImg>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,

      imageTypes: GlImageTypes,
      repeatTypes: GlRepeatTypes,
    }
  },
})
</script>
