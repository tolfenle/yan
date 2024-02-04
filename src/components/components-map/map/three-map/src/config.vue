<script setup lang="ts">
import { defineComponent, PropType, ref, toRef } from 'vue'
import { ElTabs, ElTabPane, ElDialog } from 'element-plus'
import { ikMitt, _ } from 'iking-utils'

const props = defineProps({
  com: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
})

const config = toRef(props.com, 'config')

const showModal = ref(false)
const showMapSelect = ref(false)
const GenerateType = EGenerateType

let map
const handModelConfig = () => {
  showModal.value = true
  ikMitt.emit('mar-title-open')
}

const handCancle = () => {
  showModal.value = false
}
const handConfime = () => {
  showMapSelect.value = false
  handCancle()
}
const handLoaded = (val: any) => {
}

const handCamera = val => {
  ikMitt.emit('hand-camera', val)
}

const handAddSpread = () => {
  config.value.spread.push(_.cloneDeep(config.value.spread[0]))
}

const handAddRoate = () => {
  config.value.rotate.push(_.cloneDeep(config.value.rotate[0]))
}
</script>

<template>
  <template v-if="config.generate.configType === GenerateType.基础">
    <chartGenerateConfig chart-type="none" :config="config">
      <g-field :level="2" label-span="6" label="弹出配置">
        <n-button size="small" style="width: 100%;" @click="handModelConfig">在弹窗中配置</n-button>
      </g-field>
      <g-field :level="2" label-span="6" label="地图放大">
        <g-input-number v-model="config.global.scale" :step="0.1" :min="0" />
      </g-field>
      <g-field :level="2" label-span="6" label="中心坐标">
        <g-input-number
          v-model="config.generate.center[0]"
          inline
          label="经度"
        />
        <g-input-number
          v-model="config.generate.center[1]"
          inline
          label="维度"
        />
      </g-field>
      <g-field :level="2" label-span="6" label="视距">
        <g-input-number
          v-model="config.global.minxDistance"
          inline
          label="最近视距"
        />
        <g-input-number
          v-model="config.global.maxDistance"
          inline
          label="最远视距"
        />
      </g-field>
      <g-field :level="2" label-span="6" label="相机位置">
        <g-input-number
          v-model="config.generate.position.x"
          label="x"
        />
        <g-input-number
          v-model="config.generate.position.y"
          label="y"
        />
        <g-input-number
          v-model="config.generate.position.z"
          label="z"
        />
      </g-field>
      <!-- <g-field :level="2" label-span="6" label="视角位置">
        <g-input-number
          v-model="config.generate.lookat.x"
          inline
          label="x"
        />
        <g-input-number
          v-model="config.generate.lookat.y"
          inline
          label="y"
        />
        <g-input-number
          v-model="config.generate.lookat.z"
          inline
          label="z"
        />
      </g-field> -->
      <g-field :level="2" label-span="6" label="视角位置">
        <g-input-number
          v-model="config.generate.up.x"
          inline
          label="x"
        />
        <g-input-number
          v-model="config.generate.up.y"
          inline
          label="y"
        />
        <g-input-number
          v-model="config.generate.up.z"
          inline
          label="z"
        />
      </g-field>
      <g-field :level="2" label-span="6" label="相机">
        <g-input-number
          v-model="config.global.camera.fov"
          label="垂直视野角度"
        />
      </g-field>
    </chartGenerateConfig>
  </template>
  <el-tabs
    v-else-if="config.generate.configType === GenerateType.全量"
    key="cardleft"
    tab-position="left"
    type="card"
  >
    <el-tab-pane label="数据地图" tab="map">
      <g-field-collapse :level="2" label="基础">
        <g-field :level="2" label="地图范围">
          <g-select-map v-model="config.map.data" />
        </g-field>
        <g-field :level="2" label="高度">
          <g-input-number v-model="config.map.depth" :min="0" :step="0.1" />
        </g-field>
        <g-field :level="2" label="渲染优先级">
          <g-input-number v-model="config.map.renderOrder" :min="0" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse :level="2" label="正面">
        <g-field :level="2" label="正面颜色">
          <g-color-picker v-model="config.map.topFaceMaterial.color" />
        </g-field>
        <g-field :level="2" label="透视">
          <g-switch v-model="config.map.topFaceMaterial.transparent" label="是否透视" />
          <g-input-number
            v-model="config.map.topFaceMaterial.opacity"
            :disabled="!config.map.topFaceMaterial.transparent"
            inline
            label="透视度"
            :min="0"
            :step="0.1"
            :max="1"
          />
        </g-field>
        <g-field :level="2" label="贴图">
          <g-switch v-model="config.map.topFaceMaterial.material.use" label="使用贴图" />
          <g-upload-image v-model="config.map.topFaceMaterial.material.url" />
        </g-field>
        <template v-if="config.map.topFaceMaterial.material.use">
          <g-field :level="2" label="贴图偏移">
            <g-input-number
              v-model="config.map.topFaceMaterial.offset[0]"
              inline
              label="水平偏移"
            />
            <g-input-number
              v-model="config.map.topFaceMaterial.offset[1]"
              inline
              label="垂直偏移"
            />
          </g-field>
          <g-field :level="2" label="贴图重复">
            <g-input-number
              v-model="config.map.topFaceMaterial.repeat[0]"
              inline
              label="水平重复"
            />
            <g-input-number
              v-model="config.map.topFaceMaterial.repeat[1]"
              inline
              label="垂直重复"
            />
          </g-field>
        </template>
      </g-field-collapse>
      <g-field-collapse :level="2" label="侧面">
        <g-field :level="2" label="侧面颜色">
          <g-color-picker v-model="config.map.sideMaterial.color" />
        </g-field>
        <g-field :level="2" label="透视">
          <g-switch v-model="config.map.sideMaterial.transparent" label="是否透视" />
          <g-input-number
            v-model="config.map.sideMaterial.opacity"
            :disabled="!config.map.sideMaterial.transparent"
            inline
            label="透视度"
            :min="0"
            :step="0.1"
            :max="1"
          />
        </g-field>
        <g-field :level="2" label="贴图">
          <g-switch v-model="config.map.sideMaterial.material.use" label="使用贴图" />
          <g-upload-image v-model="config.map.sideMaterial.material.url" />
        </g-field>
        <template v-if="config.map.sideMaterial.material.use">
          <g-field :level="2" label="贴图偏移">
            <g-input-number
              v-model="config.map.sideMaterial.offset[0]"
              inline
              label="水平偏移"
            />
            <g-input-number
              v-model="config.map.sideMaterial.offset[1]"
              inline
              label="垂直偏移"
            />
          </g-field>
          <g-field :level="2" label="贴图重复">
            <g-input-number
              v-model="config.map.sideMaterial.repeat[0]"
              inline
              label="水平重复"
            />
            <g-input-number
              v-model="config.map.sideMaterial.repeat[1]"
              inline
              label="垂直重复"
            />
          </g-field>
        </template>
        <g-field :level="2" label="动画">
          <g-color-picker v-model="config.map.sideMaterial.shader.color" inline label="动画颜色" />
          <g-input-number
            v-model="config.map.sideMaterial.shader.start"
            inline
            label="起始位置"
            :step="0.1"
          />
          <g-input-number
            v-model="config.map.sideMaterial.shader.end"
            inline
            label="结束位置"
            :step="0.1"
          />
          <g-input-number
            v-model="config.map.sideMaterial.shader.height"
            inline
            label="高度"
            :step="0.1"
          />
          <g-input-number
            v-model="config.map.sideMaterial.shader.maxTime"
            inline
            label="动画时间"
            :step="0.1"
          />
          <g-input-number
            v-model="config.map.sideMaterial.shader.speed"
            inline
            label="动画速度"
            :step="0.1"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse :level="2" label="边界线">
        <g-field :level="2" label="边界线颜色">
          <g-color-picker v-model="config.map.line.material.color" />
        </g-field>
        <g-field :level="2" label="高度偏移">
          <g-input-number
            v-model="config.map.line.z"
          />
        </g-field>
        <g-field :level="2" label="渲染优先级">
          <g-input-number
            v-model="config.map.line.renderOrder"
          />
        </g-field>
        <g-field :level="2" label="允许遮挡">
          <g-switch
            v-model="config.map.line.material.depthTest"
          />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.map.label.show"
        :level="2"
        label="标签"
        toggle
      >
        <g-field v-if="config.map?.label?.style" label="标签字体">
          <GChartFontConfig :config="config.map.label.style" />
        </g-field>
      </g-field-collapse>
      <g-field-collapse
        v-model="config.map.wall.show"
        :level="2"
        toggle
        label="边界墙"
      >
        <g-field :level="2" label="允许被遮挡">
          <g-switch v-model="config.map.wall.material.depthTest" />
        </g-field>
        <g-field :level="2" label="边界墙">
          <g-color-picker v-model="config.map.wall.material.color" inline label="边界墙颜色" />
          <g-input-number
            v-model="config.map.wall.material.opacity"
            inline
            label="透明度"
          />
        </g-field>
        <g-field :level="2" label="尺寸">
          <g-input-number
            v-model="config.map.wall.material.side"
            inline
            label="宽度"
          />
          <g-input-number
            v-model="config.map.wall.height"
            inline
            label="高度"
          />
          <g-input-number
            v-model="config.map.wall.z"
            inline
            label="高度偏移"
          />
        </g-field>
        <g-field :level="2" label="渲染优先级">
          <g-input-number
            v-model="config.map.wall.renderOrder"
          />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="背景地图" tab="china">
      <g-field :level="2" label="高度">
        <g-input-number v-model="config.chinaMap.depth" :min="0" :step="0.1" />
      </g-field>
      <g-field :level="2" label="渲染优先级">
        <g-input-number v-model="config.chinaMap.renderOrder" :min="0" />
      </g-field>
      <g-field-collapse :level="2" label="正面">
        <g-field :level="2" label="正面颜色">
          <g-color-picker v-model="config.chinaMap.topFaceMaterial.color" />
        </g-field>
        <g-field :level="2" label="透视">
          <g-switch v-model="config.chinaMap.topFaceMaterial.transparent" label="是否透视" />
          <g-input-number
            v-model="config.chinaMap.topFaceMaterial.opacity"
            :disabled="!config.chinaMap.topFaceMaterial.transparent"
            inline
            label="透视度"
            :min="0"
            :step="0.1"
            :max="1"
          />
        </g-field>
        <g-field :level="2" label="贴图">
          <g-switch v-model="config.chinaMap.topFaceMaterial.material.use" label="使用贴图" />
          <g-upload-image v-model="config.chinaMap.topFaceMaterial.material.url" />
        </g-field>
        <template v-if="config.chinaMap.topFaceMaterial.material.use">
          <g-field :level="2" label="贴图偏移">
            <g-input-number
              v-model="config.chinaMap.topFaceMaterial.offset[0]"
              inline
              label="水平偏移"
            />
            <g-input-number
              v-model="config.chinaMap.topFaceMaterial.offset[1]"
              inline
              label="垂直偏移"
            />
          </g-field>
          <g-field :level="2" label="贴图重复">
            <g-input-number
              v-model="config.chinaMap.topFaceMaterial.repeat[0]"
              inline
              label="水平重复"
            />
            <g-input-number
              v-model="config.chinaMap.topFaceMaterial.repeat[1]"
              inline
              label="垂直重复"
            />
          </g-field>
        </template>
      </g-field-collapse>
      <g-field-collapse :level="2" label="侧面">
        <g-field :level="2" label="侧面颜色">
          <g-color-picker v-model="config.chinaMap.sideMaterial.color" />
        </g-field>
        <g-field :level="2" label="透视">
          <g-switch v-model="config.chinaMap.sideMaterial.transparent" label="是否透视" />
          <g-input-number
            v-model="config.chinaMap.sideMaterial.opacity"
            :disabled="!config.chinaMap.sideMaterial.transparent"
            inline
            label="透视度"
            :min="0"
            :step="0.1"
            :max="1"
          />
        </g-field>
        <g-field :level="2" label="贴图">
          <g-switch v-model="config.chinaMap.sideMaterial.material.use" label="使用贴图" />
          <g-upload-image v-model="config.chinaMap.sideMaterial.material.url" />
        </g-field>
        <template v-if="config.chinaMap.sideMaterial.material.use">
          <g-field :level="2" label="贴图偏移">
            <g-input-number
              v-model="config.chinaMap.sideMaterial.offset[0]"
              inline
              label="水平偏移"
            />
            <g-input-number
              v-model="config.chinaMap.sideMaterial.offset[1]"
              inline
              label="垂直偏移"
            />
          </g-field>
          <g-field :level="2" label="贴图重复">
            <g-input-number
              v-model="config.chinaMap.sideMaterial.repeat[0]"
              inline
              label="水平重复"
            />
            <g-input-number
              v-model="config.chinaMap.sideMaterial.repeat[1]"
              inline
              label="垂直重复"
            />
          </g-field>
        </template>
      </g-field-collapse>
      <g-field-collapse :level="2" label="边界线">
        <g-field :level="2" label="边界线颜色">
          <g-color-picker v-model="config.chinaMap.line.material.color" />
        </g-field>
        <g-field :level="2" label="高度偏移">
          <g-input-number
            v-model="config.chinaMap.line.z"
          />
        </g-field>
        <g-field :level="2" label="渲染优先级">
          <g-input-number
            v-model="config.chinaMap.line.renderOrder"
          />
        </g-field>
      </g-field-collapse>
    </el-tab-pane>
    <el-tab-pane label="背景" tab="background">
      <g-field label="背景图片">
        <g-upload-image v-model="config.background.image" />
      </g-field>
      <g-field label="尺寸">
        <g-input-number v-model="config.background.width" inline label="宽度" />
        <g-input-number v-model="config.background.height" inline label="高度" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="视角" tab="camera">
      <g-field :level="2" label-span="6" label="相机">
        <g-input-number
          v-model="config.global.scale"
          label="放大缩小倍数"
          :min="0"
          :step="0.1"
        />
        <g-input-number
          v-model="config.global.camera.fov"
          label="垂直视野角度"
          :step="1"
        />
        <g-input-number
          v-model="config.global.camera.aspect.value"
          label="视锥体长宽比"
          :step="0.1"
        />
        <g-input-number
          v-model="config.global.camera.aspect.near"
          label="视锥体近端面"
          :step="0.1"
        />
        <g-input-number
          v-model="config.global.camera.aspect.far"
          label="视锥体远端面"
          :step="1"
        />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="网格" tab="grid">
      <g-field :level="2" label="尺寸">
        <g-input-number v-model="config.grid.size" :min="0" />
      </g-field>
      <g-field :level="2" label="数量">
        <g-input-number v-model="config.grid.divisions" :min="0" />
      </g-field>
      <g-field :level="2" label="拐点尺寸">
        <g-input-number v-model="config.grid.pointSize" :min="0" :step="0.01" />
      </g-field>
      <g-field :level="2" label="颜色">
        <g-color-picker v-model="config.grid.colorGrid" inline label="中心线颜色" />
        <g-color-picker v-model="config.grid.colorCenterLine" inline label="网格线颜色" />
        <g-color-picker v-model="config.grid.pointColor" inline label="拐点颜色" />
      </g-field>
    </el-tab-pane>
    <el-tab-pane label="扩散波" tab="spread">
      <template v-for="(item,index) in config.spread" :key="index">
        <g-field-collapse
          :level="2"
          :d-index="index"
          :list="config.spread"
          features="['remove']"
          :label="`扩散波${index + 1}`"
        >
          <g-field :level="2" label="尺寸">
            <g-input-number v-model="item.size[0]" inline />
            <g-input-number v-model="item.size[1]" inline />
          </g-field>
          <g-field :level="2" label="半径">
            <g-input-number v-model="item.radius" :min="0" :step="0.1" />
          </g-field>
          <g-field :level="2" label="光环粗细">
            <g-input-number v-model="item.width" :min="0" :step="0.1" />
          </g-field>
          <g-field :level="2" label="动画">
            <g-input-number
              v-model="item.maxTime"
              inline
              label="动画时间"
              :min="0"
            />
            <g-input-number
              v-model="item.speed"
              inline
              label="动画速度"
              :min="0"
            />
          </g-field>
          <g-field :level="2" label="光环颜色">
            <g-color-picker v-model="item.color" />
          </g-field>
        </g-field-collapse>
      </template>
      <n-button size="small" style="width: 100%;" @click="handAddSpread">添加波纹</n-button>
    </el-tab-pane>
    <el-tab-pane label="旋转圆环" tab="rotate">
      <template v-for="(item,index) in config.rotate" :key="index">
        <g-field-collapse
          :level="2"
          :d-index="index"
          :list="config.rotate"
          features="['remove']"
          :label="`圆环${index + 1}`"
        >
          <g-field :level="2" label="宽度">
            <g-input-number v-model="item.width" />
          </g-field>
          <g-field :level="2" label="据地面高度">
            <g-input-number v-model="item.z" :min="0" :step="0.1" />
          </g-field>
          <g-field :level="2" label="旋转">
            <g-switch v-model="item.needRotate" label="自动旋转" />
            <g-input-number
              v-model="item.rotateSpeed"
              label="旋转速度"
              inline
              :step="0.001"
              tooltip="负值旋转速度将会逆时针旋转"
            />
          </g-field>
          <g-field :level="2" label="圆环材质">
            <g-upload-image v-model="item.material.url" />
            <g-switch v-model="item.material.transparent" label="允许透明" />
            <g-switch v-model="item.material.depthWrite" label="允许遮挡" />
            <g-input-number
              v-model="item.material.opacity"
              label="透明度"
              :step="0.1"
              inline
              :min="0"
              :max="1"
            />
          </g-field>
        </g-field-collapse>
      </template>
      <n-button size="small" style="width: 100%;" @click="handAddRoate">添加旋转圆环</n-button>
    </el-tab-pane>
    <el-tab-pane label="粒子动画" tab="particles">
      <g-field label="数量范围">
        <g-input-number v-model="config.particles.num" inline label="数量" />
        <g-input-number v-model="config.particles.range" inline label="范围" />
      </g-field>
      <g-field label="样式属性">
        <g-switch v-model="config.particles.material.transparent" label="允许透明" />
        <g-input-number
          v-model="config.particles.material.opacity"
          :disabled="!config.particles.material.transparent"
          inline
          label="透明度"
        />
        <g-input-number v-model="config.particles.material.size" inline label="尺寸" />
        <g-color-picker v-model="config.particles.material.color" label="粒子颜色" />
        <g-color-picker v-model="config.particles.material.map" label="粒子材质" allow-img />
      </g-field>
    </el-tab-pane>
  </el-tabs>
  <el-dialog
    v-model="showModal"
    title="设置视角"
    destroy-on-close
    append-to-body
    align-center
    custom-class="iking-3dmap-dialog"
    draggable
  >
    <gl-three-map :config="config" @camera="handCamera" />
    <template #footer>
      <span class="dialog-footer">
        <n-button @click="handCancle">取消</n-button>
        <n-button type="primary" @click="handConfime"> 确定 </n-button>
      </span>
    </template>
  </el-dialog>
  <GlMapArea :show="showMapSelect" />
</template>

<style lang="scss">
.iking-3dmap-dialog {
  width: 93vw;
  height: 97vh;
  background: #252525;
  overflow: hidden;

  .el-dialog__body {
    padding: 0;
    overflow: auto;
    height: calc(100% - 51px);
  }

  .el-dialog__footer {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
