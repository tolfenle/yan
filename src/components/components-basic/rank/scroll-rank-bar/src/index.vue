<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:43:06
 * @LastEditTime : 2024-01-08 18:23:32
-->
<script setup lang="ts" name="ScrollRankBarProp">
import { defineComponent, PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { ScrollRankBar } from './scroll-rank-bar'

const props = defineProps({
  com: {
    type: Object as PropType<ScrollRankBar>,
    required: true,
  },
})

const apiStore = useApiStore()
const eventStore = useEventStore()
useDataCenter(props.com)

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? []
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const fixData = computed(() => {
  return dv_data.value.map(v => {
    return {
      ...v,
      x: v[dv_field.value.x],
      y: v[dv_field.value.y],
      z: v[dv_field.value.z],
    }
  }).sort((a, b)=> b[config.value.global.rankKey || dv_field.value.z] - a[config.value.global.rankKey || dv_field.value.z])
})

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wrapperStyle = computed(() => {
  const style = config.value.generate.textStyle
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
    ...style,
    fontSize: useNumberToPx(style.fontSize),
    color: setChartColor(style.color),
  }
})


const getBarStyle = index => {
  const item = config.value.series?.[index] || {}
  const mixStyle = { ...config.value.bar, ...item?.config?.bar }
  const { width, borderColor, borderType, borderWidth, borderRadius, color, background } = mixStyle

  return {
    all: {
      height: useNumberToPx(width),
      border: `${useNumberToPx(borderWidth)} ${borderType} ${setChartColor(borderColor)}`,
      borderRadius: useNumberToPx(borderRadius).join(' '),
    },
    bar: {
      ...setChartColor(color),
      background: config.value.generate.color[index],
      marginLeft: useNumberToPx(config.value.global.titleLeft ?? 8),
      borderRadius: useNumberToPx(borderRadius).join(' '),
      width: `${fixData.value?.[index].z}%`,
    },
    bg: {
      ...setChartColor(background),
      borderRadius: useNumberToPx(borderRadius).join(' '),
      width: `${100 - fixData.value?.[index].z}%`,
    },
  }
}

const getTitleStyle = index => {
  const item = config.value.series?.[index] || {}
  const mixStyle = { ...config.value.title, ...item?.config?.title }
  const { show, font } = mixStyle

  return {
    display: show ? 'unset' : 'none',
    ...font,
    marginLeft: useNumberToPx(config.value.global.titleLeft ?? 8),
    fontSize: useNumberToPx(font.fontSize),
    ...setChartColor(font.color),
    width: useNumberToPx(config.value.global.titleWidth ?? 60),
  }
}

const getCountStyle = index => {
  const item = config.value.series?.[index] || {}
  const mixStyle = { ...config.value.count, ...item?.config?.count }
  const { show, font } = mixStyle

  return {
    display: show ? 'unset' : 'none',
    ...font,
    fontSize: useNumberToPx(font.fontSize),
    ...setChartColor(font.color),
  }
}

const getProgressStyle = index => {
  const item = config.value.series?.[index] || {}
  const mixStyle = { ...config.value.progress, ...item?.config?.progress }
  const { show, font } = mixStyle

  return {
    display: show ? 'unset' : 'none',
    ...font,
    marginLeft: useNumberToPx(config.value.global.progressLeft ?? 8),
    fontSize: useNumberToPx(font.fontSize),
    ...setChartColor(font.color),
  }
}

const getStreamerStyle = () => {
  const { width, color } = config.value.global.streamer
  return {
    width: useNumberToPx(width),
    ...setChartColor(color),
  }
}

const getTopStyle = index => {
  const item = config.value.series?.[index] || {}
  const mixStyle = { ...config.value.top, ...item?.config?.top }
  const { background, color, borderColor, borderType, borderWidth, borderRadius, font, padding } = mixStyle
  return {
    ...setChartColor(background),
    border: `${useNumberToPx(borderWidth)} ${borderType} ${setChartColor(borderColor)}`,
    ...font,
    background: config.value.generate.color[index],
    color: setChartColor(font.color),
    borderRadius: useNumberToPx(borderRadius),
    fontSize: useNumberToPx(font.fontSize),
    padding: useNumberToPx(padding),
  }
}

const speed = computed(() => `${config.value.global.streamer.speed / 1000}s`)

const swiper = computed(() => config.value.swiper)
const numberToPx = useNumberToPx
</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <GlSwiper
      :length="fixData.length"
      :loop="swiper.loop"
      :row="swiper.row"
      :col="swiper.col"
      :space-between="swiper.spaceBetween"
      :autoplay="{
        delay: swiper.autoplay.delay,
        pauseOnMouseEnter: true,
      }"
      :direction="swiper.direction"
      :effect="swiper.effect"
      :slides-per-group="swiper.slidesPerGroup"
    >
      <template v-for="(item,index) in fixData" :key="item" #[index+1]>
        <div class="container">
          <div class="top" :style="getTopStyle(index)">{{ config.top.prefix }} {{ index+1 }}</div>
          <div class="right-continer">
            <div class="view">
              <div class="left" :style="{borderRadius: numberToPx(config.bar.borderRadius).join(' ')}">
                <div class="title" :style="getTitleStyle(index)">{{ item.x }}</div>
                <div class="chart" :style="getBarStyle(index).all">
                  <div class="bar" :style="getBarStyle(index).bar">
                    <div class="streamer" :style="getStreamerStyle()"></div>
                  </div>
                  <div class="bar-bg" :style="getBarStyle(index).bg"></div>
                </div>
              </div>
              <div class="right" :style="{ marginLeft: numberToPx(config.global.countLeft ?? 8) }">
                <div class="count" :style="getCountStyle(index)">{{ item.y }}{{ config.series[index]?.count?.suffix || config.count?.suffix }}</div>
                <div class="progress" :style="getProgressStyle(index)">{{ item.z }}{{ config.series[index]?.progress?.suffix.value || config.progress?.suffix.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </GlSwiper>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  user-select: none;
  align-items: center;

  .right-continer {
    flex: 1;
  }

  .view {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      flex-direction: row;
      flex: 1;
      align-items: center;

      .chart {
        position: relative;
        display: flex;
        flex: 1;
        overflow: hidden;

        .bar,
        .bar-bg {
          height: 100%;
        }

        .bar-bg {
          width: 100%;
        }

        .bar {
          position: relative;
          overflow: hidden;
        }

        .streamer {
          position: absolute;
          animation: glow v-bind(speed) infinite;
          height: 100%;
        }

        @keyframes glow {
          from {
            left: 0;
          }

          to {
            left: 100%;
          }
        }
      }
    }

    .right {
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
