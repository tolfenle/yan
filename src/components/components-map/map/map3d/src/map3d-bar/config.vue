<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 12:02:25
 * @LastEditTime : 2023-12-11 16:20:15
-->
<script lang="ts" setup>
import { toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { Map3dBar } from './index'

const props = defineProps<{
  com: Map3dBar
}>()

const config = toRef(props.com, 'config')

const lineStyles = GlLineStyles
const fontFamilys = GlFontFamilys
const fontWeights = GlFontWeights

</script>

<template>
  <el-tabs
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="柱状图" tab="map">
      <g-field :leval="2" label="着色效果">
        <n-radio-group v-model:value="config.shading" size="small">
          <n-radio-button value="color">颜色</n-radio-button>
          <n-radio-button value="lambert">光照</n-radio-button>
          <n-radio-button value="realistic">真实感</n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :leval="2" label="柱体颜色">
        <g-color-picker v-model="config.itemStyle.color" />
      </g-field>
      <g-field :leval="2" label="透明度">
        <g-input-number
          v-model="config.itemStyle.opacity"
          :min="0"
          :step="0.1"
          :max="1"
        />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.barSize"
          :min="0"
          :step="0.1"
          inline
          label="柱体宽度"
        />
        <g-input-number
          v-model="config.minHeight"
          :min="0"
          inline
          label="最小高度"
        />
        <g-input-number
          v-model="config.scale"
          :min="0"
          :step="0.1"
          inline
          label="放大倍数"
        />
      </g-field>
      <GChartLabelConfig :config="config.label" />
    </el-tab-pane>
    <el-tab-pane v-if="config.shading === 'color'" label="颜色材质" tab="color">
      <g-field :leval="2" label="纹理贴图">
        <g-color-picker v-model="config.colorMaterial.detailTexture" allow-img />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.colorMaterial.textureTiling"
          tooltip="材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数"
          inline
          label="细节纹理平铺"
        />
        <g-input-number v-model="config.colorMaterial.textureOffset" inline label="细节纹理位移" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane v-else-if="config.shading === 'lambert'" label="光照材质" tab="lambert">
      <g-field :leval="2" label="纹理贴图">
        <g-color-picker v-model="config.lambertMaterial.detailTexture" allow-img />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.lambertMaterial.textureTiling"
          tooltip="材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数"
          inline
          label="细节纹理平铺"
        />
        <g-input-number v-model="config.lambertMaterial.textureOffset" inline label="细节纹理位移" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane v-else label="真实感材质" tab="realistic">
      <g-field :leval="2" label="纹理贴图">
        <g-color-picker v-model="config.realisticMaterial.detailTexture" allow-img />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.realisticMaterial.textureTiling"
          tooltip="材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数"
          inline
          label="细节纹理平铺"
        />
        <g-input-number v-model="config.realisticMaterial.textureOffset" inline label="细节纹理位移" />
      </g-field>
    </el-tab-pane>
  </el-tabs>
</template>
