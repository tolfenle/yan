<!-- eslint-disable vue/require-toggle-inside-transition -->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <template v-for="(num, index) in number" :key="`${index}_${num}`">
      <transition name="flip">
        <div
          class="flip-box"
          :style="{
            ...numberStyle,
            ...(config.symbolInBg ? {} : isNaN(Number(num)) ? { backgroundImage: 'none', padding: 0,flex: 0 }
              : '') }"
        >
          <p :style="numberColor" :class="`${config.animate.type} animate__duration-${config.animate.direction}s animate__repeat-${config.animate.repeat}  animate__delay-${config.animate.delay}`">
            <template v-if="(!isNaN(Number.parseInt(num)))">
              <GlCountTo :num="num" />
            </template>
            <template v-else>
              {{ num }}
            </template>
          </p>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { NumberFlip } from './number-flip'

export default defineComponent({
  name: 'VNumberFlip',
  props: {
    com: {
      type: Object as PropType<NumberFlip>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      } as any
    })

    const formatNumberWithCommas = (number: number, num: number): string => {
      const regexPattern = `\\B(?=(\\d{${num}})+(?!\\d))`
      const regex = new RegExp(regexPattern, 'g')
      return `${number}`.replace(regex, config.value.symbol)
    }


    const number = computed(() => {
      return formatNumberWithCommas(dv_data.value[dv_field.value.value], config.value.split)
    })

    const { setUrl } = useEnvUrl()
    const numberStyle = computed(() => {
      const sty: any = {
        ...config.value.font,
        fontSize: `${config.value.font.fontSize}px`,
        padding: config.value.padding?.map(v => `${v}px`).join(' '),
        margin: config.value.margin?.map(v => `${v}px`).join(' '),
        backgroundSize: `${config.value.backgroundSize[0]}% ${config.value.backgroundSize[1]}%`,
        backgroundPosition: `${config.value.backgroundPosition[0]}px, ${config.value.backgroundPosition[1]}px`,
      }
      return sty
    })

    const numberColor = computed(() => {
      return setTextColor(config.value.font?.color) as any
    })

    const backgroungImg = computed(() => {
      return `url(${setUrl(config.value.backgroundImage)})`
    })

    return {
      numberColor,
      wrapperStyle,
      numberStyle,
      number,
      backgroungImg,
      config,
    }
  },
})
</script>

<style lang="scss" scoped>
.datav-wrapper {
  display: flex;

  .flip-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: v-bind('backgroungImg');
    background-repeat: no-repeat;
    flex: 1;
  }
}

/* 翻转动画 */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s;
}

.flip-enter,
.flip-leave-to {
  transform: rotateY(90deg);
}
</style>
