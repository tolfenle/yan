<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-06 11:50:43
 * @LastEditTime : 2024-02-02 14:32:11
-->
<template>
  <div class="setting-panel-gui">
    <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" :config="config" chart-type="none" />
    <el-tabs
      v-else-if="config.generate.configType === GenerateType.全量"
      key="cardleft"
      tab-position="left"
      type="card"
    >
      <el-tab-pane label="全局" tab="global">
        <g-field :level="2" label-span="6" label="自动排序">
          <g-switch v-model="config.default.sort" />
        </g-field>
        <g-field :level="2" label-span="6" label="显示">
          <g-input-number
            v-model="config.borderStyle.top"
            label="图形与文本间隔"
            suffix="px"
            inline
          />
          <g-input-number
            v-model="config.default.rowNum"
            label="每页条数"
            inline
            suffix="条"
          />
        </g-field>
        <g-field :level="2" label-span="6" label="轮播">
          <g-input-number
            v-model="config.default.waitTime"
            suffix="ms"
            label="轮播速度"
            inline
          />
          <g-input-number
            v-model="config.default.carousel"
            suffix="条"
            label="每次轮播数量"
            inline
          />
        </g-field>
      </el-tab-pane>
      <el-tab-pane label="标题" tab="title">
        <!-- <g-field :level="2" label="前缀">
          <g-input v-model="config.prefixStyle" />
        </g-field> -->
        <g-field :level="2" label="与左侧间距">
          <g-input-number v-model="config.textStyle.left" suffix="px" />
        </g-field>
        <g-field :level="2" label="标题样式">
          <GChartFontConfig :config="config.textStyle" />
        </g-field>
      </el-tab-pane>
      <el-tab-pane label="前缀" tab="prefixStyle">
        <g-field :level="2" label="前缀内容">
          <g-input v-model="config.prefixStyle.prefix" />
        </g-field>
        <g-field :level="2" label="前缀样式">
          <GChartFontConfig :config="config.prefixStyle" />
        </g-field>
      </el-tab-pane>
      <el-tab-pane label="数值" tab="num">
        <g-field :level="2" label="数值样式">
          <GChartFontConfig :config="config.numStyle" />
        </g-field>
        <g-field-collapse
          v-model="config.numStyle.suffix.show"
          toggle
          :level="2"
          label="数值后缀"
        >
          <g-field :level="2" label="后缀内容">
            <g-input v-model="config.default.unit" />
          </g-field>
          <g-field :level="2" label="后缀样式">
            <GChartFontConfig :config="config.numStyle.suffix" />
          </g-field>
        </g-field-collapse>
      </el-tab-pane>
      <el-tab-pane label="图形" tab="bar">
        <g-field :level="2" label="图形高度">
          <g-input-number v-model="config.barStyle.height" :min="0" suffix="px" />
        </g-field>
        <g-field :level="2" label="图形颜色">
          <g-color-picker v-model="config.barStyle.color" />
        </g-field>
        <g-field :level="2" label="背景色">
          <g-color-picker v-model="config.borderStyle.background" />
        </g-field>
        <g-field
          :level="2"
          label="图形边框"
        >
          <g-input-number
            v-model="config.borderStyle.width"
            inline
            label="边框宽度"
            :min="0"
            suffix="px"
          />
          <g-select
            v-model="config.borderStyle.type"
            :data="lineStyles"
            inline
            label="边框类型"
          />
          <g-color-picker v-model="config.borderStyle.color" label="边框颜色" />
        </g-field>
        <g-field :level="2" label="圆角">
          <g-input-number
            v-model="config.barStyle.radius[0]"
            suffix="px"
            inline
            label="左上"
          />
          <g-input-number
            v-model="config.barStyle.radius[1]"
            suffix="px"
            inline
            label="右上"
          />
          <g-input-number
            v-model="config.barStyle.radius[2]"
            suffix="px"
            inline
            label="左下"
          />
          <g-input-number
            v-model="config.barStyle.radius[3]"
            suffix="px"
            inline
            label="右下"
          />
        </g-field>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { RankBoard } from './rank-board'

export default defineComponent({
  name: 'VRankBoardProp',
  components: {
    ElTabs, ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<RankBoard>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    // const handleAddSeriesItem = () => {
    //   return new BasicBarSeries(`系列${config.value.series.length + 1}`)
    // }

    return {
      config,
      // handleAddSeriesItem,
      fillTypes: GlFillTypes,
      // carouselTypes,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      lineStyles: GlLineStyles,
      backgroundSies: GlBackgroundSies,
      GenerateType: EGenerateType,
    }
  },
})
</script>
