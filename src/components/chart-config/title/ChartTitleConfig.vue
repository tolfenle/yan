<script setup lang="ts" name="ChartTitleConfig">
import { PropType } from 'vue'

const props = defineProps({
  config: {
    type: Object as PropType<typeof ETITLE_CONFIG>,
    default: () => { },
  },
  label: {
    type: String,
    default: '表题',
  },
})

const titleAlignv = GlTitleAlignV
const titleAlignl = GlTitleAlignL
</script>

<template>
  <g-field-collapse v-model="config.customPosition" toggle label="自定义位置">
    <g-field :leaval="2" label="位置值">
      <g-input-number v-model="config.left" inline label="左" />
      <g-input-number v-model="config.top" inline label="上" />
      <g-input-number v-model="config.right" inline label="右" />
      <g-input-number v-model="config.bottom" inline label="下" />
    </g-field>
  </g-field-collapse>
  <template v-if="!config.customPosition">
    <g-field :leaval="2" label="水平位置">
      <g-select v-model="config.textAlign" :data="titleAlignv" />
    </g-field>
    <g-field :leaval="2" label="垂直位置">
      <g-select v-model="config.textVerticalAlign" :data="titleAlignl" />
    </g-field>
  </template>
  <g-field :leaval="2" label="主副标题间距">
    <g-input-number v-model="config.itemGap" />
  </g-field>

  <!-- <g-field-collapse label="主标题">
      <g-field label="标题内容" tooltip="如果返回数据中存在在z，或z字段映射值，将覆盖此标题内容">
        <g-input v-model="config.text" />
      </g-field>
      <GChartFontConfig :config="config.textStyle" />
    </g-field-collapse>
    <g-field-collapse label="副标题">
      <g-field label="副标题内容">
        <g-input v-model="config.subtext" />
      </g-field>
      <GChartFontConfig :config="config.subtextStyle" />
    </g-field-collapse> -->
  <!-- <el-tab-pane label="主标题" tab="text">
      <g-field :level="2" label="主标题文本">
        <GChartFontConfig :config="config.title.textStyle" />
      </g-field>
      <g-field :level="2" label="后缀内容">
        <g-input v-model="config.title.textSuffix" />
      </g-field>
      <g-field :level="2" label="后缀颜色">
        <g-color-picker v-model="config.title.textSuffixStyle.color" />
      </g-field>
      <g-field :level="2" label="后缀文本大小">
        <g-input-number v-model="config.title.textSuffixStyle.fontSize" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="副标题" tab="subtext">
      <g-field :level="2" label="主标题文本">
        <GChartFontConfig :config="config.title.subtextStyle" />
      </g-field>
      <g-field :level="2" label="前缀内容">
        <g-input v-model="config.title.preffix" />
      </g-field>
      <g-field :level="2" label="后缀内容">
        <g-input v-model="config.title.subtextSuffix" />
      </g-field>
    </el-tab-pane> -->
</template>

<style lang="scss" scoped>
</style>
