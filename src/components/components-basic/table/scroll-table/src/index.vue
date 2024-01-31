<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:43:06
 * @LastEditTime : 2023-12-21 16:56:37
-->
<script setup lang="ts" name="ScrollTableProp">
import { PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { ScrollTable } from './scroll-table'
import { dayjs } from 'iking-utils'
const props = defineProps({
  com: {
    type: Object as PropType<ScrollTable>,
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

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const swiper = computed(() => config.value.swiper)

const series = computed(() => config.value.series)

const autoWidth = computed(() => {
  const len = series.value.filter(c=> !c.config.width.auto).length
  const staticNum = series.value.reduce((a,b )=> (!b.config.width.auto ? b.config.width.value : 0) + (a||0), 0)
  return `calc(${100 / len}% - ${(config.value.order.width + staticNum)/ len}px)`
})

const wrapperStyle = computed(() => {
  const { textStyle, lineStyle } = config.value.generate
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
    ...textStyle,
    fontSize: useNumberToPx(textStyle.fontSize),
  }
})

const headerStyle = computed(() => {
  const { background, height, font, image } = config.value.header
  return {
    ...setChartColor(background),
    ...font,
    height: useNumberToPx(height),
    lineHeight: useNumberToPx(height),
    ...setChartColor(font.color),
  }
})

const oddStyle = computed(() => {
  const { background, height, font, image } = config.value.odd
  return {
    ...setChartColor(background),
    ...font,
    // height: useNumberToPx(height),
    lineHeight: useNumberToPx(height),
    ...setChartColor(font.color),
  }
})

const evenStyle = computed(() => {
  const { background, height, font, image } = config.value.even
  return {
    ...setChartColor(background),
    ...font,
    // height: useNumberToPx(height),
    lineHeight: useNumberToPx(height),
    ...setChartColor(font.color),
  }
})

const getOrderStyle = () => {
  const { width, height, fontSize, color } = config.value.order
  return {
    ...config.value.order,
    width: useNumberToPx(width),
    height: useNumberToPx(height),
    fontSize: useNumberToPx(fontSize),
    color: setChartColor(color),
  }
}

// const getTitleStyle = index => {
//   const item = config.value.series?.[index] || {}
//   const mixStyle = { ...config.value.title, ...item?.config?.title }
//   const { show, font } = mixStyle

//   return {
//     opacity: show ? 1 : 0,
//     ...font,
//     marginLeft: useNumberToPx(config.value.global.titleLeft ?? 8),
//     fontSize: useNumberToPx(font.fontSize),
//     ...setChartColor(font.color),
//   }
// }

const getTbodyTdStyle = (tdata, key) => {
  const event = series.value.find(ser => ser.config.field === key)
  if (!event) return {}
  const forEvent = event?.config?.event
  if (!forEvent) return {}
  for (let ev of forEvent) {
    if (checkOperator(tdata[ev.key1], ev.operator, (ev.static ? ev.value : tdata[ev.key2]))) {
      const sty = {
        ...ev.config,
        ...setChartColor(ev.config.background),
        color: setChartColor(ev.config.color),
        border: `${ev.config.borderWidth}px ${ev.config.borderType}  ${setChartColor(ev.config.borderColor)}`,
      }
      return sty
    }
  }
  return {

  }
}

const getTdStyle = index => {
  const ser = series.value[index]
  if(!ser) return {}
  const { width } = ser.config
  if (!width) return {}
  return {
    width: width.auto ? width.isPercent ? `${width.value}%` : useNumberToPx(width.value) : autoWidth.value,
  }
}
const getTdStyleByItem = key => {
  const ser = series.value.find(ser => ser.config.field === key)
  if(!ser) return {}
  const { width } = ser.config
  if (!width) return {}
  return {
    width: width.auto ? width.isPercent ? `${width.value}%` : useNumberToPx(width.value) : autoWidth.value,
  }
}

const checkType = key => {
  return series.value.find(ser => ser.config.field === key)?.config.type || 'text'
}

const formatDate = (key,value) => {
  const ser = series.value.find(ser => ser.config.field === key)
  return dayjs(value).format(ser.config.date.format)
}

</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div class="table-header" :style="headerStyle">
      <p v-if="config.order.show" class="table-order" :style="{width: `${config.order.width}px`}">
        <span>{{ config.order.name }}</span>
      </p>
      <p v-for="(item,index) in series" :key="index" :style="getTdStyle(index)">
        {{ item.name }}
      </p>
    </div>
    <GlSwiper
      :length="dv_data.length"
      :loop="swiper.loop"
      :row="swiper.row"
      :col="swiper.col"
      :space-between="config.generate.rowWap"
      :autoplay="{
        delay: swiper.autoplay.delay,
        pauseOnMouseEnter: true,
      }"
      :direction="swiper.direction"
      :effect="swiper.effect"
      :slides-per-group="swiper.slidesPerGroup"
      :style="{height: `calc(100% - ${config.header.height}px)`}"
    >
      <template v-for="(tdata, index) in dv_data" :key="index" #[index+1]>
        <div class="tbody-tr" :style="index % 2 ? oddStyle : evenStyle">
          <p v-if="config.order.show" class="table-order" :style="{width: `${config.order.width}px`}">
            <span :style="getOrderStyle()">
              {{ config.order.addZero ? (index + 1 > 9) ? (index + 1) : `0${index + 1}` : index + 1 }}
            </span>
          </p>
          <p v-for="(ser,inde) in series" :key="inde" :style="getTdStyleByItem(ser?.config.field)">
            <n-popover v-if="ser?.config" trigger="hover">
              <template #trigger>
                <GlCountTo
                  v-if="checkType(ser?.config.field) === 'number'"
                  :num="Number.parseFloat(tdata[ser?.config.field])"
                  show-separator
                  :style="getTbodyTdStyle(tdata, ser?.config.field)"
                />
                <span v-else-if="checkType(ser?.config.field) === 'date'" :style="getTbodyTdStyle(tdata, ser?.config.field)">
                  {{ formatDate(ser?.config.field, tdata[ser?.config.field]) }}
                </span>
                <span v-else :style="getTbodyTdStyle(tdata, ser?.config.field)">
                  {{ tdata[ser?.config.field] }}
                </span>
              </template>
              <span>{{ tdata[ser.config.field] }}</span>
            </n-popover>
          </p>
        </div>
      </template>
    </GlSwiper>
  </div>
</template>

<style lang="scss" scoped>
.table-order {
  text-align: center;
  justify-content: center;

  span {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}

.table-header {
  display: flex;
  justify-content: space-between;

  p {
    padding: 0 8px;
  }
}

.tbody-tr {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;

  p {
    padding: 0 8px;
    display: flex;
    overflow: hidden;

    span {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
  }
}
</style>
