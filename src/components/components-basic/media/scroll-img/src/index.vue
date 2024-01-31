<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-29 17:43:06
 * @LastEditTime : 2023-12-27 18:44:26
-->
<script setup lang="ts" name="ScrollTableProp">
import { CSSProperties, PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { ScrollImg } from './scroll-img'
const props = defineProps({
  com: {
    type: Object as PropType<ScrollImg>,
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

const containerStyle = computed(() => {
  return {
    backgroundSize: config.value.image.fit,
    width: '100%',
    height: '100%',
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
      :length="dv_data.length"
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
      <template v-for="(item, index) in dv_data" :key="index" #[index+1]>
        <div
          :style="{
            ...containerStyle,
            backgroundImage: `url(${setUrl(item[dv_field.y])})`,
          }"
          @click.stop="onClick(item)"
        >
        </div>
      </template>
    </glswiper>
  </div>
</template>
