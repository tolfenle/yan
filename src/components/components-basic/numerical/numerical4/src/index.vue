<!--
 * @Author: fj
 * @LastEditors: fj
 * @description:
 * @updateInfo: 本次更新内容：
 * @Date: 2024-01-03 13:55:24
 * @LastEditTime: 2024-01-09 16:22:14
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <GlCarousel
      :length="dv_data.length"
      :size="carousel.slidesPerView"
      :space-between="carousel.spaceBetween"
      :loop="carousel.loop"
    >
      <template v-for="(item, index) of fixData" :key="item" #[index+1]>
        <div :style="seriesMargin()">
          <!-- 标题时不显示 -->
          <div v-if="!isType2" class="top-image" :style="imageMargin()">
            <img
              :style="imageStyle()"
              :src="setUrl(config.series[index]?.config?.left.url || config.series[0]?.config?.left.url)"
              alt=""
            >
            <img
              :style="imageStyle()"
              :src="setUrl(config.series[index]?.config?.right.url || config.series[0]?.config?.right.url)"
              alt=""
            >
          </div>
          <div
            class="progressBg"
            :style="{ height: config.split.height + 'px' }"
          >
            <div class="progress" :style="progressBgStyle()"></div>
            <div class="progress1" :style="progressStyle1(item, index)"></div>
            <div class="progress2" :style="progressStyle2(item, index)"></div>
          </div>
          <!-- 图标时不显示 -->
          <div v-if="!isType1" class="title" :style="titleStyle()">
            <div>
              <span>{{ item.titleX }}</span>
              <span :style="marginTitleStyleL()">
                <span :style="{...numStyle(),...leftNumStyle(index)}">
                  <NNumberAnimation
                    ref="refNumber"
                    :from="0"
                    :to="item.x"
                    active
                    :duration="config.animation.duration"
                    :show-separator="config.animation.showSeparator"
                    :precision="config.animation.precision"
                  />
                </span>
                <span :style="suffixStyle()">{{ config.series[index]?.config?.suffix.label || config.series[0].config?.suffix.label }}</span>
              </span>
            </div>
            <div>
              <span :style="marginTitleStyleR()">
                <span :style="{...numStyle(),...rightNumStyle(index)}">
                  {{ item.y }}
                </span>
                <span :style="suffixStyle()">{{ config.series[index]?.config?.suffix.label || config.series[0].config?.suffix.label }}</span>
              </span>
              <span>{{ item.titleY }}</span>
            </div>
          </div>
        </div>
      </template>
    </GlCarousel>
  </div>
</template>

<script lang='ts' setup>
import { computed, ref, toRef, watch } from 'vue'
import {
  useDataCenter,
  getFieldMap,
} from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { Numerical4, ENumType } from './numerical4'
import { cloneDeep } from 'lodash-es'
import { NNumberAnimation } from 'naive-ui'

