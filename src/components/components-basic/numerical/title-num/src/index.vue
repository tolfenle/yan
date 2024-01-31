<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-06-27 10:33:40
 * @LastEditTime: 2022-06-27 19:04:12
-->
<template>
  <div class="datav-wrapper date" :style="wrapperStyle">
    <div
      class="title-num"
      :style="bgStyle"
      @click.stop="onClick"
    >
      <div>
        <span v-if="config.line.show" class="title-line" :style="lineStyle"></span>
        <span class="main-title" :style="titleStyle">{{ title }}</span>
      </div>
      <div>
        <span class="main-num" :style="numStyle">
          <n-number-animation
            :from="config.num.from"
            :to="toValue"
            :active="config.num.active"
            :duration="config.num.duration"
            :precision="config.num.precision"
            :show-separator="config.num.showSeparator"
          />
        </span>
        <span class="suffix" :style="suffixStyle">
          {{ config.suffix.value }}
        </span>
        <i v-if="config.icon.show" :class="`jh ${config.icon.type}`" :style="iconStyle"></i>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { TitleNum } from './title-num'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { getFieldMap, useDataCenter } from '@/components/_mixins/use-data-center'
import { NNumberAnimation } from 'naive-ui'

export default defineComponent({
  name: 'VTitleNum',
  components: {
    NNumberAnimation,
  },
  props: {
    com: {
      type: Object as PropType<TitleNum>,
      required: true,
    },
  },
  setup(props) {
    const eventStore = useEventStore()
    const apiStore = useApiStore()

    useDataCenter(props.com)


    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')


    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const toValue = computed(() => dv_data.value[dv_field.value.y])
    const title = computed(() => dv_data.value[dv_field.value.x])

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const bgStyle = computed(() => {
      const { bg } = config.value
      const { t, r, b, l } = bg.radius
      return {
        ...setChartColor(config.value.bg.color),
        borderRadius: `${t}px ${r}px ${b}px ${l}px`,
      }
    })

    const numStyle = computed(() => {
      const { num } = config.value
      return {
        ...num.font,
        ...setChartColor(num.font.color),
        fontSize: useNumberToPx(num.font.fontSize),
        padding: useNumberToPx(num.font.padding).join(' '),
      }
    })

    const lineStyle = computed(() => {
      const { line } = config.value
      const { color, radius, w, h } = line.style
      return {
        ...setChartColor(color),
        borderRadius: `${radius.t}px ${radius.r}px ${radius.b}px ${radius.l}px`,
        height: `${h}px`,
        width: `${w}px`,
      }
    })

    const titleStyle = computed(() => {
      const { title } = config.value
      const { font } = title
      return {
        marginLeft: useNumberToPx(title.left),
        ...font,
        ...setChartColor(font.color),
        fontSize: useNumberToPx(font.fontSize),
        padding: useNumberToPx(font.padding).join(' '),
      }
    })

    const suffixStyle = computed(() => {
      const { suffix } = config.value
      return {
        marginLeft: useNumberToPx(suffix.left),
        ...suffix.font,
        ...setChartColor(suffix.font.color),
        fontSize: useNumberToPx(suffix.font.fontSize),
        padding: useNumberToPx(suffix.font.padding).join(' '),
      }
    })

    const iconStyle = computed(() => {
      const { icon } = config.value
      return {
        marginLeft: useNumberToPx(icon.left),
        fontSize: useNumberToPx(icon.size),
      }
    })


    const onClick = () => {
      eventStore.handleSubVariablesChange(
        props.com,
        'click',
        {
          ...dv_data.value,
        })
    }

    const onChange = () => {
      eventStore.handleSubVariablesChange(
        props.com,
        'change',
        {
          ...dv_data.value,
        })
    }

    return {
      toValue,
      title,
      config,
      wrapperStyle,
      bgStyle,
      numStyle,
      lineStyle,
      titleStyle,
      suffixStyle,
      iconStyle,
      onClick,
      onChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.title-num {
  color: #fff;
  padding: 8px 4px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  .title-line {
    display: inline-block;
  }

  .main-num {
    display: inline-block;
    // -webkit-background-clip: text;
    // background-clip: text;
  }
}
</style>
