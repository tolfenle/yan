<script lang="ts" name="chartLegendConfig" setup>
import { PropType } from 'vue'
import { chartLegendConfig } from './config'
import { _ } from 'iking-utils'

const props = defineProps({
  config: {
    type: Object as PropType< typeof chartLegendConfig>,
    default: () => { },
  },
  coms: {
    type: Object,
    default: () => null,
  },
})

const hAligns = GlHAligns
const vAligns = GlVAligns
const orients = GlOrients
const legendAlign = GlLegendAlign
const legendTypes = GlLegendTypes
const echartIcons = GlEchartIcons

const code = ref('')
const handChange = val => {
  code.value = val.value
}
const handBlur = val => {
  props.config.icon.svg = val.value
}

onBeforeUnmount(() => {
  props.config.icon.svg =code.value
})
</script>

<template>
  <g-field-collapse
    v-model="config.show"
    auto-open
    toggle
    label="图例"
  >
    <g-field :level="2" label="图例标记">
      <n-radio-group
        v-model:value="config.icon.type"
        size="small"
      >
        <n-radio-button v-for="pair in legendTypes" :key="pair.id" :value="pair.id">
          {{ pair.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" :label-span="config.icon.type === 'svg' ? 16 : 7" :label="`${config.icon.type === 'default' ? '选择标记' : config.icon.type === 'svg' ? '请输入svg代码' : '选择图片' }`">
      <g-select-shape v-if="config.icon.type === 'default'" v-model="config.icon.value" :shapes="echartIcons" />
      <g-upload-image v-else-if="config.icon.type === 'image'" v-model="config.icon.image" />
    </g-field>
    <g-monaco-editor
      v-if="config.icon.type === 'svg'"
      :select-on-line-numbers="false"
      language="html"
      :code="config.icon.svg"
      :height="200"
      :auto-format="true"
      editor-class="config-editor"
      @change="handChange"
      @blur="handBlur"
    />
    <g-field :level="2" label="布局方式">
      <n-radio-group
        v-model:value="config.orient"
        size="small"
      >
        <n-radio-button v-for="pair in orients" :key="pair.id" :value="pair.id">
          {{ pair.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" label="标记对齐方式" tooltip="图例标记和文本的对齐方式">
      <n-radio-group
        v-model:value="config.align"
        size="small"
      >
        <n-radio-button v-for="pair in legendAlign" :key="pair.id" :value="pair.id">
          {{ pair.value }}
        </n-radio-button>
      </n-radio-group>
    </g-field>
    <g-field :level="2" label="自适应位置">
      <g-switch v-model="config.position.auto" />
    </g-field>
    <template v-if="config.position.auto">
      <g-field
        :level="2"
        label="水平位置"
      >
        <n-radio-group
          v-model:value="config.position.left"
          size="small"
        >
          <n-radio-button v-for="pair in hAligns" :key="pair.id" :value="pair.id">
            {{ pair.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field
        :level="2"
        label="垂直位置"
      >
        <n-radio-group
          v-model:value="config.position.top"
          size="small"
        >
          <n-radio-button v-for="pair in vAligns" :key="pair.id" :value="pair.id">
            {{ pair.value }}
          </n-radio-button>
        </n-radio-group>
      </g-field>
    </template>
    <g-field v-else :level="2" label="自定义位置">
      <g-input-number
        v-model="config.position.value[0]"
        :step="1"
        suffix="px"
        label="上侧"
        inline
        clearable
      />
      <g-input-number
        v-model="config.position.value[1]"
        :step="1"
        suffix="px"
        label="下侧"
        inline
        clearable
      />
      <g-input-number
        v-model="config.position.value[2]"
        :step="1"
        suffix="px"
        label="左侧"
        inline
        clearable
      />
      <g-input-number
        v-model="config.position.value[3]"
        :step="1"
        suffix="px"
        label="右侧"
        inline
        clearable
      />
    </g-field>
    <g-field :level="2" label="内边距">
      <g-input-number
        v-model="config.padding[0]"
        :step="1"
        suffix="px"
        label="上侧"
        inline
        clearable
      />
      <g-input-number
        v-model="config.padding[1]"
        :step="1"
        suffix="px"
        label="下侧"
        inline
        clearable
      />
      <g-input-number
        v-model="config.padding[2]"
        :step="1"
        suffix="px"
        label="左侧"
        inline
        clearable
      />
      <g-input-number
        v-model="config.padding[3]"
        :step="1"
        suffix="px"
        label="右侧"
        inline
        clearable
      />
    </g-field>
    <g-field :level="2" label="图例设置">
      <g-input-number
        v-model="config.itemWidth"
        :step="1"
        suffix="px"
        label="标记宽度"
        inline
        clearable
      />
      <g-input-number
        v-model="config.itemHeight"
        :step="1"
        suffix="px"
        label="标记高度"
        inline
        clearable
      />
      <g-input-number
        v-model="config.itemGap"
        :step="1"
        suffix="px"
        label="图例间隔"
        inline
        clearable
      />
    </g-field>
    <g-field :level="2" label="图例文本">
      <GChartFontConfig :config="config.textStyle" />
    </g-field>
  </g-field-collapse>
</template>

<style lang="scss">
.config-editor {
  width: 100% !important;
  margin-right: 0 !important;
}
</style>
