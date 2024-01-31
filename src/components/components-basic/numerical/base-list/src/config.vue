<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2024-01-11 20:27:19
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="none">
    <g-field :level="2" label="间隔">
      <g-switch label="标题应用主题色" v-model="config.generate.titleInColor" />
      <g-switch label="数值应用主题色" v-model="config.generate.numberInColor" />
      <g-switch label="百分比应用主题色" v-model="config.generate.progressInColor" />
    </g-field>
    <g-field :level="2" label="列数">
      <g-input-number
        v-model="config.generate.colums"
        :min="1"
        :max="100"
        :step="1"
        suffix="列"
      />
    </g-field>
    <g-field :level="2" label="间隔">
      <g-input-number
        v-model="config.generate.mrVer"
        :step="1"
        label="水平间隔"
        suffix="px"
        inline
      />
      <g-input-number
        v-model="config.generate.mrHor"
        :step="1"
        label="垂直间隔"
        suffix="px"
        inline
      />
    </g-field>
    <g-field :level="2" label="显示下边框">
      <n-switch v-model:value="config.global.border.show" />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
      <g-field-collapse
        v-model="config.global.border.show"
        :level="2"
        toggle
        label="显示下边框"
      >
        <g-field label="尺寸">
          <g-input-number
            v-model="config.global.border.width"
            :min="0"
            :max="100"
            :step="1"
            label="宽度"
            inline
            suffix="%"
          />
          <g-input-number
            v-model="config.global.border.height"
            :min="0"
            :step="1"
            label="高度"
            inline
            suffix="px"
          />
        </g-field>
        <g-field label="颜色">
          <g-color-picker v-model="config.global.border.color" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.process.show"
        :level="2"
        toggle
        label="显示百分比值"
      >
        <g-field label="间距">
          <g-input-number
            v-model="config.process.font.marginLeft"
            label="左侧间隔"
            suffix="px"
            inline
          />
          <g-input-number
            v-model="config.process.font.marginRight"
            label="右侧间隔"
            suffix="px"
            inline
          />
        </g-field>
        <g-field label="字体大小">
          <GChartFontConfig :config="config.process.font" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="bar">
      <g-field label="字体大小">
        <GChartFontConfig :config="config.title.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="数值" tab="bar">
      <g-field label="字体大小">
        <GChartFontConfig :config="config.number.font" />
      </g-field>
      <g-field label="后缀">
        <g-input v-model="config.number.suffix.value" label="后缀内容" placeholder="请输入后缀" />
        <GChartFontConfig :config="config.number.suffix" />
      </g-field>
    </el-tab-pane>
  </el-tabs>
  <el-tabs
    v-else
    key="series"
    v-model="activeTab"
    tab-position="left"
    type="card"
    addable
    :closable="true"
    class="iking-v-custom-series"
    @tab-remove="handRemoveSeriesItem"
    @tab-add="handleAddSeriesItem"
  >
    <el-tab-pane
      v-for="(item, index) in config.series"
      :key="index"
      :label="`系列${index + 1}`"
      :tab="`系列${index + 1}`"
      :name="index"
    >
      index
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { BaseList, BaseListSeries } from './base-list'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBaseListProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<BaseList>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BaseListSeries)

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlHAligns,
      vAligns: GlVAligns,
      orients: GlOrients,
      waperEffects: GlWaperEffects,
    }
  },
})
</script>
