<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-03 14:08:54
 * @LastEditTime : 2023-12-06 10:06:23
-->
<script lang="ts" setup name="GChartLabelConfig">
import { PropType } from 'vue'
const props = defineProps({
  config: {
    type: Object as PropType<any>,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
  // 边框和圆角是否分field显示
  split: {
    type: Boolean,
    default: false,
  },
  span: {
    type: Number,
    default: 6,
  },
})

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
    color: string
}`

const code = ref('')
const handChangeCode = val => {
  code.value = val.value
}
const updateCode= val => {
  props.config.formatter.function = val.value
}

onUnmounted(() => {
  props.config.formatter.function = code.value
})

const hAligns = GlHAligns
const vAligns = GlVAligns
const echartsLablePositions = GlEchartsLablePositions
</script>

<template>
  <g-field-collapse
    v-model="config.show"
    label="标签"
    toggle
  >
    <g-field :level="2" label="标签位置">
      <g-select
        v-model="config.position"
        :data="echartsLablePositions"
      />
    </g-field>
    <g-field :level="2" tooltip="文字水平对齐方式" label="水平对齐方式">
      <n-radio-group
        v-model:value="config.align"
        size="small"
      >
        <n-radio-button v-for="pair in hAligns" :key="pair.id" :value="pair.id">
          {{ pair.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" tooltip="文字垂直对齐方式" label="垂直对齐方式">
      <n-radio-group
        v-model:value="config.erticalAlign"
        size="small"
      >
        <n-radio-button v-for="pair in vAligns" :key="pair.id" :value="pair.id">
          {{ pair.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field
      :leavel="2"
      label="标签内容"
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
          <n-button quaternary type="primary">
            查看param参数信息
          </n-button>
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
        <span class="--keyword">function</span> formatter(param) { // 支持返回HTML
      </p>
      <g-monaco-editor
        language="javascript"
        :code="config.formatter.function"
        :height="180"
        editor-class="formatter-editor"
        @change="handChangeCode"
        @blur="updateCode"
      />
      <p class="fake-code --end">}</p>
    </template>
    <g-field
      v-else
      :level="2"
      label="默认内容配置"
      tooltip="{a}：系列名。<br/><br/>{b}：数据名。<br/><br/>{c}：数据值。<br/><br/>
       {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。
        <br/><br/>
{@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。 <br/><br/>  输入 * 换行"
    >
      <g-input v-model="config.formatter.value" placeholder="{b} \n\n {a}人" />
    </g-field>
    <g-field :level="2" label="标签文本">
      <GChartFontConfig allow-inherit :config="config.font" />
      <g-input-number
        v-model="config.distance"
        label="与图形间隔"
        suffix="px"
        inline
      />
      <g-input-number
        v-model="config.rotate"
        :min="-90"
        :max="90"
        tooltip="从 -90 度到 90 度。正值是逆时针"
        label="标签旋转"
        suffix="度"
        inline
      />
      <g-input-number
        v-model="config.offset[0]"
        label="水平偏移"
        suffix="px"
        inline
      />
      <g-input-number
        v-model="config.offset[1]"
        label="垂直偏移"
        suffix="px"
        inline
      />
    </g-field>
  </g-field-collapse>
</template>
