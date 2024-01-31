<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<!--
 * @Author: wfl
 * @LastEditors: fj
 * @description:
 * @updateInfo:
 * @Date: 2022-06-23 11:18:27
 * @LastEditTime: 2023-02-21 14:57:51
-->
<template>
  <div class="datav-wrapper btn-group" :style="wrapperStyle">
    <div :style="outerStyle">
      <div
        v-for="btn in btnList"
        :key="btn.x"
        :style="setBtnStyle(btn)"
        @click="clickBtn(btn)"
        @dblclick="dblClick(btn)"
        @mouseover="hoverIndex = !showHover ? -1 : btn.y"
        @mouseleave="hoverIndex = -1"
      >
        {{ btn.x }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getFieldMap, useDataCenter } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, PropType, ref, toRef } from 'vue'
import { BtnGroup } from './btn-group'
import { useEventStore } from '@/store/event'

export default defineComponent({
  name: 'VBtnGroup',
  props: {
    com: {
      type: Object as PropType<BtnGroup>,
      required: true,
    },
  },
  setup(props) {
    const eventStore = useEventStore()
    const { setUrl } = useEnvUrl()

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')
    const apiStore = useApiStore()
    const isEnter = ref(false)
    const activeIndex = ref(-1)
    const hoverIndex = ref(-1)

    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    watch(() => dv_data.value, btns => {
      activeIndex.value = btns?.find(btn => btn[dv_field.value.s])?.[dv_field.value.y]
    })

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const showActive = computed(() => config.value.active.show)
    const showHover = computed(() => config.value.hover.show)

    const outerStyle = computed(() => {
      const { radius } = config.value.global
      return {
        borderRadius: `${radius.t}px ${radius.r}px ${radius.b}px ${radius.z}px `,
      }
    })

    const btnList = computed(() => {
      if (!Array.isArray(dv_data.value)) return []
      // TODO
      // if (!showActive.value)
      //   activeIndex.value = -1
      // else
      //   activeIndex.value = dv_data.value.find(v => v[dv_field.value.s])?.[dv_field.value.y] || -1
      return dv_data.value?.length
        ? dv_data.value.map(v => {
          return {
            x: v[dv_field.value.x],
            y: v[dv_field.value.y],
            ...v,
          }
        })
        : []
    })

    const setStyle = style => {
      const { margin, global, padding } = config.value
      let obj = global.shadow

      const styled = {
        padding: `${padding.t}px ${padding.r}px ${padding.b}px ${padding.z}px`,
        margin: `${margin.t}px ${margin.r}px ${margin.b}px ${margin.z}px`,
        color: setChartColor(style.color),
        backgroundColor: setChartColor(style.backgroundColor),
        backgroundImage: `url('${setUrl(style.image)}')`,
        border: `${global.borderWidth}px ${global.borderType} ${style.borderColor}`,
        backgroundSize: style.backgroundSize,
        fontSize: `${global.fontSize}px`,
        fontWeight: global.fontWeight,
        fontFamily: global.fontFamily,
        letterSpacing: `${global.letterSpacing}px`,
        width: `${global.width}px`,
        transform: `rotate(${global.roate}deg)`,
        borderRadius: `${global.btn.t}px ${global.btn.r}px ${global.btn.b}px ${global.btn.z}px `,
        ...obj,
      }
      return styled
    }

    const setBtnStyle = (btn): CSSProperties => {
      const sel = btn[dv_field.value.y]
      const { defaul, hover, active } = config.value
      return sel === activeIndex.value
        ? setStyle(active) as CSSProperties
        : sel === hoverIndex.value
          ? setStyle(hover) as CSSProperties
          : setStyle(defaul) as CSSProperties
    }

    const clickBtn = btn => {
      activeIndex.value = !showActive.value ? -1 : btn[dv_field.value.y]
      eventStore.handleSubVariablesChange(
        props.com,
        'click',
        {
          ...btn,
          x: btn[dv_field.value.x],
          y: btn[dv_field.value.y],
        })
    }

    const dblClick = btn => {
      activeIndex.value = !showActive.value ? -1 : btn[dv_field.value.y]
      eventStore.handleSubVariablesChange(
        props.com,
        'dbclick',
        {
          ...btn,
          x: btn[dv_field.value.x],
          y: btn[dv_field.value.y],
        })
    }

    const imgStyle = computed(() => {
      return {}
    })

    const imgSrc = computed(() => {
      return {}
    })

    return {
      setBtnStyle,
      clickBtn,
      dblClick,
      showHover,
      dv_field,
      outerStyle,
      hoverIndex,
      activeIndex,
      wrapperStyle,
      imgStyle,
      imgSrc,
      isEnter,
      btnList,
    }
  },
})
</script>

<style lang="scss" scoped>
.datav-wrapper.btn-group div {
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
}
</style>
