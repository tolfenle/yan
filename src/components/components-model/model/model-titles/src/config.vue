<script setup lang="ts">
import { defineComponent, PropType, ref, toRef } from 'vue'
import { ElTabs, ElTabPane, ElDialog } from 'element-plus'
import { ikMitt } from 'iking-utils'
import * as mars3d from 'mars3d'
import { createTitleModel } from '../utils/create-titles'
import { setModel } from '../../utils/set-model'

const props = defineProps({
  com: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
})

const config = toRef(props.com, 'config')

const showModal = ref(false)
let map
const handModelConfig = () => {
  showModal.value = true
  ikMitt.emit('mar-title-open')
}

const handCancle = () => {
  showModal.value = false
}
const handConfime = () => {
  const camera = map.getCameraView()
  config.value.scene.center = camera
  setTimeout(() => {
    showModal.value = false
  }, 500)
}
const handLoaded = (val: any) => {
  map = val
  map.addLayer(createTitleModel(config.value.global.model))
  setModel(map, config.value)
}

watch(() => config.value.effect, val => {
  map && setModel(map, config.value)
}, { deep: true })
</script>

<template>
  <template v-if="config.generate.configType === 'basic'">
    <chartGenerateConfig chart-type="none" :config="config">
      <g-field :level="2" label-span="6" label="弹出配置">
        <n-button size="small" style="width: 100%;" @click="handModelConfig">在弹窗中配置</n-button>
      </g-field>
       <g-field :level="2" label-span="6" label="背景图">
          <g-upload-image v-model="config.global.backgroundImg" />
       </g-field>
       <g-field :level="2" label-span="6" label="背景图">
          <g-color-picker v-model="config.scene.backgroundColor" />
       </g-field>
      <!-- map.container.style.backgroundImage = "none" -->
    </chartGenerateConfig>
  </template>
  <el-tabs
    v-else-if="config.generate.configType === 'all'"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="控件" tab="controll">
      <g-field :level="2" label="控件显隐">
        <g-switch v-model="config.control.compass" inline label="导航球" />
        <g-switch v-model="config.control.homeButton" inline label="视角复位" />
        <g-switch v-model="config.control.baseLayerPicker" inline label="地图切换" />
        <g-switch v-model="config.control.fullscreenButton" inline label="全屏切换" />
        <g-switch v-model="config.control.vrButton" inline label="VR模式" />
        <g-switch v-model="config.control.sceneModePicker" inline label="二三维切换" />
        <g-switch v-model="config.control.zoom" inline label="地图缩放" />
        <g-switch v-model="config.control.locationBar" inline label="信息状态栏" />
        <g-switch v-model="config.control.clockAnimate" inline label="时钟" />
        <g-switch v-model="config.control.distanceLegend" inline label="比例尺" />
      </g-field>
      <g-field :level="2" label="右键面板">
        <g-switch v-model="config.control.contextmenu.hasDefault" label="右键面板" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="场景" tab="scene">
      <g-field-collapse
        label="视角"
      >
        <g-field :level="2" tooltip="可在”基础->在弹窗中配置“中拖拽设置" label="默认视角">
          <g-input-number
            v-model="config.scene.center.lng"
            :step="0.0001"
            inline
            label="经度"
          />
          <g-input-number
            v-model="config.scene.center.lat"
            :step="0.0001"
            inline
            label="维度"
          />
          <g-input-number
            v-model="config.scene.center.alt"
            :step="10"
            inline
            label="高度"
          />
          <g-input-number
            v-model="config.scene.center.heading"
            :min="0"
            :max="360"
            inline
            label="方向角度值"
          />
          <g-input-number
            v-model="config.scene.center.pitch"
            :min="-90"
            :max="90"
            inline
            label="俯仰角度值"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        label="场景参数"
      >
        <g-field :level="2" label="场景参数">
          <g-switch v-model="config.scene.shadows" inline label="启用日照阴影" />
          <g-switch v-model="config.scene.showSun" inline label="显示太阳" />
          <g-switch v-model="config.scene.showMoon" inline label="显示月亮" />
          <g-switch v-model="config.scene.showSkyBox" inline label="显示天空盒" />
          <g-switch
            v-model="config.scene.showSkyAtmosphere"
            tooltip="显示地球大气层外光圈"
            inline
            label="显示地球大气层外光圈"
          />
          <g-switch v-model="config.scene.fog" inline label="雾化效果" />
          <g-switch v-model="config.scene.fxaa" inline label="抗锯齿" />
          <g-switch v-model="config.scene.globe.depthTestAgainstTerrain" inline label="深度监测" />
          <g-switch v-model="config.scene.globe.showGroundAtmosphere" inline label="地面大气" />
          <g-switch v-model="config.scene.globe.enableLighting" inline label="昼夜区域" />
        </g-field>
      </g-field-collapse>
      <g-field toggle label="地球">
        <g-switch v-model="config.scene.globe.baseMap" inline label="显示底图" />
        <g-color-picker v-model="config.scene.globe.baseColor" label="地球颜色" />
        <g-input-number
          v-model="config.scene.globe.terrainExaggeration"
          :step="1"
          :min="1"
          :max="80"
        />
      </g-field>
      <g-field-collapse
        v-model="config.effect.bloom.show"
        toggle
        label="泛光"
      >
        <g-field label="对比度">
          <g-input-number v-model="config.effect.bloom.contrast" :step="0.1" />
        </g-field>
        <g-field label="亮度">
          <g-input-number v-model="config.effect.bloom.brightness" :step="0.1" />
        </g-field>
        <g-field label="增量">
          <g-input-number v-model="config.effect.bloom.delta" :step="0.1" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.effect.brightn.show"
        toggle
        label="亮度"
      >
        <g-field label="亮度">
          <g-input-number v-model="config.effect.brightn.brightness" :step="0.1" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.mask.show"
        toggle
        label="蒙板"
      >
        <g-field label="蒙板颜色" tooltip="在预览模式下生效">
          <g-color-picker v-model="config.mask.backgroundImage" />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="模型" tab="model">
      <g-field :level="2" label="模型地址">
        <g-input v-model="config.global.model.url" />
      </g-field>
      <g-field :level="2" label="模型位置">
        <g-input v-model="config.global.model.position.lng" inline label="经度" />
        <g-input v-model="config.global.model.position.lat" inline label="维度" />
        <g-input v-model="config.global.model.position.alt" inline label="高度" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="相机" tab="camera">
      <g-field :level="2" label="鼠标滚轮步长">
        <g-input-number v-model="config.scene.cameraController.zoomFactor" :step="0.1" />
      </g-field>
      <g-field :level="2" label="视角最小值">
        <g-input-number v-model="config.scene.cameraController.minimumZoomDistance" :step="1" suffix="米" />
      </g-field>
      <g-field :level="2" label="视角最大值">
        <g-input-number v-model="config.scene.cameraController.maximumZoomDistance" :step="1" suffix="米" />
      </g-field>
      <g-field :level="2" label="场景参数">
        <g-switch v-model="config.scene.cameraController.enableRotate" inline label="允许旋转相机" />
        <g-switch v-model="config.scene.cameraController.enableZoom" inline label="放大缩小视图" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="动画" tab="animation">
      55
    </el-tab-pane>
  </el-tabs>
  <el-dialog
    v-model="showModal"
    title="Tips"
    destroy-on-close
    append-to-body
    align-center
    custom-class="iking-mard-dialog"
  >
    <GlMarSMap
      ref="refMap"
      :options="config"
      style="height: 100%;width: 100%;"
      @onload="handLoaded"
    />
    <div class="mars-config">
      <g-field label="开启泛光">
        <g-switch v-model="config.effect.bloom" />
      </g-field>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <n-button @click="handCancle">取消</n-button>
        <n-button type="primary" @click="handConfime"> 确定 </n-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-dialog.iking-mard-dialog {
  --el-dialog-bg-color: #2e2e2e;

  height: 90vh;
  width: 90vw;

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .mars-config {
    position: absolute;
    right: 0;
    top: 0;
    background: #00000059;
    height: 100%;
    width: 222px;
  }

  .el-dialog__footer {
    position: absolute;
    bottom: -12px;
    right: -15px;

    button {
      margin-left: 8px;
    }
  }
}
</style>
