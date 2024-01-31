<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 13:59:38
 * @LastEditTime : 2023-11-21 12:13:13
-->
<template>
  <el-tabs
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="文本" tab="font">
      <g-field :level="2" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体" label="字体">
        <g-select v-model="config.font.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field :level="2" label="字号">
        <g-input-number
          v-model="config.font.fontSize"
          :min="12"
          :max="100"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="字体粗细">
        <g-select v-model="config.font.fontWeight" :data="fontWeights" />
      </g-field>
      <g-field :level="2" label="字体样式">
        <g-select v-model="config.font.fontStyle" :data="fontStyles" />
      </g-field>
      <g-field :level="2" label="数字颜色">
        <g-color-picker v-model="config.font.color" />
      </g-field>
      <g-field :level="2" label="间隔位数">
        <g-input-number
          v-model="config.split"
          :min="0"
          :max="100"
          :step="1"
          suffix="位"
          label="间隔几位添加分割符"
        />
      </g-field>
      <g-field :level="2" label="分隔符" :is-flat="true">
        <g-input v-model="config.symbol" />
      </g-field>
      <!-- <g-field label="背景动画">
        <g-select v-model="com.animation" :data="animatecss" />
      </g-field> -->
      <g-field :level="2" label="分隔符应用背景" :is-flat="true">
        <n-switch v-model:value="config.symbolInBg" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="边距" tab="margin">
      <g-field :level="2" label="外边距" :is-flat="true">
        <g-input-number
          v-model="config.margin[0]"
          :min="-100"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="上"
        />
        <g-input-number
          v-model="config.margin[1]"
          :min="-100"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右"
        />
        <g-input-number
          v-model="config.margin[2]"
          :min="-100"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="下"
        />
        <g-input-number
          v-model="config.margin[3]"
          :min="-100"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左"
        />
      </g-field>
      <g-field :level="2" label="内边距" :is-flat="true">
        <g-input-number
          v-model="config.padding[0]"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="上"
        />
        <g-input-number
          v-model="config.padding[1]"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="右"
        />
        <g-input-number
          v-model="config.padding[2]"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="下"
        />
        <g-input-number
          v-model="config.padding[3]"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
          inline="inline"
          label="左"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="背景图" tab="margin">
      <g-field :level="2" label="背景图片">
        <g-upload-image v-model="config.backgroundImage" />
      </g-field>
      <g-field :level="2" label="背景尺寸">
        <g-input-number
          v-model="config.backgroundSize[0]"
          :step="1"
          suffix="%"
          label="水平"
        />
        <g-input-number
          v-model="config.backgroundSize[1]"
          :step="1"
          suffix="%"
          label="垂直"
        />
      </g-field>
      <g-field :level="2" label="背景位置">
        <g-input-number
          v-model="config.backgroundPosition[0]"
          :step="1"
          suffix="px"
          label="水平"
        />
        <g-input-number
          v-model="config.backgroundPosition[1]"
          :step="1"
          suffix="px"
          label="垂直"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animate">
      <g-field label="背景动画">
        <g-select v-model="config.animate.type" :data="animatecss" />
      </g-field>
      <g-field label="动画曲线">
        <g-select v-model="config.animate.timing" :data="easing" />
      </g-field>
      <g-field label="持续时间">
        <g-input-number
          v-model="config.animate.direction"
          :min="0"
        />
      </g-field>
      <g-field label="延迟时间">
        <g-input-number
          v-model="config.animate.delay"
          :min="0"
        />
      </g-field>
      <g-field label="重复次数">
        <g-input-number
          v-model="config.animate.repeat"
          :min="0"
          label="设置为0时表示无数次"
        />
      </g-field>
    </el-tab-pane>
  </el-tabs>
  <div class="setting-panel-gui">
    <!-- <g-field :level="2" label="开启动画">
      <n-switch v-model:value="config.numbers.animation" />
    </g-field>
    <g-field :level="2" label="动画时长">
      <g-input-number
        v-model="config.numbers.duration"
        :min="0"
        :step="500"
        suffix="ms"
      />
    </g-field>
    <g-field :level="2" label="循环动画">
      <n-switch v-model:value="config.numbers.loop.loop" />
    </g-field>
    <g-field :level="2" label="循环间隔">
      <g-input-number
        v-model="config.numbers.loop.duration"
        :min="0"
        :step="500"
        suffix="ms"
      />
    </g-field> -->
  </div>
</template>

<script lang='ts'>
import NumberFlip from './number-flip'
import { ElTabs, ElTabPane } from 'element-plus'
import { defineComponent, PropType, toRef } from 'vue'
export default defineComponent({
  name: `VNumberFlip`,
  components: {
    ElTabs, ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<NumberFlip>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      justifyContents: GlJustifyContents,
      fontStyles: GlFontStyles,
      animatecss: GlAnimatecss,
      easing: GlEasing,
    }
  },
})

</script>
