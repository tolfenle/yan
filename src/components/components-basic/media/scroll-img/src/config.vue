<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime : 2023-12-27 18:33:31
-->
<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="图片" tab="image">
      <g-field label="尺寸">
        <g-select v-model="config.image.fit" :data="imageSize" />
      </g-field>
      <g-field label="错误描述">
        <g-input v-model="config.image.alt" label="图片加载错误时显示的文本" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="轮播" tab="swiper">
      <GSwiperConfig :config="config.swiper" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { ScrollImg } from './scroll-img'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VScrollImgProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<ScrollImg>,
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
