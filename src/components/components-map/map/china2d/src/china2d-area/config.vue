<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="区域" tab="defaultStyle">
      <g-field
        :level="2"
        label="填充颜色"
        :is-flat="true"
      >
        <g-color-picker
          v-model="config.defaultStyle.fill.minFillColor"
          inline="inline-single"
          label="最小值"
        />
        <g-color-picker
          v-model="config.defaultStyle.fill.maxFillColor"
          inline="inline-single"
          label="最大值"
        />
        <g-color-picker
          v-model="config.defaultStyle.fill.fillColor"
          inline="inline-single"
          label="无数据"
        />
      </g-field>
      <g-field
        :level="2"
        label="边线样式"
        :is-flat="true"
      >
        <g-color-picker
          v-model="config.defaultStyle.stroke.color"
          inline="inline-single"
          label="颜色"
        />
        <g-slider
          v-model="config.defaultStyle.stroke.weight"
          :min="0"
          :max="20"
          :step="1"
          suffix="px"
          inline="inline-single"
          label="粗细 [0, 20]"
        />
        <g-select
          v-model="config.defaultStyle.stroke.dashArray"
          :data="lineStyles"
          inline="inline-single"
          label="线类型"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="标注" tab="labelStyle">
      <g-field-collapse
        v-model="config.labelStyle.show"
        :toggle="true"
        label="标注"
      >
        <g-field
          :level="2"
          tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
          label="字体"
        >
          <g-select
            v-model="config.labelStyle.fontFamily"
            :data="fontFamilys"
          />
        </g-field>
        <g-field
          :level="2"
          label="文字粗细"
        >
          <g-select
            v-model="config.labelStyle.fontWeight"
            :data="fontWeights"
          />
        </g-field>
        <g-field
          :level="2"
          label="字号"
        >
          <g-input-number
            v-model="config.labelStyle.fontSize"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field
          :level="2"
          label="颜色"
        >
          <g-color-picker
            v-model="config.labelStyle.color"
          />
        </g-field>
        <g-field
          :level="2"
          label="阴影色"
        >
          <g-color-picker
            v-model="config.labelStyle.shadowColor"
          />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="弹框" tab="tooltip">
      <g-field-collapse
        v-model="config.tooltip.show"
        :toggle="true"
        label="弹框"
      >
        <g-field
          :level="2"
          tooltip="请设置info字段作为弹窗内容，info支持配置html标签；如不选，则兼容name和value作为弹窗内容"
          label="info字段"
        >
          <n-switch
            v-model:value="config.tooltip.infoField"
          />
        </g-field>
        <g-field
          :level="2"
          label="事件类型"
        >
          <n-radio-group
            v-model:value="config.tooltip.eventType"
            size="small"
          >
            <n-radio
              v-for="pair in [
                { key: 'click', value: '点击区域' },
                { key: 'mousemove', value: '鼠标移入时' },
              ]"
              :key="pair.key"
              :value="pair.key"
            >
              {{ pair.value }}
            </n-radio>
          </n-radio-group>
        </g-field>
        <g-field
          :level="2"
          label="配置选项"
        >
          <n-radio-group
            v-model:value="config.tooltip.styleType"
            size="small"
          >
            <n-radio-button
              v-for="pair in [
                { key: 'parent', value: '父容器默认' },
                { key: 'custom', value: '自定义配置' },
              ]"
              :key="pair.key"
              :value="pair.key"
            >
              {{ pair.value }}
            </n-radio-button>
          </n-radio-group>
        </g-field>
        <g-field
          v-if="config.tooltip.styleType === 'custom'"
          :level="2"
          label="文本样式"
          :is-flat="true"
        >
          <g-select
            v-model="config.tooltip.textStyle.fontFamily"
            :data="fontFamilys"
            inline="inline"
            label="字体"
          />
          <g-select
            v-model="config.tooltip.textStyle.fontWeight"
            :data="fontWeights"
            inline="inline"
            label="文字粗细"
          />
          <g-input-number
            v-model="config.tooltip.textStyle.fontSize"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="字号"
          />
          <g-color-picker
            v-model="config.tooltip.textStyle.color"
            inline="inline"
            label="颜色"
          />
        </g-field>
        <g-field
          v-if="config.tooltip.styleType === 'custom'"
          :level="2"
          label="行高比例"
        >
          <g-slider
            v-model="config.tooltip.lineHeight"
            :min="0.5"
            :max="5"
            :step="1"
          />
        </g-field>
        <g-field
          v-if="config.tooltip.styleType === 'custom'"
          :level="2"
          label="圆角半径"
        >
          <g-slider
            v-model="config.tooltip.borderRadius"
            :min="0"
            :max="20"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field
          v-if="config.tooltip.styleType === 'custom'"
          :level="2"
          label="外边距"
          :is-flat="true"
        >
          <g-input-number
            v-model="config.tooltip.padding.top"
            :min="0"
            :max="100"
            :step="1"
            inline="inline"
            label="上"
          />
          <g-input-number
            v-model="config.tooltip.padding.bottom"
            :min="0"
            :max="100"
            :step="1"
            inline="inline"
            label="下"
          />
          <g-input-number
            v-model="config.tooltip.padding.left"
            :min="0"
            :max="100"
            :step="1"
            inline="inline"
            label="左"
          />
          <g-input-number
            v-model="config.tooltip.padding.right"
            :min="0"
            :max="100"
            :step="1"
            inline="inline"
            label="右"
          />
        </g-field>
        <g-field
          v-if="config.tooltip.styleType === 'custom'"
          :level="2"
          label="背景色"
        >
          <g-color-picker
            v-model="config.tooltip.bgColor"
          />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="交互" tab="interactive">
      <g-field
        v-model="config.interactive.isHover.show"
        :toggle="true"
        :level="2"
        label="悬停样式"
        :is-flat="true"
      >
        <g-color-picker
          v-model="config.interactive.isHover.fillColor"
          inline="inline-single"
          label="填充颜色"
        />
        <g-color-picker
          v-model="config.interactive.isHover.strokeColor"
          inline="inline-single"
          label="边线颜色"
        />
        <g-input-number
          v-model="config.interactive.isHover.weight"
          :min="0"
          :max="20"
          :step="1"
          suffix="px"
          inline="inline-single"
          label="边线粗细 [0, 20]"
        />
      </g-field>
      <g-field
        v-model="config.interactive.clickZoom.show"
        :toggle="true"
        :level="2"
        label="点击聚焦"
        :is-flat="true"
      >
        <g-slider
          v-model="config.interactive.clickZoom.zoomPad"
          :min="0"
          :max="100"
          :step="1"
          inline="inline-single"
          label="聚焦范围比 [1, 3]"
        />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts' setup>
import { toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { China2dArea } from './index'

const props = defineProps<{
  com: China2dArea
}>()

const config = toRef(props.com, 'config')

const lineStyles = GlLineStyles
const fontFamilys = GlFontFamilys
const fontWeights = GlFontWeights
</script>