const props = defineProps<{
  com: Numerical4
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')

const carousel = computed(() => config.value.carousel)
const attr = toRef(props.com, 'attr')

const { setUrl } = useEnvUrl()

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const refNumber = ref(null)
onMounted(() => {
  useLoopAnimation(config.value.animation, refNumber.value)
})

const fixData = ref([])
watch(
  () => dv_data.value,
  (newVal, oldVal) => {
    fixData.value = newVal
      ? newVal.map((da, index) => {
        return {
          titleX: da[dv_field.value.titleX],
          x: da[dv_field.value.x],
          titleY: da[dv_field.value.titleY],
          y: da[dv_field.value.y],
          count: da[dv_field.value.count],
        }
      })
      : []
  },
)
const isType1 = computed(() => {
  return config.value.generate.type === ENumType.图标
})
const isType2 = computed(() => {
  return config.value.generate.type === ENumType.标题
})
// 系列间距
const seriesMargin = () => {
  const { seriesMargin } = config.value.generate
  return {
    marginBottom: `${seriesMargin}px`,
  }
}
//左右两侧图标样式
const imageStyle = () => {
  const { width, height } = config.value.generate.image
  return {
    height: `${height}px`,
    width: `${width}px`,
  }
}
// 图片与进度条之间的间距
const imageMargin = () => {
  const { imageChartMargin } = config.value.generate
  return {
    margin: `${imageChartMargin}px 0px`,
  }
}
// 主背景背景色
const progressBgStyle = () => {
  const { show, background, rote, width, split, height } =
    config.value.split
  const sp = 100 - split
  return {
    height: show ? `${height}px` : 0,
    left: `${width / 2}px`,
    backgroundSize: `${width}px ${height}px`,
    backgroundImage: `linear-gradient(${rote}deg, ${background} 0%, ${background} ${sp}%, transparent ${sp}%, transparent 100%)`,
  }
}
// 左侧背景
const progressStyle1 = (item: any, index: number) => {
  const { height } = config.value.split
  const { series } = config.value
  return {
    height: `${height}px`,
    width: `${(item.x / item.count).toFixed(2) * 100}%`,
    ...(setChartColor( series[index] ? series[index]?.config?.left?.bgColor : series[0]?.config?.left?.bgColor) as any),
  }
}
// 右侧背景
const progressStyle2 = (item: any, index: number) => {
  const { height } = config.value.split
  const { series } = config.value
  const width = (item.x / item.count).toFixed(2) * 100
  return {
    height: `${height}px`,
    width: `calc(100% - ${width}%)`,
    left: `${width}%`,
    ...(setChartColor(series[index] ? series[index].config.right.bgColor : series[0].config.right.bgColor) as any),
  }
}
// 标题样式
const titleStyle = () => {
  const { textChartMargin,font } = config.value.generate
  return {
    marginTop: `${textChartMargin}px`,
    ...font,
    ...(setChartColor(font.color) as any),
    fontSize: useNumberToPx(font.fontSize),
  }
}
// 左侧数值与标题间距
const marginTitleStyleL = ()=>{
  const { margin } = config.value.num
  return{
    marginLeft:`${margin}px`,
  }
}
// 右侧数值与标题间距
const marginTitleStyleR = ()=>{
  const { margin } = config.value.num
  return{
    marginRight:`${margin}px`,
  }
}
// 左侧数值颜色
const leftNumStyle = (index:number)=>{
  const { series } = config.value
  let color = cloneDeep( series[index] ? series[index].config.left.bgColor : series[0].config.left.bgColor)
  color.isText = true
  color.isCss = false
  return {
    ...(setChartColor(color) as any),
  }

}
// 右侧数值颜色
const rightNumStyle = (index:number)=>{
  const { series } = config.value
  let color = cloneDeep(series[index] ? series[index].config.left.bgColor : series[0].config.left.bgColor)
  color.isText = true
  color.isCss = false
  return {
    ...(setChartColor(color) as any),
  }
}

// 数值样式
const numStyle  =()=>{
  const { font } = config.value.num
  return{
    ...font,
    ...(setChartColor(font.color) as any),
    fontSize: useNumberToPx(font.fontSize),
  }
}
// 后缀样式
const suffixStyle = ()=>{
  const { font,margin } = config.value.suffix
  return{
    ...font,
    ...(setChartColor(font.color) as any),
    fontSize: useNumberToPx(font.fontSize),
    marginLeft:`${margin}px`,
  }
}
</script>
<style lang="scss" scoped>
.top-image {
  display: flex;
  justify-content: space-between;
}

.progressBg {
  width: 100%;
  position: relative;
}

.progress {
  z-index: 999;
  width: 100%;
  position: absolute;
}

.progress1 {
  position: absolute;
}

.progress2 {
  position: absolute;
}

.title {
  color: #fff;
  display: flex;
  justify-content: space-between;

  span {
    display: inline-block;
  }
}
</style>
