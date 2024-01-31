<script lang="ts" name="ChartTooltipConfig" setup>
import { PropType } from 'vue'
import { tooltipConfig } from './config'
const props = defineProps({
  config: {
    type: Object as PropType< typeof tooltipConfig >,
    default: () => { },
  },
})

const tooltipTriggers = GlTooltipTrigger
const triggerOns = GlTriggerOn

const descriptionCode = `{
    componentType: 'series',
    // 系列类型
    seriesType: string,
    // 系列在传入的 option.series 中的 index
    seriesIndex: number,
    // 系列名称
    seriesName: string,
    // 数据名，类目名
    name: string,
    // 数据在传入的 data 数组中的 index
    dataIndex: number,
    // 传入的原始数据项
    data: Object,
    // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
    value: number|Array|Object,
    // 坐标轴 encode 映射信息，
    // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
    // value 必然为数组，不会为 null/undefined，表示 dimension index 。
    // 其内容如：
    // {
    //     x: [2] // dimension index 为 2 的数据映射到 x 轴
    //     y: [0] // dimension index 为 0 的数据映射到 y 轴
    // }
    encode: Object,
    // 维度名列表
    dimensionNames: Array<String>,
    // 数据的维度 index，如 0 或 1 或 2 ...
    // 仅在雷达图中使用。
    dimensionIndex: number,
    // 数据图形的颜色
    color: string,
    // 饼图/漏斗图的百分比
    percent: number,
    // 旭日图中当前节点的祖先节点（包括自身）
    treePathInfo: Array,
    // 树图/矩形树图中当前节点的祖先节点（包括自身）
    treeAncestors: Array
}`

const formatterCode = ref(props.config.formatter.function)
const handChangeCode = (code: string) => {
  formatterCode.value = code
}
</script>

