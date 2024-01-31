<!--
 * @Author       : wfl
 * @LastEditors: fj
 * @description  :
 * @updateInfo   :cssLayoutLabel
 * @Date         : 2023-11-23 18:29:13
 * @LastEditTime: 2024-01-04 10:09:43
-->
<template>
  <chartGenerateConfig
    v-if="config.generate.configType === 'basic'"
    :config="config"
    chart-type="none"
  >
    <g-field :level="2" label="显示样式">
      <GlSelectCard v-model="config.generate.type" :data="numerical3Types" />
    </g-field>
    <g-field :level="2" label="显示数量">
      <g-input-number
        v-model="config.generate.lineCount"
        :min="1"
        label="每行列数"
      />
    </g-field>
    <g-field :level="2" label="间距">
      <g-input-number
        v-model="config.label.number.bottom"
        inline
        label="标题与数值间距"
        suffix="px"
      />
      <g-input-number
        v-model="config.label.suffix.left"
        inline
        label="数值与后缀间距"
        suffix="px"
      />
    </g-field>
  </chartGenerateConfig>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="数值" tab="number">
      <g-field-collapse label="数值属性">
        <g-field :level="2" label="位置">
          <template v-if="config.generate.type === numType.图数值">
            <g-input-number
              v-model="config.label.position.left"
              suffix="px"
              :min="0"
              inline
              label="距离左侧"
            />
            <g-input-number
              v-model="config.label.position.top"
              suffix="px"
              inline
              label="距离顶部"
            />
          </template>
          <template v-else>
            <g-select
              v-model="config.label.align"
              inline
              label="水平位置"
              :data="hAligns"
            />
            <g-input-number
              v-model="config.label.position.top"
              suffix="px"
              inline
              label="距离顶部"
            />
          </template>
        </g-field>
        <g-field :level="2" label="字体">
          <GChartFontConfig :config="config.label.number" />
        </g-field>
      </g-field-collapse>

      <GlNumberAnimationConfig :config="config.animation" />
    </el-tab-pane>
    <el-tab-pane
      v-if="config.generate.type === numType.数值图标图标题"
      label="趋势"
      tab="percent"
    >
      <g-field :level="2" label="显示趋势">
        <g-switch v-model="config.label.percent.show" />
      </g-field>
      <g-field :level="2" label="图标">
        <g-input-number
          v-model="config.label.percent.icon.left"
          inline
          label="与文本间距"
        />
        <GlIconPicker v-model="config.label.percent.icon.url" label="图标" />
      </g-field>
      <g-field :level="2" label="文本内容">
        <g-input v-model="config.label.percent.title" />
      </g-field>
      <g-field :level="2" label="字体">
        <GChartFontConfig :config="config.label.percent.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="标题" tab="title">
      <g-field label-span="1" :level="2">
        <GChartFontConfig :config="config.label.font" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="数值后缀" tab="suffix">
      <g-field-collapse
        v-model="config.label.suffix.show"
        toggle
        label-span="1"
        :level="2"
        label="显示后缀"
      >
        <g-field label-span="1" :level="2">
          <GChartFontConfig :config="config.label.suffix.font" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="条件" tab="condition">
      <g-field-collapse
        v-for="(ev, index) in config.event"
        :key="index"
        v-model="ev.use"
        toggle
        label-span="5"
        tooltip="满足此条件的数据项，将按照此条件配置的样式展示"
        :label="`样式条件${index + 1}`"
      >
        <g-field :level="2" label="条件配置" label-span="5">
          <g-input v-model="ev.key1" inline label="字段名" />
          <g-select
            v-model="ev.operator"
            :data="operators"
            inline
            label="运算符"
          />
          <g-switch v-model="ev.static" label="是否与固定值比较" />
          <g-input
            v-if="!ev.static"
            v-model="ev.key2"
            inline
            label="比较字段名"
          />
          <g-input
            v-else
            v-model="ev.value"
            inline
            label="输入要比较的值"
          />
        </g-field>
        <g-field :level="2" label="条件样式" label-span="5" />
        <g-field-collapse label="数值">
          <g-field :level="2" label="数值字体">
            <GChartFontConfig :config="ev.config.label.number" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse :level="2" label="数值后缀">
          <g-field label-span="1" :level="2">
            <GChartFontConfig :config="ev.config.label.suffix.font" />
          </g-field>
        </g-field-collapse>

        <g-field-collapse
          v-if="config.generate.type === numType.数值图标图标题"
          v-model="ev.config.label.percent.show"
          toggle
          label="趋势"
        >
          <g-field :level="2" label="图标">
            <g-input-number
              v-model="ev.config.label.percent.icon.left"
              inline
              label="与文本间距"
            />
            <GlIconPicker
              v-model="ev.config.label.percent.icon.url"
              label="图标"
            />
          </g-field>
          <g-field :level="2" label="文本内容">
            <g-input v-model="ev.config.label.percent.title" />
          </g-field>
          <g-field :level="2" label="字体">
            <GChartFontConfig :config="ev.config.label.percent.font" />
          </g-field>
        </g-field-collapse>
        <g-field-collapse label="标题">
          <g-field label-span="1" :level="2">
            <GChartFontConfig :config="ev.config.label.font" />
          </g-field>
        </g-field-collapse>
      </g-field-collapse>
      <div>
        <n-button
          :focusable="false"
          type="default"
          size="tiny"
          style="width: 100%;"
          @click="handAddEvent()"
        >
          <template #icon>
            <n-icon :size="12">
              <IconPlus />
            </n-icon>
          </template>
          新建样式条件
        </n-button>
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-tabs
    v-else
    key="series"
    v-model="activeTab"
    tab-position="left"
    type="card"
    addable
    :closable="config.series.length > 1"
    class="iking-v-custom-series"
    @tab-remove="handRemoveSeriesItem"
    @tab-add="handleAddSeriesItem"
  >
    <el-tab-pane
      v-for="(item, index) in config.series"
      :key="index"
      :label="`系列${index + 1}`"
      :tab="`系列${index + 1}`"
      :name="index"
    >
      <g-field label="图片">
        <g-upload-image v-model="item.config.image.url" />
      </g-field>

      <!-- <g-field label="图片尺寸">
        <g-input-number
          v-model="item.config.image.size[0]"
          suffix="px"
          :min="0"
          inline
          label="宽度"
        />
        <g-input-number
          v-model="item.config.image.size[1]"
          suffix="px"
          :min="0"
          inline
          label="高度"
        />
      </g-field>
      <g-field label="图片位置">
        <g-input-number
          v-model="item.config.image.top"
          suffix="px"
          inline
          label="与顶部距离"
        />
        <g-input-number
          v-model="item.config.image.left"
          suffix="px"
          :min="0"
          inline
          label="与左侧距离"
        />
      </g-field> -->
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef, watch } from 'vue'
import {
  Numerical3,
  Numerical3Series,
  ENumType,
  usePublicConfig,
} from './numerical3'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VNumerical3Prop',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<Numerical3>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const { activeTab, handleAddSeriesItem, handRemoveSeriesItem } = useSeries(
      config,
      Numerical3Series,
    )

    watch(
      () => config.value.generate.type,
      val => {
        config.value.image.size =
          val === ENumType.数值图标图标题
            ? [config.value.image.size[0], 40]
            : val === ENumType.图数值
              ? [config.value.image.size[0], config.value.image.size[0]]
              : config.value.image.size
      },
    )

    const handAddEvent = () => {
      config.value.event.push({
        static: true,
        use: true,
        key1: '',
        operator: '',
        key2: '',
        value: '',
        config: {
          ...usePublicConfig(),
        },
      })
    }

    return {
      config,
      configType,
      activeTab,
      handAddEvent,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      cssLayoutlr: GlCssLayoutlr,
      cssLayoutLabel: GlCssLayoutLabel,
      hAligns: GlJustifyContents,
      vAligns: GlAligns,
      orients: GlOrients,
      waperEffects: GlWaperEffects,
      operators: GlOperators,
      numerical3Types: [
        {
          id: ENumType.图数值,
          value: 'public/images/10799.jpg',
        },
        {
          id: ENumType.数值图标图标题,
          value: 'public/images/23171.jpg',
        },
        {
          id: ENumType.数值图标题,
          value: 'public/images/29458.jpg',
        },
      ],
      numType: ENumType,
    }
  },
})
</script>
