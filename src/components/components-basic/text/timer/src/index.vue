<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2024-01-11 10:47:39
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <i v-if="config.iconStyle.show" :class="`ik-118-datav ik-118-datav-${config.iconStyle.url}`" :style="iconStyle"></i>
    <span :style="timerStyle">
      {{ realDateTime }}
      <span :style="weekStyle" v-if="config.time?.week?.show">
        {{ config.time?.week?.suffix }}{{ realWeek }}
      </span>
    </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef, ref, shallowRef, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'
import dayjs from 'dayjs'
import { Timer } from './timer'

export default defineComponent({
  name: 'VTimer',
  props: {
    com: {
      type: Object as PropType<Timer>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      const { textStyle, horizontal, vertical } = config.value.time
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        'font-size': `${textStyle.fontSize}px`,
        'font-family': textStyle.fontFamily,
        'font-weight': textStyle.fontWeight,
        display: 'flex',
        'justify-content': horizontal,
        'align-items': vertical,
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
      } as CSSProperties
    })

    const timerStyle = computed(() => {
      const { textStyle } = config.value.time
      const color = setChartColor(textStyle.color)
      const _color = typeof color === 'string' ? { color } : color
      return {
        ...(_color) as any,
      }
    })

    const weekStyle = computed(() => {
      const { week } = config.value.time
      return {
        marginLeft: useNumberToPx(week?.marginLeft || 0),
      }
    })

    const iconStyle = computed(() => {
      const { time, iconStyle } = config.value
      const size = time.textStyle.fontSize * iconStyle.size
      const color = setChartColor(iconStyle.color)
      const _color = typeof color === 'string' ? { color } : color
      return {
        display: 'block',
        fontSize: `${size}px`,
        marginRight: `${iconStyle.marginRight}px`,
        ..._color as any,
      }
    })

    const WeekMap = ['日', '一', '二', '三', '四', '五', '六']

    const realWeek = computed(() => {
      return WeekMap[new Date().getDay()]
    })

    const dateTime = shallowRef(dayjs())
    const timerId = ref(0)

    const realDateTime = computed(() => {
      return dayjs(dateTime.value).format(config.value.time.format)
    })

    const updateDateTime = () => {
      let duration = config.value.time.duration || 100
      dateTime.value = dayjs(dateTime.value).add(duration, 'ms')
      timerId.value = window.setTimeout(() => {
        updateDateTime()
      }, duration)
    }

    updateDateTime()

    onUnmounted(() => {
      clearTimeout(timerId.value)
    })

    return {
      config,
      wrapperStyle,
      iconStyle,
      realDateTime,
      timerStyle,
      realWeek,
      weekStyle,
    }
  },
})
</script>
