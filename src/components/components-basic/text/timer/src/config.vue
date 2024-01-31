<template>
  <div class="setting-panel-gui">
    <el-tabs
      key="cardleft"
      tab-position="left"
      type="card"
    >
      <el-tab-pane label="图标" tab="icon">
        <g-field
          :level="2"
          label="选择图标"
        >
          <GlIconPicker v-model="config.iconStyle.url" />
        </g-field>
        <g-field
          :level="2"
          label="大小"
        >
          <g-slider
            v-model="config.iconStyle.size"
            :min="0"
            :max="100"
            :step="0.1"
          />
        </g-field>
        <g-field
          :level="2"
          label="颜色"
        >
          <g-color-picker
            v-model="config.iconStyle.color"
          />
        </g-field>
        <g-field
          :level="2"
          label="边距"
        >
          <g-slider
            v-model="config.iconStyle.marginRight"
            :min="-100"
            :max="100"
            :step="1"
          />
        </g-field>
      </el-tab-pane>
      <el-tab-pane label="时间器" tab="title">
        <g-field
          :level="2"
          tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
          label="字体"
        >
          <g-select
            v-model="config.time.textStyle.fontFamily"
            :data="fontFamilys"
          />
        </g-field>
        <g-field
          :level="2"
          label="字号"
        >
          <g-input-number
            v-model="config.time.textStyle.fontSize"
            :min="12"
            :max="100"
            :step="1"
            suffix="px"
          />
        </g-field>
        <g-field
          :level="2"
          label="字体颜色"
        >
          <g-color-picker
            v-model="config.time.textStyle.color"
          />
        </g-field>
        <g-field
          :level="2"
          label="字体粗细"
        >
          <g-select
            v-model="config.time.textStyle.fontWeight"
            :data="fontWeights"
          />
        </g-field>
        <g-field
          :level="2"
          tooltip="如：hh:mm:ss为12小时制的格式"
          label="格式化"
        >
          <g-select
            v-model="config.time.format"
            :data="timeFormats"
          />
        </g-field>
        <g-field
          :level="2"
          label="间隔时间"
        >
          <g-input-number
            v-model="config.time.duration"
            :min="0"
            :step="100"
            suffix="ms"
          />
        </g-field>
        <g-field
          :level="2"
          label="水平对齐"
        >
          <n-radio-group
            v-model:value="config.time.horizontal"
            size="small"
          >
            <n-radio-button
              v-for="em in justifyContents"
              :key="em.id"
              :value="em.id"
            >
              {{ em.value }}
            </n-radio-button>
          </n-radio-group>
        </g-field>
        <g-field
          :level="2"
          label="垂直对齐"
        >
          <n-radio-group
            v-model:value="config.time.vertical"
            size="small"
          >
            <n-radio-button
              v-for="em in aligns"
              :key="em.id"
              :value="em.id"
            >
              {{ em.value }}
            </n-radio-button>
          </n-radio-group>
        </g-field>
      </el-tab-pane>
      <el-tab-pane label="周" tab="week">
        <g-field label="显示周">
          <g-switch v-model="config.time.week.show" inline label="是否显示" />
          <g-input
            v-if="config.time.week.show"
            v-model="config.time.week.suffix"
            label="名称"
            inline
          />
        </g-field>
        <g-field :level="2" label="间距">
          <g-slider
            v-model="config.time.week.marginLeft"
            :min="0"
            :max="100"
            :step="1"
          />
        </g-field>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRef } from 'vue'
import { Timer } from './timer'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VTimerProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<Timer>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')

    return {
      config,
      timeFormats: GlTimeFormats,
      fontFamilys: GlFontFamilys,
      fontWeights: GlFontWeights,
      justifyContents: GlJustifyContents,
      aligns: GlAligns,
    }
  },
})
</script>
