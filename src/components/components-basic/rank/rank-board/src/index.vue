<!--
 * @Author: wfl
 * @LastEditors: fj
 * @description:
 * @updateInfo:
 * @Date: 2022-05-17 14:43:45
 * @LastEditTime: 2023-02-20 13:46:36
-->
<script lang="ts" setup>
import { debounce, observerDomResize } from '@/components/_utils/datav'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  PropType,
  reactive,
  ref,
  toRaw,
  toRef,
  watch,
} from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import RankBoard from './rank-board'

const props = defineProps({
  com: {
    type: Object as PropType<RankBoard>,
    required: true,
    default: () => ({}),
  },
})

useDataCenter(props.com)

const apiStore = useApiStore()
const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? []
})

const config = toRef(props.com, 'config')

const attr = toRef(props.com, 'attr')
let refScroll = ref<any>(null)
const state: {
  debounceInitWHFun: Function | ''
  [s: string]: any
} = reactive({
  width: 0,
  height: 0,
  debounceInitWHFun: '',
  domObserver: '',
  mergedConfig: null,
  rowsData: [],
  rows: [],
  heights: [],
  animationIndex: 0,
  animationHandler: null,
  updater: 0,
  avgHeight: 0,
})

const defConfig = computed(() => {
  return props.com.config.default
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

watch(
  () => [apiStore.dataMap[props.com.id]?.source, props.com.config.default],
  () => {
    if (!state.debounceInitWHFun) autoResizeMixinInit()
    else calcData()
  },
  { deep: true },
)

const wrapperStyle = computed(() => {
  onResize()
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

function afterAutoResizeMixinInit() {
  calcData()
}

function onResize() {
  const { mergedConfig } = state
  if (!mergedConfig) return
  calcHeights(true)
}

async function autoResizeMixinInit() {
  await initWH(false)
  getDebounceInitWHFun()
  bindDomResizeCallback()
  if (typeof afterAutoResizeMixinInit === 'function') afterAutoResizeMixinInit()
}

function initWH(resize = true) {
  return new Promise((resolve: Function) => {
    nextTick(() => {
      const dom: any = refScroll.value
      state.width = dom ? dom.clientWidth : 0
      state.height = dom ? dom.clientHeight : 0

      if (!dom) {
        console.warn('Iking: Failed to get dom node, component rendering may be abnormal!')
      } else if (!state.width || !state.height) {
        console.warn('Iking: Component width or height is 0px, rendering abnormality may occur!')
      }

      if (typeof onResize === 'function' && resize) onResize()
      resolve()
    })
  })
}

function getDebounceInitWHFun() {
  state.debounceInitWHFun = debounce(100, initWH)
}

function bindDomResizeCallback() {
  const { debounceInitWHFun } = state
  state.domObserver = observerDomResize(refScroll.value, debounceInitWHFun)
  window.addEventListener('resize', debounceInitWHFun as any)
}

const calcData = () => {
  mergeConfig()
  calcRowsData()
  calcHeights()
  animation(true)
}

watch(() => props.com.config.numStyle.suffix.show, val => {
  if (!val) {
    state.mergedConfig.unit = ''
  } else {
    state.mergedConfig.unit = defConfig.value.unit
  }
})

function mergeConfig() {
  let opt = {
    ...defConfig.value,
  }
  if (!props.com.config.numStyle.suffix.show) {
    opt.unit = ''
  }
  state.mergedConfig = {
    ...opt,
    data: Array.isArray(dv_data.value)? dv_data.value.map(v => {
      return {
        name: v[dv_field.value.name],
        value: v[dv_field.value.value],
      }
    }) : [],
  }
}

function calcRowsData() {
  let { data, rowNum, sort } = toRaw(state.mergedConfig)
  sort &&
    data.sort((a, b) => {
      const av = a[dv_field.value.value]
      const bv = b[dv_field.value.value]
      if (av > bv) return -1
      if (av < bv) return 1
      if (av === bv) return 0
    })
  const value = data.map(({ value }) => value)
  const min = Math.min(...value) || 0
  // abs of min
  const minAbs = Math.abs(min)
  const max = Math.max(...value) || 0
  // abs of max
  // const maxAbs = Math.abs(max)
  const total = max + minAbs
  data = data.map((row, i) => ({
    ...row,
    ranking: i + 1,
    percent: ((row.value + minAbs) / total) * 100,
  }))
  const rowLength = data.length
  if (rowLength > rowNum && rowLength < 2 * rowNum) {
    data = [...data, ...data]
  }
  data = data.map((d, i) => ({ ...d, scroll: i }))
  state.rowsData = data
  state.rows = data
}
function calcHeights(onresize = false) {
  const { height, mergedConfig } = state
  const { rowNum, data } = mergedConfig
  const avgHeight = height / rowNum
  state.avgHeight = avgHeight
  if (!onresize) state.heights = new Array(data.length).fill(avgHeight)
}

async function animation(start = false) {
  let { avgHeight, animationIndex, mergedConfig, rowsData, updater } = state
  const { waitTime, carousel, rowNum } = mergedConfig
  const rowLength = rowsData.length
  if (rowNum >= rowLength) return
  if (start) {
    await new Promise(resolve => setTimeout(resolve, waitTime))
    if (updater !== state.updater) return
  }
  const animationNum = carousel === 'single' ? 1 : rowNum
  let rows = rowsData.slice(animationIndex)
  rows.push(...rowsData.slice(0, animationIndex))
  state.rows = rows.slice(0, rowNum + 1)
  state.heights = new Array(rowLength).fill(avgHeight)
  await new Promise(resolve => setTimeout(resolve, 300))
  if (updater !== state.updater) return
  state.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
  animationIndex += animationNum
  const back = animationIndex - rowLength
  if (back >= 0) animationIndex = back
  state.animationIndex = animationIndex
  state.animationHandler = setTimeout(animation, waitTime - 300)
}

function stopAnimation() {
  const { animationHandler, updater } = state
  state.updater = (updater + 1) % 999999
  if (!animationHandler) return
  clearTimeout(animationHandler)
}
function unbindDomResizeCallback() {
  let { domObserver, debounceInitWHFun } = state
  if (!domObserver) return
  domObserver.disconnect()
  domObserver.takeRecords()
  domObserver = null

  window.removeEventListener('resize', debounceInitWHFun as any)
}

const prefixStyle = computed(() => {
  return config.value.prefixStyle
})
const textStyle = computed(() => {
  return config.value.textStyle
})
const barStyle = computed(() => {
  return config.value.barStyle
})
const borderStyle = computed(() => {
  return config.value.borderStyle
})
const numStyle = computed(() => {
  return config.value.numStyle
})

const computedInfoName = computed(() => {
  const { fontSize, fontFamily, fontWeight, color, left } = textStyle.value
  return {
    fontSize: useNumberToPx(fontSize),
    fontFamily,
    fontWeight,
    marginLeft: useNumberToPx(left),
    color: setChartColor(color),
  }
})

const computedRankName = computed(() => {
  const { fontSize, fontFamily, fontWeight, color } = prefixStyle.value
  return {
    fontSize: useNumberToPx(fontSize),
    fontFamily,
    fontWeight,
    color: setChartColor(color),
  }
})

const computedRankValue = computed(() => {
  const { fontSize, fontFamily, fontWeight, color } = numStyle.value

  return {
    fontSize: useNumberToPx(fontSize),
    fontFamily,
    fontWeight,
    color: setChartColor(color),
  }
})

const computedInsideColumn = (item => {
  const { height, radius, color } = barStyle.value
  return {
    width: `${item.percent}%`,
    height: useNumberToPx(height),
    borderRadius: useNumberToPx(radius).join(' '),
    ...setChartColor(color),
  }
})

const computedRankColumn = computed(() => {
  const { type, color, width, padding, background, top } =
    borderStyle.value

  return {
    border: `${useNumberToPx(width)} ${type} ${setChartColor(color)}`,
    marginTop: useNumberToPx(top),
    padding: useNumberToPx(padding).join(' '),
    ...setChartColor(background),
  }
})

onBeforeUnmount(() => {
  unbindDomResizeCallback()
  stopAnimation()
})
</script>

<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div ref="refScroll" class="dv-scroll-ranking-board">
      <div
        v-for="(item, i) in state.rows"
        :key="item.toString() + item.scroll"
        class="row-item"
        :style="`height: ${state.heights[i]}px;`"
      >
        <div class="ranking-info">
          <div class="rank" :style="computedRankName">
            {{ prefixStyle.prefix }}{{ item.ranking }}
          </div>
          <div class="info-name" :style="computedInfoName" v-html="item.name"></div>
          <div class="ranking-value" :style="computedRankValue">
            {{
              state.mergedConfig.valueFormatter
                ? state.mergedConfig.valueFormatter(item)
                : item.value + state.mergedConfig.unit
            }}
          </div>
        </div>
        <div class="ranking-column" :style="computedRankColumn">
          <div class="inside-column" :style="computedInsideColumn(item)">
            <div class="shine"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dv-scroll-ranking-board {
  width: 100%;
  height: 100%;
  color: #fff;
  overflow: hidden;
}

.dv-scroll-ranking-board .row-item {
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.dv-scroll-ranking-board .ranking-info {
  display: flex;
  width: 100%;
  font-size: 13px;
  align-items: center;
}

.dv-scroll-ranking-board .ranking-info .rank {
  color: #1370fb;
}

.dv-scroll-ranking-board .ranking-info .info-name {
  flex: 1;
}

.dv-scroll-ranking-board .ranking-column {
  margin-top: 5px;
  background: #50494938;
}

.dv-scroll-ranking-board .ranking-column .inside-column {
  position: relative;
  height: 6px;
  background-color: #1370fb;
  border-radius: 1px;
  overflow: hidden;
}

.dv-scroll-ranking-board .ranking-column .shine {
  position: absolute;
  left: 0%;
  top: 0;
  height: calc(100% - 2px);
  width: 100px;
  transform: translateX(-100%);
  background: radial-gradient(#28f8ff 5%, transparent 80%);
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  80% {
    left: 0%;
    transform: translateX(-100%);
  }

  100% {
    left: 100%;
    transform: translateX(0%);
  }
}
</style>
