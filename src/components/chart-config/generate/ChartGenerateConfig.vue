<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-19 10:09:44
 * @LastEditTime : 2024-02-07 09:41:03
-->
<script lang="ts" name="chartGenerateConfig" setup>
import { PropType } from 'vue'
import { TGenerateConfig } from './config'
import { _, ikTree } from 'iking-utils'

const props = defineProps({
  config: {
    type: Object as PropType<{ generate: TGenerateConfig & { sameColor: boolean; };[key: string]: any; }>,
    default: () => { },
  },
  coms: {
    type: Object,
    default: () => null,
  },
  chartType: {
    type: String,
    default: 'bar',
  },
})

const isBar = computed(() => props.chartType === 'bar')
const isLine = computed(() => props.chartType === 'line')
const isPie = computed(() => props.chartType === 'pie')
const isChart = computed(() => isBar.value || isLine.value || isPie.value)

// 框选中包含组合时，只获取组合中的组件
const layerComs = computed(() => {
  if (props.coms) {
    const layerChildren = ikTree.treeToList(props.coms)
    return layerChildren.filter(com => com.type !== ComType.layer)
  }
  return null
})

const generateConfig = layerComs.value ? ref(_.cloneDeep(layerComs.value[0].config)) : toRef(props.config)

const fontFamilys = GlFontFamilys
const fontStyles = GlFontStyles
const fontWeights = GlFontWeights
const chartGenerateInfo = GlChartInfos

const updateFontSize = (obj: any, isAdd: boolean) => {
  // 遍历对象的每个属性
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      // 如果当前属性是对象，则递归调用函数
      updateFontSize(obj[key], isAdd)
    } else if (key === 'fontSize') {
      // 如果当前属性是'fontSize'，则修改其值
      obj[key] = isAdd ? obj[key] + 1 : obj[key] - 1
    }
  }
}

const handSmaller = () => {
  if (props.coms) {
    props.coms.forEach(com => {
      updateFontSize(com.config, false)
    })
  }
  else {
    updateFontSize(props.config, false)
  }
}

const handBigger = () => {
  if (props.coms) {
    props.coms.forEach(com => {
      updateFontSize(com.config, true)
    })
  }else
    updateFontSize(props.config, true)
}

const handChangeType = (value: any) => {
  if (props.coms) {
    props.coms.forEach(com => {
      com.config.label.show = value.target.value === 'detail'
      if (value.target.value === 'simple') {
        com.config.xAxis.show = false
        com.config.yAxis.show = false
      } else {
        com.config.xAxis.show = true
        com.config.yAxis.show = true
      }
    })
  } else {
    const detail =  value.target.value === 'detail'
    props.config.bar.label.show = detail
    props.config.bar.labelLine.show = detail
    if (value.target.value === 'simple') {
      props.config.xAxis.show = false
      props.config.yAxis.show = false
    } else {
      props.config.xAxis.show = true
      props.config.yAxis.show = true
    }
  }
}

watch(() => generateConfig.value?.generate, val => {
  if (!layerComs.value) return
  if (val) {
    layerComs.value.forEach(com => {
      // 通用样式单独配置，防止相互污染
      com.config.generate = {
        ...com.config.generate,
        color: val.color,
        lineStyle: _.cloneDeep(val.lineStyle),
        radius: val?.radius || [],
        textStyle: {
          ...val.textStyle,
        },
      }
    })
  }
}, { deep: true })

const checkGenerateKey = (key: string) => {
  return generateConfig.value?.generate?.hasOwnProperty(key)
}

const labelSpan = 6
</script>

<template>
  <div v-if="generateConfig.generate" style="padding-top: 8px;">
    <g-field
      v-if="checkGenerateKey('color')"
      :level="2"
      :label-span="labelSpan"
      label="主题颜色"
    >
      <g-select-theme v-model="generateConfig.generate.color" />
    </g-field>
    <slot></slot>

    <template v-if="isBar">
      <g-field :level="2" :label-span="labelSpan" label="条形/柱状图">
        <n-switch v-model:value="generateConfig.generate.changeXY" />
      </g-field>
    </template>
    <template v-if="isLine">
      <g-field :level="2" :label-span="labelSpan" label="折线">
        <g-switch v-model="generateConfig.generate.smooth" inline label="显示为平滑曲线" />
        <g-switch v-model="generateConfig.generate.connectNulls" inline label="连接空值" />
        <g-switch v-model="generateConfig.generate.step" inline label="显示为阶梯图" />
      </g-field>
    </template>
    <template v-if="isPie">
      <g-field :level="2" :label-span="labelSpan" label="圆心位置">
        <g-input-number
          v-model="generateConfig.generate.center.value[0]"
          label="水平位置"
          inline
          :suffix="generateConfig.generate.center.isPersent ? '%' : 'px'"
        />
        <g-input-number
          v-model="generateConfig.generate.center.value[1]"
          label="垂直位置"
          inline
          :suffix="generateConfig.generate.center.isPersent ? '%' : 'px'"
        />
        <g-switch v-model="generateConfig.generate.center.isPersent" label="百分比模式" />
      </g-field>

      <g-field
        v-if="checkGenerateKey('isCircle')"
        :level="2"
        :label-span="labelSpan"
        label="圆环/饼图"
      >
        <g-switch v-model="generateConfig.generate.isCircle" />
      </g-field>
      <g-field :level="2" :label-span="labelSpan" label="半径">
        <g-input-number
          v-model="generateConfig.generate.radius[0]"
          label="内园半径"
          inline
          suffix="%"
        />
        <g-input-number
          v-model="generateConfig.generate.radius[1]"
          label="外圆半径"
          inline
          suffix="%"
        />
      </g-field>
    </template>
    <g-field
      v-if="checkGenerateKey('info')"
      :level="2"
      :label-span="labelSpan"
      label="信息"
    >
      <n-radio-group v-model:value="generateConfig.generate.info.type" size="small" @change="handChangeType">
        <n-radio-button v-for="pair in chartGenerateInfo" :key="pair.id" :value="pair.id">
          {{ pair.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field
      v-if="checkGenerateKey('textStyle')"
      :level="2"
      :label-span="labelSpan"
      label="文本属性"
    >
      <g-select
        v-model="generateConfig.generate.textStyle.fontFamily"
        label="文本字体"
        :data="fontFamilys"
        inline
      />
      <g-select
        v-model="generateConfig.generate.textStyle.fontStyle"
        label="文本样式"
        :data="fontStyles"
        inline
      />
      <g-select
        v-model="generateConfig.generate.textStyle.fontWeight"
        label="文本粗细"
        :data="fontWeights"
        inline
      />
      <g-color-picker v-model="generateConfig.generate.textStyle.color" inline label="文本颜色" />
      <g-color-picker
        v-if="checkGenerateKey('lineStyle') && generateConfig.generate.lineStyle?.color"
        v-model="generateConfig.generate.lineStyle.color"
        inline
        :label="isChart ? '轴线颜色' : '边框颜色'"
      />
    </g-field>
    <g-field :level="2" :label-span="labelSpan" label="字体大小">
      <n-radio-group size="small">
        <n-radio-button @click="handSmaller">更小</n-radio-button>
        <n-radio-button @click="handBigger">更大</n-radio-button>
      </n-radio-group>
    </g-field>
  </div>
</template>

<style lang="scss">
.vc-color-wrap {
  width: 100% !important;
  margin-right: 0 !important;
}
</style>
