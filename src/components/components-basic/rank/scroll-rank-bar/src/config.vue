<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2023-12-01 18:00:36
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" :config="config" chart-type="none">
    <g-field :level="2" label-span="6" label="TOP类型">
      <g-select v-model="config.generate.type" :data="topShowTypes" />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
      <g-field :level="2" tooltip="使用返回数据中的哪个字段进行排序" label="排序字段">
        <g-input v-model="config.global.rankKey" />
      </g-field>
      <g-field :level="2" label="间距">
        <g-input-number
          v-model="config.global.titleLeft"
          inline
          label="标题与TOP间距"
          suffix="px"
        />
        <g-input-number
          v-model="config.global.countLeft"
          inline
          label="数值与图表间距"
          suffix="px"
        />
        <g-input-number
          v-model="config.global.progressLeft"
          inline
          label="进度与数量间距"
          suffix="px"
        />
        <g-input-number
          v-model="config.top.padding"
          inline
          label="TOP内边距"
          suffix="px"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="TOP" tab="global">
      <g-field-collapse
        v-model="config.global.top.autoWh"
        toggle
        :level="2"
        label="自适应宽高"
      >
        <g-field :level="2" label="尺寸">
          <g-input-number
            v-model="config.global.top.width"
            inline
            label="宽度"
            suffix="px"
          />
          <g-input-number
            v-model="config.global.top.height"
            inline
            label="高度"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="内边距">
          <g-input-number
            v-model="config.top.padding"
            inline
            label="TOP内边距"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse v-model="config.top.show" toggle label="边框">
        <g-field :level="2" label="前缀">
          <g-input v-model="config.top.prefix" clearable />
        </g-field>
        <g-field :level="2" label="前几显示TOP">
          <g-input-number v-model="config.top.showNum" :min="0" label="当设置为0时为全部显示" />
        </g-field>
        <g-field :level="2" label="背景色">
          <g-color-picker v-model="config.top.background" />
        </g-field>
        <g-field :level="2" label="边框">
          <g-color-picker v-model="config.top.borderColor" inline />
          <g-select v-model="config.top.borderType" :data="lineStyles" inline />
          <g-input-number
            v-model="config.top.borderWidth"
            :min="0"
            label="边框宽度"
            inline
          />
        </g-field>
        <g-field :level="2" label="边框圆角">
          <g-input-number
            v-model="config.top.borderRadius[0]"
            suffix="px"
            :min="0"
            label="左上圆角"
            inline
          />
          <g-input-number
            v-model="config.top.borderRadius[1]"
            suffix="px"
            :min="0"
            label="右上圆角"
            inline
          />
          <g-input-number
            v-model="config.top.borderRadius[2]"
            suffix="px"
            :min="0"
            label="左下圆角"
            inline
          />
          <g-input-number
            v-model="config.top.borderRadius[3]"
            suffix="px"
            :min="0"
            label="右下圆角"
            inline
          />
        </g-field>
      </g-field-collapse>

      <g-field :level="2" label="字体">
        <GChartFontConfig :config="config.top.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="title">
      <g-field :level="2" label-span="4" label="字体">
        <GChartFontConfig :config="config.title.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="数量" tab="count">
      <g-field-collapse
        v-model="config.count.show"
        :level="2"
        toggle
        label-span="4"
        label="显示数量"
      >
        <g-field :level="2" label-span="4" label="后缀">
          <g-input v-model="config.count.suffix" />
        </g-field>
        <g-field :leval="2" label="顺序" label-span="4">
          <g-switch v-model="config.count.inStart" label="数量显示在占比前" />
        </g-field>
        <g-field :leval="2" label="字体" label-span="4">
          <GChartFontConfig :config="config.count.font" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="占比" tab="progress">
      <g-field-collapse
        v-model="config.progress.show"
        :level="2"
        toggle
        label-span="4"
        label="显示占比"
      >
        <g-field :level="2" label-span="4" label="后缀">
          <g-input v-model="config.progress.suffix.value" />
        </g-field>
        <g-field :leval="2" label="字体" label-span="4">
          <GChartFontConfig :config="config.progress.font" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="进度图" tab="bar">
      <g-field :level="2" label="高度">
        <g-input-number v-model="config.bar.width" :min="0" />
      </g-field>
      <g-field :level="2" label="颜色">
        <g-color-picker v-model="config.bar.color" />
      </g-field>
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.bar.background" />
      </g-field>
      <g-field :level="2" label="边框">
        <g-color-picker v-model="config.bar.borderColor" inline />
        <g-select v-model="config.bar.borderType" :data="lineStyles" inline />
        <g-input-number
          v-model="config.bar.borderWidth"
          :min="0"
          label="边框宽度"
          inline
        />
      </g-field>
      <g-field :level="2" label="边框圆角">
        <g-input-number
          v-model="config.bar.borderRadius[0]"
          suffix="px"
          :min="0"
          label="左上圆角"
          inline
        />
        <g-input-number
          v-model="config.bar.borderRadius[1]"
          suffix="px"
          :min="0"
          label="右上圆角"
          inline
        />
        <g-input-number
          v-model="config.bar.borderRadius[2]"
          suffix="px"
          :min="0"
          label="左下圆角"
          inline
        />
        <g-input-number
          v-model="config.bar.borderRadius[3]"
          suffix="px"
          :min="0"
          label="右下圆角"
          inline
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="轮播" tab="scroll">
      <GSwiperConfig :config="config.swiper" />
    </el-tab-pane>
    <el-tab-pane label="流光" tab="stream">
      <g-field :level="2" label="宽度">
        <g-input-number
          v-model="config.global.streamer.width"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="颜色">
        <g-color-picker v-model="config.global.streamer.color" />
      </g-field>
      <g-field :level="2" label="动画速度">
        <g-input-number
          v-model="config.global.streamer.speed"
          suffix="ms"
        />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { ScrollRankBar, ScrollRankBarSeries } from './scroll-rank-bar'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VScrollRankBarProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<ScrollRankBar>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    const handleAddSeriesItem = () => {
      config.value.series.push(new ScrollRankBarSeries(`TOP${config.value.series.length + 1}`))
    }

    const handRemoveSeriesItem = index => {
      config.value.series.splice(index, 1)
    }

    return {
      config,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlHAligns,
      vAligns: GlVAligns,
      orients: GlOrients,
      waperEffects: GlWaperEffects,
      lineStyles: GlLineStyles,
      topShowTypes: GlTopShowTypes,
      GenerateType: EGenerateType,
    }
  },
})
</script>
