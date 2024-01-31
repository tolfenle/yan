<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-17 18:57:28
 * @LastEditTime : 2023-11-21 12:11:56
-->
<template>
  <div>
    <g-field-collapse label="全局">
      <g-field
        :level="2"
        tooltip="当请求或者静态数据存在url时，将忽略配置的视频地址"
        label="视频地址"
      >
        <g-upload-video v-model="config.url" />
      </g-field>
      <g-field :level="2" label="封面图">
        <g-upload-image v-model="config.poster" />
      </g-field>
      <g-field :level="2" label="自动播放">
        <n-switch v-model:value="config.autoplay" />
      </g-field>
      <g-field :level="2" label="循环播放">
        <n-switch v-model:value="config.loop" />
      </g-field>
      <g-field :level="2" label="交互控件">
        <n-switch v-model:value="config.controls" />
      </g-field>
      <g-field :level="2" label="显示视频首帧">
        <n-switch v-model:value="config.videoInit" />
      </g-field>
      <!-- <g-field :level="2" label="显示下载控件">
        <n-switch v-model:value="config.download" />
      </g-field> -->
      <g-field :level="2" label="画中画">
        <n-switch v-model:value="config.pip" />
      </g-field>
      <g-field :level="2" label="迷你播放器">
        <n-switch v-model:value="config.miniplayer" />
      </g-field>
      <g-field :level="2" tooltip="启用后将根据默认宽高比例自适应" label="流式布局">
        <n-switch v-model:value="config.fluid" />
      </g-field>
      <g-field :level="2" label="自适应方式">
        <n-radio-group v-model:value="config.fitVideoSize" size="small">
          <n-radio-button v-for="em in fitVideoSizes" :key="em.id" :value="em.id">
            {{ em.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :level="2" label="画面填充">
        <n-radio-group v-model:value="config.videoFillMode" size="small">
          <n-radio-button v-for="em in videoFillMode" :key="em.id" :value="em.id">
            {{ em.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :level="2" tooltip="0到1，最大音量为1" label="音量">
        <g-input-number
          v-model="config.volume"
          :min="0"
          :max="1"
          :step="0.1"
          suffix=""
        />
      </g-field>
      <g-field :level="2" label="默认播放速率">
        <g-input-number
          v-model="config.defaultPlaybackRate"
          :min="0.5"
          :max="20"
          :step="0.25"
          suffix=""
        />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import Vedio from './vedio'
export default defineComponent({
  name: `VVedio`,
  props: {
    com: {
      type: Object as PropType<Vedio>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    return {
      config,
      fitVideoSizes: GlFitVideoSizes,
      videoFillMode :GlVideoFillMode,
    }
  },
})
</script>
