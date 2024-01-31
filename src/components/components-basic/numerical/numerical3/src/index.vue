<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:07
 * @LastEditTime : 2024-01-11 18:30:25
-->
<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import {
  useDataCenter,
  getFieldMap,
} from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { Numerical3, ENumType } from './numerical3'
import { NNumberAnimation } from 'naive-ui'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'VNumerical3',
  components: {
    NNumberAnimation,
  },
  props: {
    com: {
      type: Object as PropType<Numerical3>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    const eventStore = useEventStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const fixData = ref([])
    watch(
      () => dv_data.value,
      (newVal, oldVal) => {
        fixData.value = newVal
          ? newVal.map((da, index) => {
            return {
              title: da[dv_field.value.title],
              oldCount: oldVal?.[index]?.[dv_field.value.count] || 0,
              count: da[dv_field.value.count],
              suffix: da[dv_field.value.suffix],
              percent: da[dv_field.value.percent],
              icon: da[dv_field.value.icon],
            }
          })
          : []
      },
    )

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')
    const series = computed(() => config.value.series)

    const wrapperStyle = computed(() => {
      const { gap, lineCount } = config.value.generate
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, calc(${100 / lineCount}% - ${
          gap[0]
        }px))`,
        columnGap: useNumberToPx(gap[0]),
        rowGap: useNumberToPx(gap[1]),
      }
    })

    const option = computed(() => {
      const opts = {}
      return opts as any
    })

    const onClick = () => {
      eventStore.handleSubVariablesChange(props.com, 'click', {
        ...dv_data.value,
      })
    }

    const onChange = () => {
      eventStore.handleSubVariablesChange(props.com, 'change', {
        ...dv_data.value,
      })
    }

    const { setUrl } = useEnvUrl()

    const isType1 = computed(() => {
      return config.value.generate.type === ENumType.图数值
    })
    const isType2 = computed(() => {
      return config.value.generate.type === ENumType.数值图标图标题
    })
    const isType3 = computed(() => {
      return config.value.generate.type === ENumType.数值图标题
    })

    const type1LabelStyle = computed(() => {
      const { position, align, valign } = config.value.label

      const style: any = {
        top: useNumberToPx(position.top),
      }

      if (isType1.value) {
        style.left = useNumberToPx(position.left)
      } else if (isType2.value) {
        style.display = 'flex'
        style.alignItems = align
        style.flexDirection = 'column'
        style.justifyContent = valign
      }

      return style as CSSProperties
    })

    const type1ImagelStyle = computed(() => {
      const { left, top, size } = config.value.image
      return {
        top: useNumberToPx(top),
        left: useNumberToPx(left),
        width: useNumberToPx(size[0]),
        height: useNumberToPx(size[1]),
      } as CSSProperties
    })

    const getNumberStyle = item => {
      const { event } = config.value
      const number = config.value.label.number
      const sty = {
        ...number,
        ...(setChartColor(number.color) as any),
        fontSize: useNumberToPx(number.fontSize),
      }
      if (!event) return sty
      for (let ev of event) {
        if (
          checkOperator(
            item[ev.key1],
            ev.operator,
            ev.static ? ev.value : item[ev.key2],
          )
        ) {
          const number = ev.config.label.number
          return {
            ...number,
            ...(setChartColor(number.color) as any),
            fontSize: useNumberToPx(number.fontSize),
          }
        }
      }
      return sty
    }

    const getSuffixStyle = item => {
      const { event } = config.value
      const { font, left } = config.value.label.suffix
      const sty = {
        ...font,
        ...(setChartColor(font.color) as any),
        fontSize: useNumberToPx(font.fontSize),
        marginLeft: useNumberToPx(left),
      }
      if (!event) return sty
      for (let ev of event) {
        if (
          checkOperator(
            item[ev.key1],
            ev.operator,
            ev.static ? ev.value : item[ev.key2],
          )
        ) {
          const { font, left } = ev.config.label.suffix
          return {
            ...font,
            ...(setChartColor(font.color) as any),
            fontSize: useNumberToPx(font.fontSize),
            marginLeft: useNumberToPx(left),
          }
        }
      }
      return sty
    }

    const getTitleStyle = item => {
      const { event } = config.value
      const title = config.value.label.font
      const sty = {
        ...title,
        ...(setChartColor(title.color) as any),
        fontSize: useNumberToPx(title.fontSize),
        marginTop: useNumberToPx(config.value.label.number.bottom),
      }
      if (!event) return sty
      for (let ev of event) {
        if (
          checkOperator(
            item[ev.key1],
            ev.operator,
            ev.static ? ev.value : item[ev.key2],
          )
        ) {
          const title = ev.config.label.font
          return {
            ...title,
            ...(setChartColor(title.color) as any),
            fontSize: useNumberToPx(title.fontSize),
            marginTop: useNumberToPx(config.value.label.number.bottom),
          }
        }
      }
      return sty
    }

    const percentStyle = computed(() => {
      const { font, left } = config.value.label.percent
      return {
        ...font,
        ...(setChartColor(font.color) as any),
        fontSize: useNumberToPx(font.fontSize),
        marginLeft: useNumberToPx(left),
      } as CSSProperties
    })

    const refNumber = ref(null)
    onMounted(() => {
      useLoopAnimation(config.value.animation, refNumber.value)
    })

    return {
      config,
      fixData,
      wrapperStyle,
      option,
      onClick,
      onChange,
      setUrl,
      isType1,
      isType2,
      isType3,
      series,
      type1LabelStyle,
      type1ImagelStyle,
      getNumberStyle,
      getSuffixStyle,
      getTitleStyle,
      percentStyle,
    }
  },
})
</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <template v-for="(item, index) in fixData" :key="index">
      <div v-if="isType1" class="numerical1-card type-1">
        <div class="num-label t-position" :style="type1LabelStyle">
          <p :style="getNumberStyle(item)">
            <GlNumberAnimation :animation="config.animation" :item="item" />
            <span :style="getSuffixStyle(item)">{{ item.suffix }}</span>
          </p>
          <p :style="getTitleStyle(item)">{{ item.title }}</p>
        </div>
        <img
          class="t-position"
          :src="setUrl(series[index]?.config?.image.url)"
          :style="type1ImagelStyle"
        >
      </div>
      <div v-else-if="isType2" class="numerical2-card type-2">
        <div class="num-label t-relative" :style="type1LabelStyle">
          <p :style="getNumberStyle(item)">
            <GlNumberAnimation :animation="config.animation" :item="item" />
            <span :style="getSuffixStyle(item)">{{ item.suffix }}</span>
          </p>
          <p v-if="config.label.percent.show" :style="percentStyle">
            {{ config.label.percent.title }}
            <i
              :class="`ik-118-datav ik-118-datav-${
                series[index]?.config?.label?.percent?.icon?.url ||
                config.label.percent.icon.url
              }`"
            ></i>
          </p>
        </div>
        <img
          :src="setUrl(series[index]?.config?.image.url)"
          :style="type1ImagelStyle"
        >
        <p :style="getTitleStyle(item)">{{ item.title }}</p>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.t-position {
  position: absolute;
}

.t-relative {
  position: relative;
}

.numerical1-card {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;

  .icon {
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .count {
      display: flex;
      align-items: baseline;
    }
  }
}

.numerical2-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
