<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:07
 * @LastEditTime : 2024-01-26 11:06:44
-->
<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { Numerical1 } from './numerical1'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'VNumerical1',
  components: {
  },
  props: {
    com: {
      type: Object as PropType<Numerical1>,
      required: true,
    },
  },
  setup(props) {
    if (!props.com.config.animation) {
      props.com.config.animation = useNumberAnimation()
    }
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
    watch(() => dv_data.value, (newVal, oldVal) => {
      fixData.value = newVal ? newVal.map((da, index) => {
        return {
          title: da[dv_field.value.title],
          oldCount: oldVal?.[index]?.[dv_field.value.count] || 0,
          count: da[dv_field.value.count],
          suffix: da[dv_field.value.suffix],
          icon: da[dv_field.value.icon],
        }
      }) : []
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      const { gap, width, lineCount } = config.value.generate
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(${lineCount}, ${useNumberToPx(width)})`,
        columnGap: useNumberToPx(gap[0]),
        rowGap: useNumberToPx(gap[1]),
      }
    })

    const option = computed(() => {
      const opts = {
      }
      return opts as any
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

    const getNumericalStyle = index => {
      const { used } = config.value.series?.[index]?.config || {}
      const item = used ? config.value.series?.[index] : { config: config.value }

      const mixStyle = { ...config.value.generate, background: item?.config.background }

      const { lr, vAlign, hAlign, padding, radius, background, width, height } = mixStyle

      return {
        alignItems: hAlign,
        justifyContent: vAlign,
        padding: useNumberToPx(padding).join(' '),
        borderRadius: useNumberToPx(radius).join(' '),
        flexDirection: glLrOpt[lr],
        width: useNumberToPx(width),
        height: useNumberToPx(height),
        ...setChartColor(background) as any,
        backgroundSize: 'cover',
      } as CSSProperties
    }

    const getItemImageStyle = index => {
      const { used } = config.value.series?.[index]?.config || {}
      const item = used ? config.value.series?.[index] : { config: config.value }
      const mixStyle = { ...config.value.icon, ...item.config.icon }
      const { size, background, shadow, padding, radius, url } = mixStyle
      const { lr, iconGap } = config.value.generate
      return {
        padding: useNumberToPx(padding),
        width: useNumberToPx(size[0]),
        height: useNumberToPx(size[1]),
        marginLeft: lr === 'icon-right' ? useNumberToPx(iconGap) : 0,
        marginRight: lr === 'icon-left' ? useNumberToPx(iconGap) : 0,
        marginBottom: lr === 'icon-top' ? useNumberToPx(iconGap) : 0,
        marginTop: lr === 'icon-bottom' ? useNumberToPx(iconGap) : 0,
        boxShadow: `${useNumberToPx(shadow.offset[0])} ${useNumberToPx(shadow.offset[1])} ${useNumberToPx(shadow.blur)} ${shadow.color}`,
        borderRadius: useNumberToPx(radius),
        ...setChartColor(background) as any,
      } as CSSProperties

    }
    const getItemTitleStyle = index => {
      const { used } = config.value.series?.[index]?.config || {}
      const item = used ? config.value.series?.[index] : { config: config.value }
      const mixStyle = { ...config.value.labelFont, ...(item.config?.labelFont || {}) }
      const { fontSize, fontWeight, fontFamily, fontStyle, color } = mixStyle
      const { labelGap, labelTb, hAlign } = config.value.generate
      return {
        marginTop: labelTb === 'label-top' ? 0 : useNumberToPx(labelGap),
        marginBottom: labelTb === 'label-top' ? useNumberToPx(labelGap) : 0,
        fontSize: useNumberToPx(fontSize),
        fontWeight,
        fontFamily,
        fontStyle,
        textAlign: hAlign,
        ...setChartColor(color) as any,
      } as CSSProperties
    }

    const getItemNumStyle = index => {
      const { used } = config.value.series?.[index]?.config || {}
      const item = used ? config.value.series?.[index] : { config: config.value }
      const mixStyle = { ...config.value.numberFont, ...item.config.numberFont }
      const { fontSize, fontWeight, fontFamily, fontStyle, color } = mixStyle
      const { vAlign } = config.value.generate
      return {
        fontSize: useNumberToPx(fontSize),
        fontWeight,
        fontFamily,
        fontStyle,
        alignItems: vAlign,
        ...setChartColor(color) as any,
      } as CSSProperties
    }
    const contentStyle = computed(() => {
      const { labelTb } = config.value.generate
      return {
        flexDirection: glLabelOpt[labelTb],
      } as CSSProperties
    })
    const getItemSuffixStyle = index => {
      const { used } = config.value.series?.[index]?.config || {}
      const item = used ? config.value.series?.[index] : { config: config.value }
      const mixStyle = { ...config.value.suffix, ...item.config.suffix }
      const { fontSize, fontWeight, fontFamily, fontStyle, color } = mixStyle.font

      return {
        fontSize: useNumberToPx(fontSize),
        fontWeight,
        fontFamily,
        fontStyle,
        marginLeft: useNumberToPx(mixStyle.left),
        ...setChartColor(color) as any,
      } as CSSProperties
    }

    const { setUrl } = useEnvUrl()

    const getIconUrl = index => {
      const item = config.value.series?.[index]
      if (item?.config?.icon?.url)
        return setUrl(item.config.icon.url)
      else
        return setUrl('/public/images/logo.png')
    }

    const computSuffix = index => {
      const g_suffix = config.value.suffix
      const { suffix, used } = config.value.series?.[index]?.config || {}
      return used ? suffix.show : g_suffix.show
    }

    return {
      config,
      fixData,
      wrapperStyle,
      option,
      onClick,
      onChange,
      contentStyle,
      getItemImageStyle,
      getItemNumStyle,
      getItemTitleStyle,
      getItemSuffixStyle,
      getNumericalStyle,
      setUrl,
      getIconUrl,
      computSuffix,
    }
  },
})
</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <template v-if="!config.global.scroll.use">
      <template v-for="(item, index) in fixData" :key="index">
        <div class="numerical1-card" :style="getNumericalStyle(index)">
          <div class="icon">
            <img :src="getIconUrl(index)" :style="getItemImageStyle(index)">
          </div>
          <div class="content" :style="contentStyle">
            <p class="title" :style="getItemTitleStyle(index)">
              {{ item.title }}
            </p>
            <div class="count" :style="getItemNumStyle(index)">
              <GlNumberAnimation :animation="config.animation" :item="item" />
              <p v-if="computSuffix(index)" class="suffix" :style="getItemSuffixStyle(index)">{{ item.suffix }}</p>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <GlSwiper
        :length="fixData.length"
        :row="config.generate.rowCount"
        :col="config.generate.lineCount"
        :autoplay="{
          delay: config.global.scroll.autoplay.delay,
          pauseOnMouseEnter: true,
        }"
        :loop="config.global.scroll.loop"
        :space-between="config.global.scroll.spaceBetween"
        :direction="config.global.scroll.direction"
        :effect="config.global.scroll.effect"
      >
        <template v-for="(item, index) in fixData" :key="index" #[index+1]>
          <div class="numerical1-card" :style="getNumericalStyle(index)">
            <div class="icon">
              <img :src="getIconUrl(index)" :style="getItemImageStyle(index)">
            </div>
            <div class="content" :style="contentStyle">
              <p class="title" :style="getItemTitleStyle(index)">
                {{ item.title }}
              </p>
              <div class="count" :style="getItemNumStyle(index)">
                <GlNumberAnimation :animation="config.animation" :item="item" />
                <p v-if="computSuffix(index)" class="suffix" :style="getItemSuffixStyle(index)">{{ item.suffix }}</p>
              </div>
            </div>
          </div>
        </template>
      </GlSwiper>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.numerical1-card {
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;

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
</style>
