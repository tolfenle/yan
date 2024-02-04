<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-07 16:47:12
 * @LastEditTime : 2024-01-30 11:58:08
-->
<template>
  <chartGenerateConfig v-if="config.generate.configType === GenerateType.基础" :config="config" />
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="地图" tab="map">
      <g-field :leval="2" label="地图范围">
        <g-select-map v-model="config.global.map" />
      </g-field>
      <g-field :leval="2" label="着色效果">
        <n-radio-group v-model:value="config.global.shading" size="small">
          <n-radio-button value="color">颜色</n-radio-button>
          <n-radio-button value="lambert">光照</n-radio-button>
          <n-radio-button value="realistic">真实感</n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field :leval="2" label="地图属性">
        <g-color-picker v-model="config.global.itemStyle.color" inline label="地图颜色" />
        <g-input-number
          v-model="config.global.itemStyle.opacity"
          :min="0"
          :max="1"
          :step="0.1"
          inline
          label="透明度"
        />
        <g-input-number
          v-model="config.global.itemStyle.borderWidth"
          inline
          label="边框宽度"
        />
        <g-color-picker v-model="config.global.itemStyle.borderColor" inline label="边框颜色" />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number v-model="config.global.boxWidth" inline label="三维场景中的宽度" />
        <g-input-number v-model="config.global.boxHeight" inline label="三维场景中的高度" />
      </g-field>
      <g-field :leval="2" label="地图高度">
        <g-input-number v-model="config.global.regionHeight" />
      </g-field>
      <g-field :leval="2" label="环境贴图">
        <g-color-picker v-model="config.global.environment" allow-img />
      </g-field>
      <GChartLabelConfig label="地图标签" :config="config.global.label" />
      <g-field-collapse :leval="2" label="地图悬浮样式">
        <GChartLabelConfig :config="config.global.emphasis.label" />
        <g-field :leval="2" label="地图属性">
          <g-color-picker v-model="config.global.emphasis.itemStyle.color" inline label="地图颜色" />
          <g-input-number
            v-model="config.global.emphasis.itemStyle.opacity"
            :min="0"
            :max="1"
            :step="0.1"
            inline
            label="透明度"
          />
          <g-input-number
            v-model="config.global.emphasis.itemStyle.borderWidth"
            inline
            label="边框宽度"
          />
          <g-color-picker v-model="config.global.emphasis.itemStyle.borderColor" inline label="边框颜色" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane v-if="config.global.shading === 'color'" label="颜色材质" tab="color">
      <g-field :leval="2" label="纹理贴图">
        <g-color-picker v-model="config.global.colorMaterial.detailTexture" allow-img />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.global.colorMaterial.textureTiling"
          tooltip="材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数"
          inline
          label="细节纹理平铺"
        />
        <g-input-number v-model="config.global.colorMaterial.textureOffset" inline label="细节纹理位移" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane v-else-if="config.global.shading === 'lambert'" label="光照材质" tab="lambert">
      <g-field :leval="2" label="纹理贴图">
        <g-color-picker v-model="config.global.lambertMaterial.detailTexture" allow-img />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.global.lambertMaterial.textureTiling"
          tooltip="材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数"
          inline
          label="细节纹理平铺"
        />
        <g-input-number v-model="config.global.lambertMaterial.textureOffset" inline label="细节纹理位移" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane v-else label="真实感材质" tab="realistic">
      <g-field :leval="2" label="纹理贴图">
        <g-color-picker v-model="config.global.realisticMaterial.detailTexture" allow-img />
      </g-field>
      <g-field :leval="2" label="尺寸">
        <g-input-number
          v-model="config.global.realisticMaterial.textureTiling"
          tooltip="材质细节纹理的平铺。默认为1，也就是拉伸填满。大于 1 的时候，数字表示纹理平铺重复的次数"
          inline
          label="细节纹理平铺"
        />
        <g-input-number v-model="config.global.realisticMaterial.textureOffset" inline label="细节纹理位移" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="光源" tab="light">
      <g-field :level="2" label="主光源">
        <g-color-picker v-model="config.global.light.main.color" inline label="主光源颜色" />
        <g-input-number
          v-model="config.global.light.main.intensity"
          inline
          :step="0.1"
          label="主光源强度"
        />
        <g-switch v-model="config.global.light.main.shadow" inline label="主光源投影" />
        <g-select
          v-model="config.global.light.main.shadowQuality"
          :data="shadowQualitys"
          inline
          label="投影质量"
        />
        <g-input-number
          v-model="config.global.light.main.alpha"
          inline
          label="主光源上下角度"
        />
        <g-input-number
          v-model="config.global.light.main.beta"
          inline
          label="主光源左右角度"
        />
      </g-field>
      <g-field :level="2" label="环境光">
        <g-color-picker v-model="config.global.light.ambient.color" inline label="环境光颜色" />
        <g-input-number
          v-model="config.global.light.ambient.intensity"
          inline
          :step="0.1"
          label="环境光强度"
        />
      </g-field>
      <g-field :level="2" label="纹理光源">
        <g-color-picker
          v-model="config.global.light.ambientCubemap.texture"
          label="纹理"
          allow-img
        />
        <g-input-number
          v-model="config.global.light.ambientCubemap.diffuseIntensity"
          inline
          :step="0.1"
          label="漫反射的强度"
        />
        <g-input-number
          v-model="config.global.light.ambientCubemap.specularIntensity"
          inline
          :step="0.1"
          label="高光反射强度"
        />
      </g-field>
    </el-tab-pane>

    <el-tab-pane label="地面" tab="groundPlane">
      <g-field-collapse
        v-model="config.global.groundPlane.show"
        toggle
        label="显示地面"
      >
        <g-field :leval="2" label="地面贴图">
          <g-color-picker v-model="config.global.groundPlane.color" allow-img />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="视角" tab="view">
      <g-field :leval="2" label="投影方式">
        <n-radio-group v-model:value="config.global.viewControl.projection" size="small">
          <n-radio-button value="perspective">透视投影</n-radio-button>
          <n-radio-button value="orthographic">正交投影</n-radio-button>
        </n-radio-group>
      </g-field>
      <g-field-collapse
        v-model="config.global.viewControl.autoRotate"
        toggle
        :leval="2"
        label="自动旋转"
      >
        <g-field :leval="2" label="旋转方向">
          <n-radio-group v-model:value="config.global.viewControl.autoRotateDirection" size="small">
            <n-radio-button value="cw">顺时针</n-radio-button>
            <n-radio-button value="ccw">逆时针</n-radio-button>
          </n-radio-group>
        </g-field>
        <g-field :leval="2" label="旋转速度">
          <g-input-number
            v-model="config.global.viewControl.autoRotateSpeed"
          />
        </g-field>
      </g-field-collapse>
      <g-field :leval="2" label="视角距离">
        <g-input-number
          v-model="config.global.viewControl.distance"
          :step="10"
          inline
          label="默认距离"
        />
        <g-input-number
          v-model="config.global.viewControl.minDistance"
          inline
          label="最近距离"
        />
        <g-input-number
          v-model="config.global.viewControl.maxDistance"
          inline
          label="最远距离"
        />
      </g-field>
      <g-field :leval="2" label="上下旋转角度">
        <g-input-number
          v-model="config.global.viewControl.alpha"
          inline
          label="默认角度"
        />
        <g-input-number
          v-model="config.global.viewControl.minAlpha"
          inline
          label="最小角度"
        />
        <g-input-number
          v-model="config.global.viewControl.maxAlpha"
          inline
          label="最大角度"
        />
      </g-field>
      <g-field :leval="2" label="左右旋转角度">
        <g-input-number
          v-model="config.global.viewControl.beta"
          :step="100"
          inline
          label="默认角度"
        />
        <g-input-number
          v-model="config.global.viewControl.minBeta"
          inline
          label="最小角度"
        />
        <g-input-number
          v-model="config.global.viewControl.maxBeta"
          inline
          label="最大角度"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="提示框" tab="tooltip">
      <ChartTooltipConfig :config="config.tooltip" />
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      <ChartAnimationConfig :config="config.animation" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, toRef } from 'vue'
import { Map3d, Map3dSeries } from './map3d'
import { ElTabs, ElTabPane } from 'element-plus'

export default defineComponent({
  name: 'VMap3dProp',
  components: {
    ElTabs,
    ElTabPane,
  },
  props: {
    com: {
      type: Object as PropType<Map3d>,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.com, 'config')
    const configType = ref('basic')

    const handleAddSeriesItem = () => {
      config.value.series.push(new Map3dSeries(`系列${config.value.series.length + 1}`))
    }

    const handRemoveSeriesItem = index => {
      config.value.series.splice(index, 1)
    }

    return {
      config,
      configType,
      handleAddSeriesItem,
      handRemoveSeriesItem,
      fontFamilys: GlFontFamilys,
      shadowQualitys: GlShadowQualitys,
      GenerateType: EGenerateType,
    }
  },
})
</script>
