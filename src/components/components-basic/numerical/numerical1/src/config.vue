<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2024-01-11 17:56:03
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" :config="config" chart-type="none">
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
    <g-field :level="2" label="布局方式">
      <g-select
        v-model="config.generate.lr"
        inline
        label="图标布局"
        :data="cssLayoutlr"
      />
      <g-select
        v-model="config.generate.labelTb"
        inline
        label="标题布局"
        :data="cssLayoutLabel"
      />
    </g-field>
    <g-field :level="2" label="文本对齐方式">
      <g-select
        v-model="config.generate.hAlign"
        inline
        label="水平布局"
        :data="hAligns"
      />
    </g-field>
    <g-field :level="2" label="块间距">
      <g-input-number
        v-model="config.generate.gap[0]"
        inline
        :min="1"
        label="左右间距"
      />
      <g-input-number
        v-model="config.generate.gap[1]"
        inline
        label="上下间距"
      />
    </g-field>
    <g-field :level="2" label="显示数量">
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
    </g-field>
    <g-field :level="2" label="间距">
      <g-input-number
        v-model="config.generate.labelGap"
        inline
        label="标题与数值间距"
        suffix="px"
      />
      <g-input-number
        v-model="config.generate.iconGap"
        inline
        label="图标与文本间距"
        suffix="px"
      />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="config.background" allow-img />
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
    </el-tab-pane>
    <el-tab-pane label="图标" tab="bar">
      <g-field :level="2" label="图标">
        <g-upload-image v-model="config.icon.url" />
      </g-field>
      <g-field :level="2" label="背景">
        <g-color-picker v-model="config.icon.background" inline label="背景色" />
        <g-input-number
          v-model="config.icon.radius"
          suffix="px"
          :min="0"
          inline
          label="背景圆角"
        />
      </g-field>
      <g-field :level="2" label="图标尺寸">
        <g-input-number
          v-model="config.icon.size[0]"
          :min="0"
          inline
          label="宽度"
          suffix="px"
        />
        <g-input-number
          v-model="config.icon.size[1]"
          :min="0"
          inline
          label="高度"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="内边距">
        <g-input-number
          v-model="config.icon.padding"
          suffix="px"
        />
      </g-field>
      <g-field :level="2" label="阴影">
        <g-color-picker v-model="config.shadow.color" inline label="阴影颜色" />
        <g-input-number
          v-model="config.shadow.blur"
          suffix="px"
          :min="0"
          inline
          label="阴影范围"
        />
        <g-input-number
          v-model="config.shadow.offset[0]"
          suffix="px"
          inline
          label="水平偏移"
        />
        <g-input-number
          v-model="config.shadow.offset[1]"
          suffix="px"
          inline
          label="垂直偏移"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="title">
      <g-field label-span="1" :level="2">
        <GChartFontConfig :config="config.labelFont" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="数值" tab="number">
      <g-field label-span="1" :level="2">
        <GChartFontConfig :config="config.numberFont" />
      </g-field>
      <GlNumberAnimationConfig :config="config.animation" />
    </el-tab-pane>
    <el-tab-pane label="数值后缀" tab="suffix">
      <g-field-collapse
        v-model="config.suffix.show"
        toggle
        label-span="1"
        :level="2"
        label="显示后缀"
      >
        <g-field label="后缀内容" tooltip="当请求中返回了suffix字段时，以返回内容为主" :level="2">
          <g-input v-model="config.suffix.value" />
        </g-field>
        <g-field label="与左侧间距" :level="2">
          <g-input-number v-model="config.suffix.left" suffix="px" />
        </g-field>
        <g-field label="后缀字体" :level="2">
          <GChartFontConfig :config="config.suffix.font" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="轮播" tab="global">
      <g-field-collapse v-model="config.global.scroll.use" label="启用轮播" toggle>
        <g-field :level="2" label="轮播方式">
          <g-select
            v-model="config.global.scroll.direction"
            :data="orients"
            inline
            label="切换方向"
          />
          <g-select
            v-model="config.global.scroll.effect"
            :data="waperEffects"
            inline
            label="显示方式"
          />
        </g-field>
        <g-field :level="2" label="轮播间隔">
          <g-input-number
            v-model="config.global.scroll.speed"
            suffix="ms"
            :min="0"
            :step="500"
            inline
            label="切换速度"
          />
          <g-input-number
            v-model="config.global.scroll.delay"
            suffix="ms"
            :min="0"
            :step="500"
            inline
            label="轮播速度"
          />
        </g-field>
      </g-field-collapse>
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
      <g-field :level="2" label="应用系列样式">
        <g-switch v-model="item.config.used" />
      </g-field>
      <g-field :level="2" label="背景色">
        <g-color-picker v-model="item.config.background" allow-img />
      </g-field>
      <g-field-collapse label="图标">
        <g-field :level="2" label="图标">
          <g-upload-image v-model="item.config.icon.url" />
        </g-field>
        <g-field :level="2" label="背景">
          <g-color-picker v-model="item.config.icon.background" inline label="背景色" />
          <g-input-number
            v-model="item.config.icon.radius"
            suffix="px"
            :min="0"
            inline
            label="背景圆角"
          />
        </g-field>
        <g-field :level="2" label="图标尺寸">
          <g-input-number
            v-model="item.config.icon.size[0]"
            :min="0"
            inline
            label="宽度"
            suffix="px"
          />
          <g-input-number
            v-model="item.config.icon.size[1]"
            :min="0"
            inline
            label="高度"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="内边距">
          <g-input-number
            v-model="item.config.icon.padding"
            suffix="px"
          />
        </g-field>
        <g-field :level="2" label="阴影">
          <g-color-picker v-model="item.config.shadow.color" inline label="阴影颜色" />
          <g-input-number
            v-model="item.config.shadow.blur"
            suffix="px"
            :min="0"
            inline
            label="阴影范围"
          />
          <g-input-number
            v-model="item.config.shadow.offset[0]"
            suffix="px"
            inline
            label="水平偏移"
          />
          <g-input-number
            v-model="item.config.shadow.offset[1]"
            suffix="px"
            inline
            label="垂直偏移"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse label="标题">
        <g-field label-span="1" :level="2">
          <GChartFontConfig :config="item.config.labelFont" />
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
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { Numerical1, Numerical1Series } from './numerical1'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VNumerical1Prop',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<Numerical1>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(config, Numerical1Series)

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
      GenerateType: EGenerateType,
    }
  },
})
</script>
