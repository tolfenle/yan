<template>
  <div class="datav-wrapper" :style="titleStyle">
    <template v-if="urlText">
      <a :href="urlText" :target="urlTarget" :style="urlStyle">
        {{ titleText }}
      </a>
    </template>
    <template v-else>
      <span :style="wordStyle">
        {{ titleText }}
      </span>
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import type { CSSProperties } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { MainTitle } from './main-title'

export default defineComponent({
  name: 'VMainTitle',
  props: {
    com: {
      type: Object as PropType<MainTitle>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? {}
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const titleStyle = computed(() => {
      let style = {
        ...setFontConfig(config.value.textStyle),
        ...setDefaultBorder(config.value.backgroundStyle.border),
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        display: 'flex',
        justifyContent: config.value.textAlign,
        alignItems: 'center',
      }

      if (config.value.backgroundStyle.show) {
        style = {
          ...style,
          ...setChartColor(config.value.backgroundStyle.bgColor) as any,
        }
      }

      return style as CSSProperties
    })

    const wordStyle = computed(() => {
      const style = {
        color: config.value.textStyle.color,
        overflow: 'unset',
        'text-overflow': 'unset',
        'white-space': 'unset',
        'background-image': 'none',
        'background-clip': 'unset',
        '-webkit-text-fill-color': 'initial',
      }

      if (config.value.ellipsis) {
        style.overflow = 'hidden'
        style['text-overflow'] = 'ellipsis'
        style['white-space'] = 'nowrap'
      }

      return style as CSSProperties
    })

    const urlStyle = computed(() => {
      const style = {
        display: 'block',
        'text-decoration': 'none',
        color: config.value.textStyle.color,
        overflow: 'unset',
        'text-overflow': 'unset',
        'white-space': 'unset',
        'background-image': 'none',
        'background-clip': 'unset',
        '-webkit-text-fill-color': 'initial',
      }

      if (config.value.ellipsis) {
        style.overflow = 'hidden'
        style['text-overflow'] = 'ellipsis'
        style['white-space'] = 'nowrap'
      }

      return style as CSSProperties
    })

    const titleText = computed(() => {
      return dv_data.value[dv_field.value.title] || config.value.title
    })

    const urlText = computed(() => {
      return dv_data.value[dv_field.value.url] || config.value.urlConfig.url
    })

    const urlTarget = computed(() => config.value.urlConfig.isBlank ? '_blank' : '_self')

    return {
      titleStyle,
      wordStyle,
      urlStyle,
      titleText,
      urlText,
      urlTarget,
    }
  },
})
</script>
