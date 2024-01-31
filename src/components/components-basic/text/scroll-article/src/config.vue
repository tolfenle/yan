<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2023-12-27 16:17:28
-->
<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="全局" tab="global">
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
      <g-field label="背景色">
        <g-color-picker v-model="config.global.background" />
      </g-field>
      <g-field :level="2" label="间距">
        <g-input-number v-model="config.global.rowMargin" label="行间距" suffix="px" />
        <g-input-number v-model="config.global.subMargin" label="主副标题间距" suffix="px" />
        <g-input-number v-model="config.global.timeMargin" label="副标题日期间距" suffix="px" />
        <g-input-number v-model="config.global.right" label="主标题图片间距" suffix="px" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="图片" tab="image">
      <g-field-collapse v-model="config.point.show" toggle label="点标记">
        <g-field label="背景色">
          <g-color-picker v-model="config.point.background" />
        </g-field>
        <g-field label="位置">
          <g-select v-model="config.point.position" :data="vAligns" />
        </g-field>
        <g-field label="标记尺寸">
          <g-input-number
            v-model="config.point.width"
            inline
            label="宽"
            suffix="px"
          />
          <g-input-number
            v-model="config.point.height"
            inline
            label="高"
            suffix="px"
          />
          <g-input-number
            v-model="config.point.radius"
            inline
            label="圆角"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse v-model="config.point.image.show" toggle label="图片">
        <g-field label="图片填充方式">
          <g-select v-model="config.point.image.size" :data="imageSize" />
        </g-field>
        <g-field label="图片尺寸">
          <g-input-number
            v-model="config.point.image.width"
            inline
            label="宽"
            suffix="px"
          />
          <g-input-number
            v-model="config.point.image.height"
            inline
            label="高"
            suffix="px"
          />
          <g-input-number
            v-model="config.point.image.radius"
            inline
            label="圆角"
            suffix="px"
          />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="title">
      <g-field :level="2" label="字体">
        <g-input-number v-model="config.title.overRow" label="最大显示行数" suffix="行" />
      </g-field>
      <g-field :level="2" label="字体">
        <GChartFontConfig :config="config.title.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="副标题" tab="subtitle">
      <g-field :level="2" label="字体">
        <g-input-number v-model="config.subTitle.overRow" label="最大显示行数" suffix="行" />
      </g-field>
      <g-field :level="2" label="字体">
        <GChartFontConfig :config="config.subTitle.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="日期" tab="date">
      <g-field :level="2" label="格式化">
        <g-input v-model="config.date.format" />
      </g-field>
      <g-field :level="2" label="字体">
        <GChartFontConfig :config="config.date.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="轮播" tab="swiper">
      <GSwiperConfig :config="config.swiper" disable-col />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { ScrollArticle } from './scroll-article'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VScrollTableProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<ScrollArticle>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlHAligns,
      vAligns: GlVAligns,
      orients: GlOrients,
      waperEffects: GlWaperEffects,
      lineStyles: GlLineStyles,
      topShowTypes: GlTopShowTypes,
      imageSize: GlBackgroundSies,
    }
  },
})
</script>