<template>
  <g-field-collapse
    v-model="config.show"
    label="显示提示框"
    toggle
    auto-open
  >
    <g-field-collapse
      label="显示内容"
      auto-open
    >
      <g-field
        :leavel="2"
        label="内容选择"
        tooltip="使用自定义函数时，可通过console.log(param)查看param参数具体内容"
      >
        <n-radio-group v-model:value="config.formatter.type" size="small">
          <n-radio-button value="text">默认内容</n-radio-button>
          <n-radio-button value="function">自定义函数</n-radio-button>
        </n-radio-group>
      </g-field>
      <template v-if="config.formatter.type === 'function'">
        <n-popover trigger="click" placement="left" width="800">
          <template #trigger>
            <n-button quaternary type="primary">查看param参数信息</n-button>
          </template>
          <g-monaco-editor
            language="javascript"
            :code="descriptionCode"
            :height="600"
            readonly
            editor-class="formatter-editor"
          />
        </n-popover>
        <p title="function formatter(data) {" class="fake-code --start">
          <span class="--keyword">function</span> formatter(param) {
        </p>
        <g-monaco-editor
          language="javascript"
          :code="config.formatter.function"
          :height="180"
          editor-class="formatter-editor"
          @change="handChangeCode"
        />
        <p class="fake-code --end">}</p>
      </template>

      <!-- <template v-if="config.formatter.type === 'text'">
        <g-field-collapse v-model="config.formatter.textOption.a.show" toggle label="系列名称">
          <g-field
            :leavel="2"
            :label-span="6"
            label="独占一行"
          >
            <g-switch v-model="config.formatter.textOption.a.oneLine" />
          </g-field>
          <g-field
            :leavel="2"
            label="文本"
            :label-span="6"
          >
            <GChartFontConfig :font="config.formatter.textOption.a.style" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse v-model="config.formatter.textOption.b.show" toggle label="类目值">
          <g-field
            :leavel="2"
            label="独占一行"
            :label-span="6"
          >
            <g-switch v-model="config.formatter.textOption.b.oneLine" />
          </g-field>
          <g-field
            :leavel="2"
            label="文本"
            :label-span="6"
          >
            <GChartFontConfig :font="config.formatter.textOption.b.style" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse v-model="config.formatter.textOption.c.show" toggle label="数值">
          <g-field
            :leavel="2"
            label="独占一行"
            :label-span="6"
          >
            <g-switch v-model="config.formatter.textOption.c.oneLine" />
          </g-field>
          <g-field
            :leavel="2"
            label="后缀"
            :label-span="6"
          >
            <g-input v-model="config.formatter.textOption.c.suffix" />
          </g-field>
          <g-field
            :leavel="2"
            label="文本"
            :label-span="6"
          >
            <GChartFontConfig :font="config.formatter.textOption.c.style" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse v-model="config.formatter.textOption.d.show" toggle label="百分比">
          <g-field
            :leavel="2"
            label="独占一行"
            :label-span="6"
          >
            <g-switch v-model="config.formatter.textOption.d.oneLine" />
          </g-field>
          <g-field
            :leavel="2"
            label="后缀"
            :label-span="6"
          >
            <g-input v-model="config.formatter.textOption.d.suffix" />
          </g-field>
          <g-field
            :leavel="2"
            label="文本"
            :label-span="6"
          >
            <GChartFontConfig :font="config.formatter.textOption.d.style" />
          </g-field>
        </g-field-collapse>
      </template> -->
    </g-field-collapse>

    <g-field
      :leavel="2"
      label="文本样式"
    >
      <GChartFontConfig :config="config.textStyle" />
    </g-field>

    <g-field
      :leavel="2"
      label="永远显示"
      tooltip="默认情况下在移出可触发提示框区域后 一定时间 后隐藏，设置为 true 可以保证一直显示提示框内容"
    >
      <g-switch v-model="config.alwaysShowContent" />
    </g-field>
    <g-field
      :leavel="2"
      tooltip="数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用;
              坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用"
      label="触发类型"
    >
      <n-radio-group v-model:value="config.trigger" size="small">
        <n-radio-button
          v-for="em in tooltipTriggers"
          :key="em.id"
          :value="em.id"
        >
          {{ em.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field
      :leavel="2"
      label="触发方式"
    >
      <g-select v-model="config.triggerOn" :data="triggerOns" />
    </g-field>
    <g-field
      :leavel="2"
      label="背景颜色"
    >
      <g-color-picker v-model="config.backgroundColor" />
    </g-field>
    <g-field
      :leavel="2"
      label="边框"
    >
      <g-input-number
        v-model="config.borderWidth"
        :min="0"
        :max="999"
        :step="1"
        suffix="px"
        label="边框宽度"
        inline
      />
      <g-color-picker v-model="config.borderColor" inline label="边框颜色" />
    </g-field>
    <g-field
      :leavel="2"
      label="内边距"
    >
      <g-input-number
        v-model="config.padding[0]"
        :min="0"
        :max="999"
        :step="1"
        suffix="px"
        label="上边距"
        inline
      />
      <g-input-number
        v-model="config.padding[2]"
        :min="0"
        :max="999"
        :step="1"
        suffix="px"
        label="下边距"
        inline
      />
      <g-input-number
        v-model="config.padding[3]"
        :min="0"
        :max="999"
        :step="1"
        suffix="px"
        label="左边距"
        inline
      />
      <g-input-number
        v-model="config.padding[1]"
        :min="0"
        :max="999"
        :step="1"
        suffix="px"
        label="右边距"
        inline
      />
    </g-field>
    <g-field
      :leavel="2"
      label="位置偏移"
    >
      <g-input-number
        v-model="config.position[0]"
        :min="-999"
        :max="999"
        :step="1"
        suffix="px"
        label="水平偏移"
        inline
      />
      <g-input-number
        v-model="config.position[1]"
        :min="-999"
        :max="999"
        :step="1"
        suffix="px"
        label="垂直偏移"
        inline
      />
    </g-field>
    <g-field
      :leavel="2"
      label="显示限制"
      tooltip="框限制在图表的区域内；可以防止提示框被截断"
    >
      <g-switch
        v-model="config.confine"
        label="限制在图表区域内"
      />
      <g-switch v-model="config.appendToBody" label="挂载在Body上" />
    </g-field>
  </g-field-collapse>
</template>
