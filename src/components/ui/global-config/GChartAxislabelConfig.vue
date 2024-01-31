<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-26 11:00:33
 * @LastEditTime : 2023-11-16 17:51:14
-->
<script setup lang="ts" name="ChartAxisLabelConfig">
import { xAxisConfig } from '@/components/chart-config/xAxis/config'
import { PropType } from 'vue'
defineProps({
  config: {
    type: Object as PropType<typeof xAxisConfig.axisLabel>,
    default: () => {},
  },
})
// formatter: {
//       // 字段
//       fields: 'x',
//       // 分隔符
//       split: '',
//       // 后缀
//       suffix: '',
//       // 前缀
//       prefix: '',
//       // 自定义函数
//       diy: '',
//     }
</script>

<template>
  <g-field-collapse
    v-model="config.show"
    toggle
    label="坐标轴标签"
  >
    <g-field label="标签朝内">
      <n-switch v-model="config.inside" />
    </g-field>
    <g-field label="标签内容">
      <g-input v-model="config.formatter.fields" inline label="显示字段" />
      <g-input v-model="config.formatter.split" inline label="分隔符" />
      <g-input v-model="config.formatter.prefix" inline label="前缀" />
      <g-input v-model="config.formatter.suffix" inline label="后缀" />
    </g-field>
    <g-field-collapse
      v-model="config.formatter.diy.use"
      toggle
      label="自定义内容"
      tooltip="{a}：系列名。<br/><br/>
              {b}：数据名。<br/><br/>
              {c}：数据值。<br/><br/>
              {@xxx}：数据中名为 'xxx' 的维度的值，如 {@product} 表示名为 'product' 的维度的值。<br/><br/>
              {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。
              <br/><br/>输入*换行"
    >
      <g-input v-model="config.formatter.diy.value" label="优先级高于‘标签内容’" />
    </g-field-collapse>
    <g-field label="内容样式">
      <GChartFontConfig label="文字颜色" :config="config" />
    </g-field>
    <g-field label="标签设置">
      <g-input-number
        v-model="config.rotate"
        :min="-180"
        :max="180"
        :step="1"
        inline
        label="旋转角度"
        suffix="deg"
      />
      <g-input-number
        v-model="config.rotate"
        :min="-1000"
        :max="1000"
        :step="1"
        inline
        label="与轴线间隔"
        suffix="px"
      />
    </g-field>
  </g-field-collapse>
</template>
