
<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-02 15:24:37
 * @LastEditTime : 2023-11-16 17:47:18
-->
<script lang="ts" name="ChartBarConfig" setup>
import { PropType } from 'vue'
import { useChartBarConfig } from './config'
import { _ } from 'iking-utils'
const TYPE_BAR = useChartBarConfig()

const props = defineProps({
  config: {
    type: Object as PropType<typeof TYPE_BAR & { customTheme?: boolean; } >,
    default: () => { },
  },
})

const lineStyles = GlLineStyles
const hAligns = GlHAligns
const vAligns = GlVAligns
const echartsLablePositions = GlEchartsLablePositions

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
  props.config.label.formatter.function = val.value
}

onUnmounted(() => {
  props.config.label.formatter.function = code.value
})

const isCustom = computed(() => props.config.hasOwnProperty('customTheme'))
</script>

<template>
  <g-field-collapse label="默认样式">
    <g-field v-if="isCustom" :leavel="2" label="应用系列样式">
      <g-switch v-model="config.customTheme" />
    </g-field>
    <g-field-collapse
      label="柱体样式"
    >
      <g-field :leavel="2" label="图形透明度">
        <g-input-number
          v-model="config.itemStyle.opacity"
          suffix="px"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </g-field>
      <g-field :leavel="2" label="自适应颜色">
        <g-switch v-model="config.itemStyle.color.auto" />
      </g-field>
      <g-field v-if="!config.itemStyle.color.auto" :leavel="2" label="选择颜色">
        <g-color-picker v-model="config.itemStyle.color.value" allow-img />
      </g-field>
      <GBorderConfig label="图形" split :config="config.itemStyle" />
    </g-field-collapse>
    <g-field-collapse
      v-model="config.showBackground"
      label="显示背景"
      toggle
    >
      <g-field :level="2" label="背景透明度">
        <g-input-number
          v-model="config.backgroundStyle.opacity"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </g-field>
      <g-field :level="2" label="背景颜色">
        <g-color-picker v-model="config.backgroundStyle.color" />
      </g-field>
      <g-field :level="2" label="背景边框">
        <g-input-number
          v-model="config.backgroundStyle.borderWidth"
          label="边框宽度"
          inline
          :min="0"
          suffix="px"
        />
        <template v-if="config.backgroundStyle.borderWidth">
          <g-color-picker v-model="config.backgroundStyle.borderColor" inline label="边框颜色" />
          <g-select
            v-model="config.backgroundStyle.borderType"
            :data="lineStyles"
            label="边框类型"
          />
          <g-input-number
            v-model="config.backgroundStyle.borderRadius[0]"
            label="左上圆角"
            inline
            :min="0"
            suffix="px"
          />
          <g-input-number
            v-model="config.backgroundStyle.borderWidth[1]"
            label="右上圆角"
            inline
            :min="0"
            suffix="px"
          />
          <g-input-number
            v-model="config.backgroundStyle.borderWidth[3]"
            label="左下圆角"
            inline
            :min="0"
            suffix="px"
          />
          <g-input-number
            v-model="config.backgroundStyle.borderWidth[2]"
            label="右下圆角"
            inline
            :min="0"
            suffix="px"
          />
        </template>
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      v-model="config.labelLine.show"
      label="视觉引导线"
      toggle
    >
      <GChartLineConfig :config="config.labelLine.lineStyle" allow-inherit />
    </g-field-collapse>
    <g-field-collapse
      v-model="config.label.show"
      label="柱体标签"
      toggle
    >
      <g-field :level="2" label="标签位置">
        <g-select
          v-model="config.label.position"
          :data="echartsLablePositions"
        />
      </g-field>
      <g-field :level="2" tooltip="文字水平对齐方式" label="水平对齐方式">
        <n-radio-group
          v-model:value="config.label.align"
          size="small"
        >
          <n-radio-button v-for="pair in hAligns" :key="pair.id" :value="pair.id">
            {{ pair.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :level="2" tooltip="文字垂直对齐方式" label="垂直对齐方式">
        <n-radio-group
          v-model:value="config.label.erticalAlign"
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
        <n-radio-group v-model:value="config.label.formatter.type" size="small">
          <n-radio-button value="text">默认内容</n-radio-button>
          <n-radio-button value="function">自定义函数</n-radio-button>
        </n-radio-group>
      </g-field>
      <template v-if="config.label.formatter.type === 'function'">
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
          :code="config.label.formatter.function"
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
        <g-input v-model="config.label.formatter.value" placeholder="{b} \n\n {a}人" />
      </g-field>
      <g-field :level="2" label="标签文本">
        <GChartFontConfig allow-inherit :config="config.label.font" />
        <g-input-number
          v-model="config.label.distance"
          label="与图形间隔"
          suffix="px"
          inline
        />
        <g-input-number
          v-model="config.label.rotate"
          :min="-90"
          :max="90"
          tooltip="从 -90 度到 90 度。正值是逆时针"
          label="标签旋转"
          suffix="度"
          inline
        />
        <g-input-number
          v-model="config.label.offset[0]"
          label="水平偏移"
          suffix="px"
          inline
        />
        <g-input-number
          v-model="config.label.offset[1]"
          label="垂直偏移"
          suffix="px"
          inline
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse v-model="config.itemStyle.decal.show" toggle label="贴画图案">
      <GChartDecalConfig :config="config.itemStyle.decal" />
    </g-field-collapse>
    <g-field-collapse v-model="config.itemStyle.shadow" label="阴影" toggle>
      <GChartShadowConfig :config="config.itemStyle" />
    </g-field-collapse>
  </g-field-collapse>
  <g-field-collapse v-model="config.emphasis.disabled" label="鼠标悬浮样式" toggle>
    <g-field-collapse
      label="柱体样式"
    >
      <g-field :leavel="2" label="图形透明度">
        <g-input-number
          v-model="config.emphasis.itemStyle.opacity"
          suffix="px"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </g-field>
      <g-field :leavel="2" label="自适应颜色">
        <g-switch v-model="config.emphasis.itemStyle.color.auto" />
      </g-field>
      <g-field v-if="!config.emphasis.itemStyle.color.auto" :leavel="2" label="选择颜色">
        <g-color-picker v-model="config.emphasis.itemStyle.color.value" allow-img />
      </g-field>
      <GBorderConfig label="图形" split :config="config.emphasis.itemStyle" />
    </g-field-collapse>
    <g-field-collapse
      v-model="config.emphasis.label.show"
      label="柱体标签"
      toggle
    >
      <g-field :level="2" label="标签位置">
        <g-select
          v-model="config.emphasis.label.position"
          :data="echartsLablePositions"
        />
      </g-field>
      <g-field :level="2" tooltip="文字水平对齐方式" label="水平对齐方式">
        <n-radio-group
          v-model:value="config.emphasis.label.align"
          size="small"
        >
          <n-radio-button v-for="pair in hAligns" :key="pair.id" :value="pair.id">
            {{ pair.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :level="2" tooltip="文字垂直对齐方式" label="垂直对齐方式">
        <n-radio-group
          v-model:value="config.emphasis.label.erticalAlign"
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
        <n-radio-group v-model:value="config.emphasis.label.formatter.type" size="small">
          <n-radio-button value="text">默认内容</n-radio-button>
          <n-radio-button value="function">自定义函数</n-radio-button>
        </n-radio-group>
      </g-field>
      <template v-if="config.emphasis.label.formatter.type === 'function'">
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
          :code="config.emphasis.label.formatter.function"
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
        tooltip="{a}：系列名。<br/><br/>{b}：数据名。<br/><br/>{c}：数据值。<br/><br/>  输入 * 换行"
      >
        <g-input v-model="config.emphasis.label.formatter.value" placeholder="{b} \n\n {a}人" />
      </g-field>
      <g-field :level="2" label="标签文本">
        <GChartFontConfig allow-inherit :config="config.emphasis.label.font" />
        <g-input-number
          v-model="config.emphasis.label.distance"
          label="与图形间隔"
          suffix="px"
          inline
        />
        <g-input-number
          v-model="config.emphasis.label.rotate"
          :min="-90"
          :max="90"
          tooltip="从 -90 度到 90 度。正值是逆时针"
          label="标签旋转"
          suffix="度"
          inline
        />
        <g-input-number
          v-model="config.emphasis.label.offset[0]"
          label="水平偏移"
          suffix="px"
          inline
        />
        <g-input-number
          v-model="config.emphasis.label.offset[1]"
          label="垂直偏移"
          suffix="px"
          inline
        />
      </g-field>
    </g-field-collapse>
  </g-field-collapse>
</template>

<style lang="scss">
.legend-editor {
  width: 100% !important;
  margin-right: 0 !important;
}
</style>
