<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" chart-type="none" :config="config">
    <g-field :level="2" label-span="6" label="表头">
      <g-input-number
        v-model="config.table.header.height"
        label="表头高度"
        inline
        :min="0"
        suffix="px"
      />
      <g-color-picker v-model="config.table.header.background" label="表头背景色" inline />
    </g-field>
    <g-field :level="2" label-span="6" label="表格">
      <g-input-number
        v-model="config.table.body.height"
        label="表格行高度"
        inline
        :min="0"
        suffix="px"
      />
      <g-color-picker v-model="config.table.body.background" label="表格背景色" inline />
    </g-field>
    <g-field :level="2" label-span="6" label="边框">
      <g-switch v-model="config.table.border" inline label="竖直边框" />
      <g-switch v-model="config.table.borderBottom" inline label="下边框" />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="表头" tab="header">
      <g-field-collapse
        v-model="config.table.showHeader"
        auto-open
        label="表头"
        toggle
      >
        <g-field :level="2" label="表头高度">
          <g-input-number v-model="config.table.header.height" :min="0" suffix="px" />
        </g-field>
        <g-field :level="2" label="表头背景">
          <g-color-picker v-model="config.table.header.background" allow-img />
        </g-field>
        <g-field :level="2" label="字体">
          <GChartFontConfig :config="config.table.header" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="表格" tab="body">
      <g-field :level="2" label="行高度">
        <g-input-number v-model="config.table.body.height" :min="0" suffix="px" />
      </g-field>
      <g-field :level="2" label="行背景">
        <g-color-picker v-model="config.table.body.background" allow-img />
      </g-field>
      <g-field :level="2" label="字体">
        <GChartFontConfig :config="config.table.body" />
      </g-field>
      <g-field-collapse
        v-model="config.table.body.odd.enable"
        auto-open
        label="奇数行配置"
        toggle
      >
        <g-field :level="2" label="奇数行">
          <g-color-picker
            v-model="config.table.body.odd.background"
            label="背景颜色"
            allow-img
          />
          <g-color-picker v-model="config.table.body.odd.color" label="文本颜色" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.table.body.even.enable"
        auto-open
        label="偶数行配置"
        toggle
      >
        <g-field :level="2" label="偶数行">
          <g-color-picker
            v-model="config.table.body.even.background"
            label="背景颜色"
            allow-img
          />
          <g-color-picker v-model="config.table.body.even.color" label="文本颜色" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="边框" tab="border">
      <g-field-collapse
        v-model="config.table.border"
        auto-open
        label="竖直边框"
        toggle
      >
        <GBorderConfig :config="config.table.borderStyle" />
      </g-field-collapse>
      <g-field-collapse
        v-model="config.table.borderBottom"
        auto-open
        label="下边框"
        toggle
      >
        <GBorderConfig :config="config.table.borderBottomStyle" />
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="分页" tab="page">
      <g-field :level="2" label="字段值">
        <g-input v-model="config.page.page" inline label="当前页码" />
        <g-input v-model="config.page.rows" inline label="每页行数" />
      </g-field>
      <g-field :level="2" label="分页位置">
        <g-select v-model="config.page.position" :data="justifyContents" />
      </g-field>
      <g-field :level="2" label="与表格间距">
        <g-input-number v-model="config.page.marginTop" suffix="px" />
      </g-field>
      <g-field :level="2" label="单页隐藏分页" tooltip="仅有一页数据时隐藏分页">
        <g-switch v-model="config.page.hideOnSinglePage" />
      </g-field>
      <g-field :level="2" label="文本颜色">
        <g-color-picker v-model="config.page.color" />
      </g-field>
      <g-field :level="2" label="选中时文本色">
        <g-color-picker v-model="config.page.activeColor" />
      </g-field>
      <g-field :level="2" label="禁用时文本色">
        <g-color-picker v-model="config.page.disableColor" />
      </g-field>
      <g-field-collapse
        v-model="config.page.background"
        auto-open
        label="背景"
        toggle
      >
        <g-field :level="2" label="背景色">
          <g-color-picker v-model="config.page.backgroundColor" />
        </g-field>
        <g-field :level="2" label="选中时背景色">
          <g-color-picker v-model="config.page.activeBg" />
        </g-field>
        <g-field :level="2" label="禁用时背景色">
          <g-color-picker v-model="config.page.disableBg" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
  </el-tabs>
  <el-tabs
    v-else
    key="columns"
    v-model="activeTab"
    tab-position="left"
    type="card"
    addable
    :closable="config.series.length > 1"
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
      456456
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { PageTable, BasicTableSeries } from './page-table'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VBasicBarsProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<PageTable>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, BasicTableSeries)

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      GenerateType: EGenerateType,
      justifyContents: GlJustifyContents,
    }
  },
})
</script>
