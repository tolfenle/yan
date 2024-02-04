<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" :config="config">
    <g-field :level="2" label="AI制图" label-span="6">
      <n-button @click="handOpenChat">使用AI生成想要的图表</n-button>
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="自定义" tab="cutom">
      <div>
        <p title="function formatter(data) {" class="fake-code --start">
          return 图表option对象
          <n-popover trigger="click" placement="left" width="800">
            <template #trigger>
              <n-button quaternary text type="primary">
                查看param参数信息
              </n-button>
            </template>
            <g-monaco-editor
              language="typescript"
              :code="descriptionCode"
              :height="600"
              readonly
              editor-class="formatter-editor"
            />
          </n-popover>
        </p>
        <p title="function formatter(data) {" class="fake-code --start">
          <span class="--keyword">function</span> formatter(param, echarts) {
        </p>
      </div>
      <g-monaco-editor
        language="javascript"
        :code="config.custom.code"
        :height="400"
        :auto-format="true"
        editor-class="config-editor"
        @change="handChange"
        @blur="handBlur"
      />
      <p class="fake-code --end">}</p>
    </el-tab-pane>
    <el-tab-pane label="柱体" tab="bar">
      <ChartBarPubConfig :config="config.bar" />
      <ChartBarConfig :config="config.bar" />
    </el-tab-pane>
    <el-tab-pane label="折线" tab="line">
      <ChartBasicLineConfig :config="config.line" />
    </el-tab-pane>
    <el-tab-pane label="网格" tab="grid">
      <GChartGridConfig :config="config.grid" />
    </el-tab-pane>
    <el-tab-pane label="X轴" tab="xAxis">
      <ChartAxisConfig :config="config.xAxis" />
    </el-tab-pane>
    <el-tab-pane label="Y轴" tab="yAxis">
      <ChartYxisConfig :config="config.yAxis" />
    </el-tab-pane>
    <el-tab-pane label="提示框" tab="tooltip">
      <ChartTooltipConfig :config="config.tooltip" />
    </el-tab-pane>
    <el-tab-pane label="图例" tab="legend">
      <ChartLegendConfig :config="config.legend" />
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      <ChartAnimationConfig :config="config.animation" />
    </el-tab-pane>
  </el-tabs>
  <GlChart :show="showChart" @code="handCode" @close="handClose" />
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { NButton, NModal } from 'naive-ui'
import { PowerChart } from './power-chart'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VPowerChartProp',
  components: {
    ElTabs,
    ElTabPane,
    NButton,
  },
  props: {
    com: {
      type: Object as PropType<PowerChart>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const descriptionCode = `
    type param =  {
        // 请求返回的数据
        data: any
        // 基础配置中的颜色列表
        color: string[]
        // 基础配置中的文本配置
        textStyle: {
          color: string,
          fontStyle: string
          fontWeight: string
          fontFamily: string
          fontSize: number
        }
      }
    `

    const code = ref(config.value.custom.code)
    const handChange = val => {
      code.value = val.value
    }

    const handBlur = val => {
      props.com.config.custom.code = val.value
    }

    const showChart = ref(false)
    const handOpenChat = () => {
      showChart.value = true
    }

    const handClose = () => {
      showChart.value = false
    }
    const handCode = _code => {
      config.value.custom.code = `${_code}; return ${_code.includes('options') ? 'options' : 'option'}`
      handClose()
    }

    return {
      config,
      configType,
      descriptionCode,
      handChange,
      handBlur,
      handOpenChat,
      handCode,
      handClose,
      showChart,
      fontFamilys: GlFontFamilys,
      GenerateType: EGenerateType,
    }
  },
})
</script>
