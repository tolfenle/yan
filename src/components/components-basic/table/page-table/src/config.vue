<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-31 14:54:34
 * @LastEditTime : 2024-02-06 10:56:33
-->
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
      :label="`列${index + 1}`"
      :tab="`列${index + 1}`"
      :name="index"
    >
      <g-field :level="2" label="列名">
        <g-input v-model="item.columns.label" />
      </g-field>
      <g-field :level="2" label="列Key值">
        <g-input v-model="item.columns.prop" />
      </g-field>
      <g-field :level="2" label="对齐方式">
        <g-select v-model="item.columns.align" :data="aligns" />
      </g-field>
      <g-field :level="2" label="固定位置">
        <g-select v-model="item.columns.fixed" clearable :data="fixeds" />
      </g-field>
      <g-field :level="2" label="列类别">
        <n-radio-group v-model:value="item.columns.type" size="small">
          <n-radio-button value="text"> 文本 </n-radio-button>
          <n-radio-button value="number"> 数值 </n-radio-button>
          <n-radio-button value="date"> 日期 </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field v-if="item.columns.type === 'number'" :level="2" label="数值">
        <g-switch v-model="item.columns.number.animation.active" label="数值动画" />
        <g-switch v-model="item.columns.number.animation.showSeparator" label="分隔符" />
        <g-input-number
          v-model="item.columns.number.animation.precision"
          label="精度"
          inline
          suffix=""
          :min="0"
        />
        <g-input-number
          v-model="item.columns.number.animation.duration"
          label="动画时长"
          inline
          suffix="ms"
          :min="0"
          :step="500"
        />
        <g-switch v-model="item.columns.number.animation.loop" label="循环播放" />
        <g-input-number
          v-model="item.columns.number.animation.duration"
          label="循环间隔"
          inline
          suffix="ms"
          :min="0"
          :step="500"
        />
        <g-input v-model="item.columns.number.prefix" inline label="前缀" />
        <g-input v-model="item.columns.number.suffix" inline label="后缀" />
      </g-field>
      <g-field v-else-if="item.columns.type === 'date'" :level="2" label="日期">
        <g-input v-model="item.columns.date.format" label="日期格式化" />
      </g-field>
      <g-field :level="2" label="列宽" tooltip="列宽设置为0时默认自适应">
        <g-input-number
          v-model="item.columns.minWidth"
          label="最小宽度"
          inline
          suffix="px"
          :min="0"
        />
        <g-input-number
          v-model="item.columns.width"
          label="宽度"
          inline
          suffix="px"
          :min="0"
        />
      </g-field>
      <g-field-collapse
        v-for="(ev, index) in item.columns.event"
        :key="index"
        v-model="ev.use"
        toggle
        label-span="5"
        :features="['remove']"
        tooltip="满足此条件的列表项，将按照此条件配置的样式展示"
        :label="`样式条件${index + 1}`"
        :list="item.columns.event"
        :d-index="index"
      >
        <g-field :level="2" label="条件配置" label-span="5">
          <g-input v-model="ev.key1" inline label="字段名" />
          <g-select
            v-model="ev.operator"
            :data="operators"
            inline
            label="运算符"
          />
          <g-switch v-model="ev.static" label="是否与固定值比较" />
          <g-input
            v-if="!ev.static"
            v-model="ev.key2"
            inline
            label="比较字段名"
          />
          <g-input
            v-else
            v-model="ev.value"
            inline
            label="输入要比较的值"
          />
        </g-field>
        <g-field :level="2" label="条件样式" label-span="5">
          <g-color-picker v-model="ev.config.background" label="背景色" />
          <GChartFontConfig :overflow="false" no-line-height :config="ev.config" />
        </g-field>
        <GBorderConfig :span="5" :config="ev.config" />
      </g-field-collapse>
      <div>
        <n-button
          :focusable="false"
          type="default"
          size="tiny"
          style="width: 100%;"
          @click="handAddEvent(index)"
        >
          <template #icon>
            <n-icon :size="12">
              <IconPlus />
            </n-icon>
          </template>
          新建样式条件
        </n-button>
      </div>
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

    const handAddEvent = (index: number) => {
      config.value.series[index].columns.event.push({
        static: true,
        use: true,
        key1: '',
        operator: '',
        key2: '',
        value: '',
        config: {
          ...chartFont,
          icon: '',
          layout: 'lr', // lr  rl
          ...useDefaultBorder(),
          background: useChartColor({ isCss: true }),
        },
      })
    }

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      GenerateType: EGenerateType,
      justifyContents: GlJustifyContents,
      aligns: GlHAligns,
      fixeds: [
        ...GlYxisPosition,
        {
          id: '',
          value: '不固定',
        },
      ],
      operators: GlOperators,
      handAddEvent,
    }
  },
})
</script>
