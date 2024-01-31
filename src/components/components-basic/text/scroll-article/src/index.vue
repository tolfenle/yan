<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:43:06
 * @LastEditTime : 2024-01-08 10:06:40
-->
<script setup lang="ts" name="ScrollTableProp">
import { CSSProperties, PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { ScrollArticle } from './scroll-article'
import { dayjs } from 'iking-utils'
const props = defineProps({
  com: {
    type: Object as PropType<ScrollArticle>,
    required: true,
  },
})

const { setUrl } = useEnvUrl()

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


const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const datePosition = computed(() => config.value.date.position)
const isDate = computed(() => config.value.date.show)
const isPoint = computed(() => config.value.point.show)
const isImage = computed(() => config.value.point.image.show)
const isSubTitle = computed(() => config.value.subTitle.show)

// const getOrderStyle = () => {
//   const { width, height, fontSize, color } = config.value.order
//   return {
//     ...config.value.order,
//     width: useNumberToPx(width),
//     height: useNumberToPx(height),
//     fontSize: useNumberToPx(fontSize),
//     color: setChartColor(color),
//   }
// }

const formatDate = value => {
  return dayjs(value).format(config.value.date.format)
}

const articleList = computed(() => {
  const { title, subTitle, link, date, img } = dv_field.value
  return dv_data.value
    ? dv_data.value.map(dv => {
      return {
        title: dv[title],
        subTitle: dv[subTitle],
        link: dv[link],
        date: dv[date],
        img: setUrl(dv[img]),
      }
    })
    : []
})

const containerStyle = computed(() => {
  const { rowMargin, background, padding, justifyContent, alignItems } = config.value.global
  return {
    marginBottom: `${rowMargin}px`,
    ...setChartColor(background),
    padding: useNumberToPx(padding),
    justifyContent,
    alignItems,
    display: 'flex',
  } as CSSProperties
})

const pointStyle = computed(() => {
  const { height, width, radius, position,background } = config.value.point

  let obj = {}
  if (position === 'middle') {
    obj = {
      top: '50%',
      transform: 'translateY(-50%)',
    }
  } else if (position === 'bottom') {
    obj = {
      top: 'auto',
      bottom: 0,
    }
  }

  return {
    height: `${height}px`,
    width: `${width}px`,
    borderRadius: `${radius}px`,
    ...obj,
    ...setChartColor(background),
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center'
  } as CSSProperties
})

const imageStyle = computed(() => {
  const { height, width, radius } = config.value.point.image
  const { position } = config.value.point
  let obj = {}
  if (position === 'middle') {
    obj = {
      top: '50%',
      transform: 'translateY(-50%)',
    }
  } else if (position === 'bottom') {
    obj = {
      top: 'auto',
      bottom: 0,
    }
  }

  return {
    height: isPoint.value ? height > config.value.point.height ? '100%' : `${height}px` : `${height}px`,
    width: isPoint.value ? width > config.value.point.width ? '100%' : `${width}px` : `${width}px`,
    borderRadius: `${radius}px`,
    ...obj,
  } as CSSProperties
})

const titleStyle = computed(() => {
  const { right } = config.value.global
  return {
    marginLeft: `${right}px`,
  }
})

const setTextStyle = (margin, title) => {
  const {
    overRow,
    fontFamily,
    color,
    fontWeight,
    fontSize,
    fontStyle,
    letterSpacing,
    textShadowColor,
    textShadowOffsetX,
    textShadowOffsetY,
    textShadowBlur,
  } = title

  return {
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    fontSize: useNumberToPx(fontSize),
    marginBottom: useNumberToPx(margin),
    textShadow: `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    'word-break': 'break-all',
    display: '-webkit-box',
    /*控制在3行*/
    '-webkit-line-clamp': overRow,
    '-webkit-box-orient': 'vertical',
    ...setChartColor(color),
  } as CSSProperties
}


const mainTitleStyle = computed(() => {
  const { subMargin } = config.value.global
  return setTextStyle(subMargin, config.value.title.font)
})

const subTitleStyle = computed(() => {
  const { position } = config.value.date
  const { timeMargin } = config.value.global
  return setTextStyle(position === 'bottom' ? timeMargin : 0, config.value.subTitle.font)
})

const dateStyle = computed(() => {
  const { timeMargin } = config.value.global
  const { position } = config.value.date
  return {
    ...setTextStyle(timeMargin, config.value.date.font),
    marginBottom: 0,
    marginLeft: position === 'middle' ? `${timeMargin}px` : 0,
  }
})

const onClick = (params: any) => {
  eventStore.handleSubVariablesChange(
    props.com,
    'click',
    {
      ...params,
    })
}
</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <GlSwiper
      :length="articleList.length"
      :loop="swiper.loop"
      :row="swiper.row"
      :col="swiper.col"
      :space-between="config.global.rowMargin"
      :autoplay="{
        delay: swiper.autoplay.delay,
        pauseOnMouseEnter: true,
      }"
      :direction="swiper.direction"
      :effect="swiper.effect"
      :slides-per-group="swiper.slidesPerGroup"
    >
      <template v-for="(article, index) in articleList" :key="index" #[index+1]>
        <div
          :style="containerStyle"
          class="article-item"
          @click.stop="onClick(article)"
        >
          <div v-if="isPoint" class="point" :style="pointStyle">
            <img
              v-if="isImage"
              :src="article.img"
              :style="imageStyle"
            >
          </div>
          <img
            v-else-if="isImage"
            class="point"
            :src="article.img"
            :style="imageStyle"
          >
          <div class="title" :style="titleStyle">
            <div v-if="datePosition === 'top' && isDate" class="date" :style="dateStyle">
              {{ formatDate(article.date) }}
            </div>
            <div class="main-title" :title="article.title" :style="mainTitleStyle">
              {{ article.title }}
            </div>
            <div class="data-center" :style="{justifyContent: config.subTitle.justifyContent}">
              <div
                v-if="isSubTitle"
                class="sub-title"
                :title="article.subTitle"
                :style="subTitleStyle"
              >
                {{ article.subTitle }}
              </div>
              <div
                v-if="datePosition === 'middle' && isDate"
                class="date"
                :style="dateStyle"
              >
                {{ formatDate(article.date) }}
              </div>
            </div>
            <div v-if="datePosition === 'bottom' && isDate" class="date" :style="dateStyle">
              {{ formatDate(article.date) }}
            </div>
          </div>
        </div>
      </template>
    </glswiper>
  </div>
</template>

<style lang="scss" scoped>
.article-item {
  display: flex;
  position: relative;
  flex: 1;
  align-items: center;

  .point {
  }

  .data-center {
    display: flex;
  }
}

.scroll-article-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>

