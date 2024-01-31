<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2024-01-11 19:12:40
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === 'basic'" :config="config" chart-type="none">
    <g-field :level="2" label="卡片尺寸">
      <g-input-number
        v-model="config.generate.width"
        inline
        :min="0"
        label="宽度"
        suffix="px"
      />
      <g-input-number
        v-model="config.generate.height"
        inline
        :min="0"
        label="高度"
        suffix="px"
      />
    </g-field>
    <!-- <g-field :level="2" label="文本对齐方式">
      <g-select
        v-model="config.generate.hAlign"
        inline
        label="水平布局"
        :data="hAligns"
      />
    </g-field> -->
    <!-- <g-field :level="2" label="显示数量">
      <g-input-number
        v-model="config.generate.lineCount"
        inline
        :min="1"
        label="列数"
      />
      <g-input-number
        v-model="config.generate.rowCount"
        inline
        label="行数"
      />
    </g-field> -->
    <g-field :level="2" label="间距">
      <g-input-number
        v-model="config.generate.labelGap"
        label="标题与数值间距"
        suffix="px"
      />
    </g-field>
    <g-field :level="2" label="内边距">
      <g-input-number
        v-model="config.generate.padding[0]"
        suffix="px"
        :min="0"
        label="上边距"
        inline
      />
      <g-input-number
        v-model="config.generate.padding[2]"
        suffix="px"
        :min="0"
        label="下边距"
        inline
      />
      <g-input-number
        v-model="config.generate.padding[3]"
        suffix="px"
        :min="0"
        label="左边距"
        inline
      />
      <g-input-number
        v-model="config.generate.padding[1]"
        suffix="px"
        :min="0"
        label="右边距"
        inline
      />
    </g-field>
    <g-field :level="2" label="圆角">
      <g-input-number
        v-model="config.generate.radius[0]"
        suffix="px"
        :min="0"
        label="左上圆角"
        inline
      />
      <g-input-number
        v-model="config.generate.radius[1]"
        suffix="px"
        :min="0"
        label="右上圆角"
        inline
      />
      <g-input-number
        v-model="config.generate.radius[2]"
        suffix="px"
        :min="0"
        label="左下圆角"
        inline
      />
      <g-input-number
        v-model="config.generate.radius[3]"
        suffix="px"
        :min="0"
        label="右下圆角"
        inline
      />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="条件配置" tab="global">
      <g-field-collapse
        v-for="(ev, index) in config.event"
        :key="index"
        v-model="ev.use"
        toggle
        label-span="5"
        tooltip="满足此条件的数据项，将按照此条件配置的样式展示"
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
        <g-field :level="2" label="条件样式" label-span="5" />
        <g-field-collapse label="背景">
          <g-color-picker v-model="ev.config.background" allow-img />
        </g-field-collapse>

        <g-field-collapse label="标题">
          <g-field label-span="1" :level="2">
            <GChartFontConfig :config="ev.config.labelFont" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse
          v-model="ev.config.range.icon.show"
          label="趋势"
          tooltip="当数值变化时，显示的趋势图标"
          toggle
        >
          <g-field :level="2" label="趋势图标">
            <GlIconPicker v-model="ev.config.range.icon.url" />
          </g-field>
          <g-field label="字体" :level="2">
            <GChartFontConfig :config="ev.config.range.icon.style" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse label="数值">
          <g-field label-span="1" :level="2">
            <GChartFontConfig :config="ev.config.numberFont" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse
          v-model="ev.config.suffix.show"
          toggle
          label-span="1"
          :level="2"
          label="显示后缀"
        >
          <g-field label-span="1" :level="2">
            <GChartFontConfig :config="ev.config.suffix.font" />
          </g-field>
        </g-field-collapse>

        <g-field-collapse
          v-model="ev.config.chart.show"
          toggle
          label="图表"
          tooltip="当返回图表数据数量大于1时，如果设置的是条形图将被强制转换为柱状图"
        >
          <g-field label="图表类型" :level="2">
            <g-select v-model="ev.config.chart.type" :data="numberChartTypes" />
          </g-field>
          <g-field :level="2" label="图形宽度">
            <g-input-number
              v-model="ev.config.chart.width"
              :min="1"
            />
          </g-field>
          <g-field :level="2" label="图形颜色">
            <g-color-picker v-model="ev.config.chart.color" />
          </g-field>
        </g-field-collapse>
      </g-field-collapse>
      <div>
        <n-button
          :focusable="false"
          type="default"
          size="tiny"
          style="width: 100%;"
          @click="handAddEvent()"
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
      <g-field-collapse label="背景">
        <g-color-picker v-model="item.config.background" allow-img />
      </g-field-collapse>

      <g-field-collapse label="标题">
        <g-field label-span="1" :level="2">
          <GChartFontConfig :config="item.config.labelFont" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse label="趋势">
        <g-field label-span="1" :level="2">
          <GlIconPicker v-model="item.config.range.icon.url" />
        </g-field>
        <g-field label-span="1" :level="2">
          <GChartFontConfig :config="item.config.range.icon.style" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse label="数值">
        <g-field label-span="1" :level="2">
          <GChartFontConfig :config="item.config.numberFont" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="item.config.suffix.show"
        toggle
        label-span="1"
        :level="2"
        label="显示后缀"
      >
        <g-field label-span="1" :level="2">
          <GChartFontConfig :config="item.config.suffix.font" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse
        v-model="item.config.chart.show"
        toggle
        label="图表"
        tooltip="当返回图表数据数量大于1时，如果设置的是条形图将被强制转换为柱状图"
      >
        <g-field label="图表类型" :level="2">
          <g-select v-model="item.config.chart.type" :data="numberChartTypes" />
        </g-field>
        <g-field :level="2" label="图形宽度">
          <g-input-number
            v-model="item.config.chart.width"
            :min="1"
          />
        </g-field>
        <g-field :level="2" label="图形颜色">
          <g-color-picker v-model="item.config.chart.color" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { Numerical2, Numerical2Series, usePublicConfig } from './numerical2'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VNumerical2Prop',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<Numerical2>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, Numerical2Series)

    const handAddEvent = () => {
      config.value.event.push({
        static: true,
        use: true,
        key1: '',
        operator: '',
        key2: '',
        value: '',
        config: {
          ...usePublicConfig(),
        },
      })
    }

    return {
      config,
      configType,
      activeTab,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      handAddEvent,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlHAligns,
      vAligns: GlVAligns,
      orients: GlOrients,
      operators: GlOperators,
      waperEffects: GlWaperEffects,
      numberChartTypes :GlNumberCartTypes,
    }
  },
})
</script>
