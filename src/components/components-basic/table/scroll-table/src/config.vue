<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2024-01-02 17:31:08
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="none">
    <g-field :level="2" label-span="6" label="大小">
      <n-radio-group v-model:value="config.generate.size" size="small">
        <n-radio-button value="small"> 小 </n-radio-button>
        <n-radio-button value="medium"> 默认 </n-radio-button>
        <n-radio-button value="large"> 大 </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" label-span="6" label="间距">
      <g-input-number
        v-model="config.generate.headerGap"
        label="表头与表格间距"
        inline
        suffix="px"
      />
      <g-input-number
        v-model="config.generate.rowWap"
        label="表格行间距"
        inline
        suffix="px"
      />
    </g-field>
    <g-field :level="2" label-span="6" label="每页行数">
      <g-input-number
        v-model="config.swiper.row"
        label="每页显示表格行数"
        suffix="行"
      />
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
        v-model="config.generate.border.show"
        toggle
        :level="2"
        label="边框"
      >
        <g-field :level="2" label="边框位置">
          <g-switch v-model="config.generate.single.out" inline label="外边框" />
          <g-switch v-model="config.generate.single.column" inline label="行边框" />
          <g-switch v-model="config.generate.single.line" inline label="列边框" />
        </g-field>

        <GBorderConfig :config="config.generate.border" />
      </g-field-collapse>

      <g-field-collapse
        v-model="config.order.show"
        toggle
        :level="2"
        label="序号"
      >
        <g-field :level="2" label="自动补0">
          <g-switch v-model="config.order.addZero" />
        </g-field>
        <g-field :level="2" label="尺寸">
          <g-input-number
            v-model="config.order.width"
            suffix="px"
            inline
            label="宽"
          />
          <g-input-number
            v-model="config.order.height"
            suffix="px"
            inline
            label="高"
          />
        </g-field>
        <g-field :level="2" label="字体">
          <GChartFontConfig :config="config.order" no-line-height :overflow="false" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="表头" tab="header">
      <g-field :level="2" label="高度">
        <g-input-number
          v-model="config.header.height"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.header.background" />
      </g-field>
      <g-field :level="2" label="表头">
        <GChartFontConfig
          label="表头"
          :overflow="false"
          no-line-height
          :config="config.header.font"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="奇数行" tab="odd">
      <!-- <g-field :level="2" label="高度">
        <g-input-number
          v-model="config.odd.height"
          suffix="px"
        />
      </g-field> -->
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.odd.background" />
      </g-field>
      <g-field :level="2" label="行属性">
        <GChartFontConfig
          label="行属性"
          :overflow="false"
          no-line-height
          :config="config.odd.font"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="偶数行" tab="even">
      <!-- <g-field :level="2" label="高度">
        <g-input-number
          v-model="config.even.height"
          suffix="px"
        />
      </g-field> -->
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.even.background" />
      </g-field>
      <g-field :level="2" label="行属性">
        <GChartFontConfig
          label="行属性"
          :overflow="false"
          no-line-height
          :config="config.even.font"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="轮播" tab="swiper">
      <GSwiperConfig :config="config.swiper" disable-col />
    </el-tab-pane>
  </el-tabs>
  <el-tabs
    v-else
    key="series"
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
      <g-field :level="2" label="列名">
        <g-input v-model="item.name" />
      </g-field>
      <g-field :level="2" label="列Key值">
        <g-input v-model="item.config.field" />
      </g-field>
      <g-field :level="2" label="列类别">
        <n-radio-group v-model:value="item.config.type" size="small">
          <n-radio-button value="text"> 文本 </n-radio-button>
          <n-radio-button value="number"> 数值 </n-radio-button>
          <n-radio-button value="date"> 日期 </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field v-if="item.config.type === 'number'" :level="2" label="数值">
        <g-switch v-model="config.generate.number.animate" label="数值动画" />
        <g-switch v-model="config.generate.number.spliter" label="分隔符" />
        <g-input v-model="config.generate.number.prefix" inline label="前缀" />
        <g-input v-model="config.generate.number.suffix" inline label="后缀" />
      </g-field>
      <g-field v-else-if="item.config.type === 'date'" :level="2" label="日期">
        <g-input v-model="item.config.date.format" label="日期格式化" />
      </g-field>
      <g-field-collapse
        v-model="item.config.width.auto"
        toggle
        :level="2"
        label="手动设置列宽"
      >
        <g-field :level="2" label="列类别">
          <g-input-number
            v-model="item.config.width.value"
            :suffix="item.config.width.isPercent ? '%' : 'px'"
            label="宽度值"
            inline
          />
          <g-switch v-model="item.config.width.isPercent" label="百分比模式" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-for="(ev, index) in item.config.event"
        :key="index"
        v-model="ev.use"
        toggle
        label-span="5"
        tooltip="满足此条件的列表项，将按照此条件配置的样式展示"
        :label="`样式条件${index + 1}`"
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
import { ScrollTable, ScrollTableSeries } from './scroll-table'
import { ElTabs, ElTabPane } from 'element-plus'
import { useDialog  } from 'naive-ui'

export default defineComponent({
  name: 'VScrollTableProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<ScrollTable>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, ScrollTableSeries)

    const handAddEvent = (index: number) => {
      config.value.series[index].config.event.push({
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

    const operators = GlOperators

    return {
      config,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      handAddEvent,
      operators,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlHAligns,
      vAligns: GlVAligns,
      orients: GlOrients,
      waperEffects: GlWaperEffects,
      lineStyles: GlLineStyles,
      topShowTypes: GlTopShowTypes,
    }
  },
})
</script>
