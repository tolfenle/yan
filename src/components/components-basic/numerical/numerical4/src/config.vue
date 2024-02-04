<!--
 * @Author: fj
 * @LastEditors: fj
 * @description:
 * @updateInfo: 本次更新内容：
 * @Date: 2024-01-03 13:55:24
 * @LastEditTime: 2024-01-09 16:20:15
-->
<template>
  <chartGenerateConfig
    v-if="config.generate.configType === GenerateType.基础"
    :config="config"
    chart-type="none"
  >
    <g-field :level="2" label="显示样式">
      <GlSelectCard v-model="config.generate.type" :data="numerical4Types" />
    </g-field>
    <g-field :level="2" label="系列上下间距">
      <g-input-number v-model="config.generate.seriesMargin" suffix="px" />
    </g-field>
    <g-field v-if="!isType1" :level="2" label="文本与图表间距">
      <g-input-number v-model="config.generate.textChartMargin" suffix="px" />
    </g-field>
    <g-field v-if="!isType1" :level="2" label="文本样式">
      <GChartFontConfig :config="config.generate.font" />
    </g-field>
    <g-field v-if="!isType2" :level="2" label="图片与图表间距">
      <g-input-number v-model="config.generate.imageChartMargin" suffix="px" />
    </g-field>
    <g-field v-if="!isType2" :level="2" label="图片尺寸">
      <g-input-number
        v-model="config.generate.image.width"
        inline
        label="宽度"
        suffix="px"
      />
      <g-input-number
        v-model="config.generate.image.height"
        inline
        label="高度"
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
    <el-tab-pane label="分割块" tab="split">
      <g-field-collapse
        v-model="config.split.show"
        toggle
        label="分割块"
      >
        <g-field :level="2" label="分割块形状">
          <g-select v-model="config.split.type" :data="typeList" />
        </g-field>
        <g-field :level="2" label="背景色" :is-flat="true">
          <g-color-picker v-model="config.split.background" />
        </g-field>
        <g-field :level="2" label="属性" :is-flat="true">
          <g-input-number
            v-model="config.split.width"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="宽度"
          />
          <g-input-number
            v-model="config.split.height"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="高度"
          />
          <g-input-number
            v-model="config.split.rote"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="旋转角度"
          />
          <g-input-number
            v-model="config.split.split"
            :min="0"
            :max="1000"
            :step="1"
            suffix="px"
            inline="inline"
            label="间隔距离"
          />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="数值" tab="num">
      <g-field :level="2" label="文本样式" :is-flat="true">
        <GChartFontConfig :config="config.num.font" />
      </g-field>
      <g-field :level="2" label="与标题间距" :is-flat="true">
        <g-input-number
          v-model="config.num.margin"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="后缀" tab="suffix">
      <g-field :level="2" label="文本样式" :is-flat="true">
        <GChartFontConfig :config="config.suffix.font" />
      </g-field>
      <g-field :level="2" label="与数值间距" :is-flat="true">
        <g-input-number
          v-model="config.suffix.margin"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="轮播" tab="swiper">
      <GCarousel :config="config.carousel" />
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
      <g-field label="后缀文本">
        <g-input v-model="item.config.suffix.label" />
      </g-field>
      <g-field label="左侧图片">
        <g-upload-image v-model="item.config.left.url" />
      </g-field>
      <g-field label="右侧图片">
        <g-upload-image v-model="item.config.right.url" />
      </g-field>
      <g-field label="左侧背景色" :is-flat="true">
        <g-color-picker v-model="item.config.left.bgColor" />
      </g-field>
      <g-field label="右侧背景色" :is-flat="true">
        <g-color-picker v-model="item.config.right.bgColor" />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang='ts'>
import { defineComponent, PropType, ref, toRef, watch } from 'vue'
import { Numerical4, ENumType, Numerical4Series } from './numerical4'
import { ElTabs, ElTabPane } from 'element-plus'
import { GlFontFamilys } from '@/data/select/select-options'
export default defineComponent({
  name: 'VNumerical4Prop',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<Numerical4>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const typeList = ref([
      { id: 'circle', value: '圆形' },
      { id: 'rect', value: '矩形' },
      { id: 'roundRect', value: '圆角矩形' },
      { id: 'triangle', value: '三矩形' },
      { id: 'diamond', value: '菱形' },
    ])

    const isType1 = computed(() => {
      return config.value.generate.type === ENumType.图标
    })
    const isType2 = computed(() => {
      return config.value.generate.type === ENumType.标题
    })

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(
      config,
      Numerical4Series,
    )
    const handAddEvent = () => {
      config.value.series.push({
        config: {
          suffix:{
            label:'',
          },
          left: {
            url: '',
            bgColor: useChartColor({ isText: true, value: '#dedede' }),
          },
          right: {
            url: '',
            bgColor: useChartColor({ isText: true, value: '#dedede' }),
          },
        },
      })
    }

    return {
      activeTab,
      config,
      configType,
      typeList,
      isType1,
      isType2,
      handAddEvent,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlJustifyContents,
      vAligns: GlAligns,
      orients: GlOrients,
      waperEffects: GlWaperEffects,
      operators: GlOperators,
      GenerateType: EGenerateType,
      numerical4Types: [
        {
          id: ENumType.图标,
          value: 'public/images/10799.jpg',
        },
        {
          id: ENumType.标题,
          value: 'public/images/23171.jpg',
        },
        {
          id: ENumType.图标加标题,
          value: 'public/images/29458.jpg',
        },
      ],
      numType: ENumType,
    }
  },
})
</script>

