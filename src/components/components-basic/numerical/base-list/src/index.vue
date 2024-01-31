<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-12 18:55:21
 * @LastEditTime : 2024-01-11 20:24:04
-->
<template>
  <div class="datav-wrapper base-list" :style="fmStyle">
    <div v-for="(li, index) in listData" :key="li.x" :style="listStyle">
      <div>
        <div class="squire" :style="{ ...iconStyle, ...getIconStyle(index) }"></div>
        <div :style="{ ...titleStyle, ...getStyle(index) }">{{ li.x }}</div>
      </div>
      <div class="number">
        <div :style="{...processStyle, ...getProgressStyle(index)}">{{ config.process.show ? li.z : "" }}</div>
        <div class="bm-number" :style="{ ...numberStyle, ...getNumStyle(index) }">
          {{ li.y }}
          <div :style="sufStyle">
            {{ config.number.suffix.value }}
          </div>
        </div>
      </div>
      <div v-if="config.global.border.show" class="bm-border" :style="bmBorderStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { getFieldMap, useDataCenter } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { computed, defineComponent, PropType, toRef } from 'vue'
import { BaseList } from './base-list'

export default defineComponent({
  name: 'VBaseList',
  props: {
    com: {
      type: Object as PropType<BaseList>,
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

    const fmStyle = computed(() => {
      const { colums, mrVer } = config.value.generate
      return {
        gridTemplateColumns: new Array(colums).fill('1fr').join(' '),
        gridColumnGap: `${mrVer}px`,
      }
    })

    const getNumStyle = i => {
      const { series, generate } = config.value
      return generate?.numberInColor ? { color: generate.color[i] ?? generate.color[series.length - 1] } : setChartColor(series[i].color2)
    }

    const getProgressStyle = i => {
      const { series, generate } = config.value
      return generate?.progressInColor ? { color: generate.color[i] ?? generate.color[series.length - 1] } : setChartColor(series[i].color3)
    }

    const getStyle = i => {
      const { series, generate } = config.value
      return generate?.titleInColor ? { color: generate.color[i] ?? generate.color[series.length - 1] } : setChartColor(series[i].color)
    }

    const getIconStyle = i => {
      const { generate } = config.value
      const color = generate.color
      return {
        backgroundColor: setChartColor(color[i] ?? color[0]),
      }
    }

    const listStyle = computed(() => {
      const { border } = config.value.global
      const { colums, mrHor, mrVer } = config.value.generate
      const len = Math.ceil(dv_data.value?.length / colums)
      const mrH = mrHor * len
      const h = (attr.value.h - mrH) / len
      return {
        height: `${h}px`,
        margin: `${mrHor}px ${mrVer}px`,
      }
    })

    const bmBorderStyle = computed(() => {
      const { border } = config.value.global
      const { type, height, width } = border

      return {
        width: `${width}%`,
        height: `${height}px`,
        ...setChartColor(border.color) as any,
      }
    })

    const iconStyle = computed(() => {
      const { width, height, border, show } = config.value.icon
      return {
        height: `${height}px`,
        width: `${width}px`,
        border: `${border.width}px ${border.type} ${border.color}`,
        borderRadius:`${border.radius}px`,
        padding: `${border.padding}px`,
        display: show ? 'inline-block' : 'none',
      }
    })

    const titleStyle = computed(() => {
      const { font } = config.value.title
      const { right, show, width } = config.value.icon
      return {
        ...font,
        ...setChartColor(font.color) as any,
        fontSize: `${font.fontSize}px`,
        letterSpacing: `${font.letterSpacing}px`,
        marginLeft: `${show ? right + width : 0}px`,
      }
    })

    const sufStyle = computed(() => {
      const { left, bottom,fontSize, fontWeight } = config.value.number.suffix
      return {
        marginLeft: `${left}px`,
        marginBottom:`${bottom}px`,
        fontSize: `${fontSize}px`,
        fontWeight,
      }
    })

    const numberStyle = computed(() => {
      const { font } = config.value.number
      const { fontSize, letterSpacing } = font
      return {
        ...font,
        ...setChartColor(font.color) as any,
        fontSize: `${fontSize}px`,
        letterSpacing: `${letterSpacing}px`,
      }
    })

    const listData = computed(() => {
      return dv_data.value?.length
        ? dv_data.value.map(d => {
          return {
            x: d[dv_field.value.x],
            y: d[dv_field.value.y],
            z: d[dv_field.value.z],
          }
        })
        : []
    })

    const processStyle = computed(() => {
      const { font } = config.value.process
      const { fontSize, letterSpacing, marginLeft, marginRight } =
        font
      return {
        ...font,
        ...setChartColor(font.color) as any,
        fontSize: `${fontSize}px`,
        letterSpacing: `${letterSpacing}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
      }
    })

    return {
      config,
      listData,
      fmStyle,
      listStyle,
      titleStyle,
      bmBorderStyle,
      numberStyle,
      iconStyle,
      sufStyle,
      getNumStyle,
      getStyle,
      getIconStyle,
      getProgressStyle,
      processStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
.base-list {
  color: #fff;
  font-size: 18px;
  display: grid;
  position: relative;

  .squire {
    position: absolute;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    & > div {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }

  .number {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bm-number {
    display: flex;
    align-items: flex-end;
  }

  .bm-border {
    position: absolute;
    bottom: 0;
  }
}
</style>
