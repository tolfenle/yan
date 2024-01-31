
<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-02 15:24:37
 * @LastEditTime : 2024-01-10 18:19:57
-->
<script lang="ts" name="ChartPieConfig" setup>
import { PropType } from 'vue'
import { _ } from 'iking-utils'
const TYPE_LINE = useChartLineConfig()

const props = defineProps({
  config: {
    type: Object as PropType<typeof TYPE_LINE & { customTheme?: boolean; } >,
    default: () => { },
  },
})

const hAligns = GlHAligns
const vAligns = GlVAligns
const labelPosition = GlLabelPosition
const alignTos = GlAlignTo

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

</script>

<template>
  <g-field-collapse label="全局配置">
    <g-field :level="2" label="属性">
      <g-switch v-model="config.legendHoverLink" inline label="图例联动高亮" />
      <g-switch v-model="config.avoidLabelOverlap" inline label="防止标签重叠策略" />
      <g-switch v-model="config.clockwise" inline label="顺时针排布" />
      <g-switch v-model="config.stillShowZeroSum" inline label="无数据时显示扇区" />
    </g-field>
    <g-field :level="2" label="偏移距离">
      <g-input-number
        v-model="config.selectedOffset"
        label="选中时偏移距离"
        suffix="px"
      />
    </g-field>
    <g-field :level="2" label="角度">
      <g-input-number
        v-model="config.startAngle"
        label="起始角度"
        suffix="deg"
        :min="0"
        inline
      />
      <g-input-number
        v-model="config.minAngle"
        label="最小扇区角度"
        suffix="deg"
        :min="0"
        :max="360"
        inline
      />
      <g-input-number
        v-model="config.minShowLabelAngle"
        label="小于此扇区角度时，隐藏标签"
        suffix="deg"
        :min="0"
        :max="360"
        inline
      />
    </g-field>
  </g-field-collapse>
  <g-field-collapse label="默认样式">
    <g-field :leavel="2" label="图形透明度">
      <g-input-number
        v-model="config.itemStyle.opacity"
        suffix="px"
        :min="0"
        :max="1"
        :step="0.1"
      />
    </g-field>
    <!-- <g-field :leavel="2" label="自适应颜色">
      <g-switch v-model="config.itemStyle.color.auto" />
    </g-field> -->
    <g-field v-if="!config.itemStyle.color.auto" :leavel="2" label="选择颜色">
      <g-color-picker v-model="config.itemStyle.color.value" allow-img />
    </g-field>
    <GBorderConfig label="图形" split :config="config.itemStyle" />
    <g-field-collapse
      v-model="config.label.show"
      label="标签"
      toggle
    >
      <g-field :level="2" label="标签位置">
        <g-select
          v-model="config.label.position"
          :data="labelPosition"
        />
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
        <GChartFontConfig allow-inherit :config="config.label" />
        <g-select v-model="config.label.alignTo" label="标签对齐方式" :data="alignTos" />
        <g-input-number
          v-model="config.label.distanceToLabelLine"
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
          v-model="config.label.bleedMargin"
          tooltip="文字的出血线大小，超过出血线的文字将被裁剪为 '...'"
          label="文字出血线大小"
          inline
        />
        <g-input-persent v-model="config.label.edgeDistance" label="文字边距" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse
      v-model="config.labelLine.show"
      label="视觉引导线"
      toggle
    >
      <g-field label="引导线">
        <g-switch v-model="config.labelLine.showAbove" inline label="显示在图形上方" />
        <g-switch v-model="config.labelLine.smooth" inline label="平滑视觉引导线" />
        <g-input-number
          v-model="config.labelLine.minTurnAngle"
          suffix="px"
          :min="0"
          label="引导线最小夹角"
          inline
        />
      </g-field>
      <g-field label="第一段长度">
        <g-switch v-model="config.labelLine.length.auto" inline label="自适应" />
        <g-input-number
          v-if="!config.labelLine.length.auto"
          v-model="config.labelLine.length.value"
          suffix="px"
          :min="0"
          label="长度值"
          inline
        />
      </g-field>
      <g-field label="第二段长度">
        <g-switch v-model="config.labelLine.length2.auto" inline label="自适应" />
        <g-input-number
          v-if="!config.labelLine.length2.auto"
          v-model="config.labelLine.length2.value"
          suffix="px"
          :min="0"
          inline
          abel="长度值"
        />
      </g-field>
      <GChartLineConfig :config="config.labelLine.lineStyle" allow-inherit label="引导线" />
    </g-field-collapse>
    <g-field-collapse v-model="config.itemStyle.decal.show" toggle label="贴画图案">
      <GChartDecalConfig :config="config.itemStyle.decal" />
    </g-field-collapse>
    <g-field-collapse v-model="config.itemStyle.shadow" label="阴影" toggle>
      <GChartShadowConfig :config="config.itemStyle" />
    </g-field-collapse>
  </g-field-collapse>
  <g-field-collapse v-model="config.emphasis.disabled" label="鼠标悬浮样式" toggle>
    <g-field :level="2" label="标签文本">
      <GChartFontConfig allow-inherit :config="config.emphasis.label" />
      <g-input-number
        v-model="config.emphasis.label.distanceToLabelLine"
        label="与图形间隔"
        suffix="px"
        inline
      />
    </g-field>
    <g-field :level="2" label="高亮扇区放大">
      <g-switch v-model="config.emphasis.scale" inline label="开启放大效果" />
      <g-input-number
        v-model="config.emphasis.scaleSize"
        label="放大尺寸"
        inline
      />
    </g-field>
    <g-field-collapse v-model="config.emphasis.itemStyle.shadow" label="阴影" toggle>
      <GChartShadowConfig :config="config.emphasis.itemStyle" />
    </g-field-collapse>
  </g-field-collapse>
  <g-field-collapse v-model="config.showEmptyCircle" toggle label="无数据时图表" />
</template>

<style lang="scss">
.legend-editor {
  width: 100% !important;
  margin-right: 0 !important;
}
</style>
