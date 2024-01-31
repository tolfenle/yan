<template>
  <div class="config-manager-page">
    <div class="config-manager-head">组内配置</div>
    <div class="config-manager-body">
      <div class="layer-setting-panel">
        <g-field label="图表尺寸" :is-flat="true">
          <g-input-number
            v-model="com.scaling.w"
            :min="10"
            inline
            @update:modelValue="updateWidth"
          />
          <g-input-number
            v-model="com.scaling.h"
            :min="10"
            inline
            @update:modelValue="updateHeight"
          />
        </g-field>
        <g-field label="图表位置" :is-flat="true">
          <g-input-number v-model="com.attr.x" inline />
          <g-input-number v-model="com.attr.y" inline />
        </g-field>
        <g-field label="透明度">
          <g-slider
            v-model="com.attr.opacity"
            :min="0"
            :max="1"
            :step="0.05"
          />
        </g-field>
        <g-field-collapse label="入场动画">
          <g-field label="背景动画">
            <g-select v-model="com.animate.type" :data="animatecss" />
          </g-field>
          <g-field label="动画曲线">
            <g-select v-model="com.animate.timing" :data="easings" />
          </g-field>
          <g-field label="持续时间">
            <g-input-number
              v-model="com.animate.direction"
              :min="0"
            />
          </g-field>
          <g-field label="延迟时间">
            <g-input-number
              v-model="com.animate.delay"
              :min="0"
            />
          </g-field>
          <g-field label="重复次数">
            <g-input-number
              v-model="com.animate.repeat"
              :min="0"
              label="设置为0时表示无数次"
            />
          </g-field>
        </g-field-collapse>
        <g-field label="应用3D变换">
          <n-switch v-model:value="com.attr.apply3d" />
        </g-field>
        <g-field label="显示为弹窗">
          <n-switch v-model:value="com.isDialog" />
          <n-button @click="handPreview(com)">预览</n-button>
        </g-field>
        <template v-if="com.attr.apply3d">
          <g-field-collapse
            label="3D变换"
            mode="layout"
            default-layout="horizontal"
            :features="['vertical', 'horizontal']"
            :list="groupConfig"
            :min="0"
            :max="5"
            :tab="getTabLabel"
          >
            <template #default="{ item }">
              <g-field :level="2" label="旋转" :is-flat="true">
                <g-select
                  v-model="item.transform3d.rotate3d.axis"
                  :data="rotateAxis"
                  inline="inline-single"
                  label="旋转轴"
                />
                <g-slider
                  v-model="item.transform3d.rotate3d.deg"
                  :min="-180"
                  :max="180"
                  :step="1"
                  inline="inline-single"
                  label="度数"
                  suffix="°"
                />
              </g-field>
              <g-field :level="2" label="缩放" :is-flat="true">
                <g-input-number
                  v-model="item.transform3d.scale3d.x"
                  :min="0.1"
                  :max="10"
                  :step="0.01"
                  inline
                  label="x轴"
                  @update:modelValue="(n, o) => updateScale3dX(n, o, item)"
                />
                <g-input-number
                  v-model="item.transform3d.scale3d.y"
                  :min="0.1"
                  :max="10"
                  :step="0.01"
                  inline
                  label="y轴"
                  @update:modelValue="(n, o) => updateScale3dY(n, o, item)"
                />
                <g-switch
                  v-model="item.transform3d.scale3d.lock"
                  inline="inline-single"
                  label="比例锁定"
                />
              </g-field>
              <g-field :level="2" label="平移" :is-flat="true">
                <g-input-number
                  v-model="item.transform3d.translate3d.x"
                  inline
                  label="x轴"
                />
                <g-input-number
                  v-model="item.transform3d.translate3d.y"
                  inline
                  label="y轴"
                />
                <g-input-number
                  v-model="item.transform3d.translate3d.z"
                  inline="inline-single"
                  label="z轴"
                />
              </g-field>
            </template>
          </g-field-collapse>
          <g-field label="透视距离">
            <g-input-number
              v-model="com.attr.perspective"
              :min="1"
              suffix="px"
            />
          </g-field>
          <g-field label="消失点位置" tooltip="透视投影中，一组平行线的交点。">
            <div class="perspective-origin-container">
              <div class="layer-setting-touchpad">
                <span
                  v-for="(item, idx) in touchpadHandlers"
                  :key="idx"
                  class="layer-setting-touchpad-handler"
                  :style="{
                    left: `${item[0]}%`,
                    top: `${item[1]}%`
                  }"
                  @click="handlePointer(item)"
                ></span>
                <span
                  class="layer-setting-touchpad-handler --pointer"
                  :style="{
                    left: `${com.attr.perspectiveOrigin.x}%`,
                    top: `${com.attr.perspectiveOrigin.y}%`
                  }"
                ></span>
              </div>
              <g-input-number
                v-model="com.attr.perspectiveOrigin.x"
                :min="0"
                :max="100"
                prefix="x"
                suffix="%"
                class="datav-gui-stepper stepper-x"
              />
              <g-input-number
                v-model="com.attr.perspectiveOrigin.y"
                :min="0"
                :max="100"
                prefix="y"
                suffix="%"
                class="datav-gui-stepper"
              />
            </div>
          </g-field>
        </template>
        <template v-if="com.isDialog">
          <el-tabs
            key="cardleft"
            tab-position="left"
            type="card"
          >
            <el-tab-pane label="弹窗" tab="dialog">
              <g-field :level="2" label="尺寸">
                <g-input-number
                  v-model="com.dialog.width"
                  inline
                  label="宽"
                  :min="0"
                  suffix="px"
                />
                <g-input-number
                  v-model="com.dialog.height"
                  inline
                  label="高"
                  :min="0"
                  suffix="px"
                />
              </g-field>
            </el-tab-pane>

            <el-tab-pane label="弹窗头部" tab="header">
              <g-field :level="2" label="高度">
                <g-input-number
                  v-model="com.dialog.header.height"
                  suffix="px"
                />
              </g-field>
              <g-field :level="2" label="背景">
                <g-color-picker v-model="com.dialog.header.background" allow-img />
              </g-field>
            </el-tab-pane>
            <el-tab-pane label="弹窗标题" tab="title">
              <g-field-collapse
                v-model="com.dialog.title.show"
                toggle
                :level="2"
                label="显示标题"
              >
                <g-field :level="2" label="标题">
                  <g-input v-model="com.dialog.title.text" />
                </g-field>
                <g-field :level="2" label="字体">
                  <GChartFontConfig :config="com.dialog.title" />
                </g-field>
              </g-field-collapse>
            </el-tab-pane>
            <el-tab-pane label="关闭图标" tab="close">
              <g-field-collapse
                v-model="com.dialog.close.show"
                toggle
                :level="2"
                label="显示图标"
              >
                <g-field :level="2" label="颜色">
                  <g-color-picker v-model="com.dialog.close.color" allow-img />
                </g-field>
              </g-field-collapse>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ComputedRef, computed, resolveComponent } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { } from '@/icons'
import { comInjectionKey } from './config'
import { DatavGroup, GroupConfig } from '@/components/_internal/group'
import { useDialog } from 'naive-ui'
import DatavTransformLayer from '../canvas-main/datav-transform/transform-layer.vue'

const com = inject(comInjectionKey) as ComputedRef<DatavGroup>

const touchpadHandlers = [
  [0, 0], [50, 0], [100, 0],
  [0, 50], [50, 50], [100, 50],
  [0, 100], [50, 100], [100, 100],
]

const rotateAxis = [
  { id: 'x', value: 'x轴' },
  { id: 'y', value: 'y轴' },
  { id: 'z', value: 'z轴' },
]

const groupConfig = computed(() => [...com.value.config].reverse())

const updateWidth = (val: number) => {
  com.value.attr.w = val
}

const updateHeight = (val: number) => {
  com.value.attr.h = val
}

const getTabLabel = (item: GroupConfig) => {
  const c = com.value.children.find(m => m.id === item.transform3d.id)
  return c?.alias
}

const handlePointer = (item: number[]) => {
  com.value.attr.perspectiveOrigin.x = item[0]
  com.value.attr.perspectiveOrigin.y = item[1]
}

const updateScale3dX = (val: number, oldVal: number, item: GroupConfig) => {
  if (item.transform3d.scale3d.lock) {
    const v = item.transform3d.scale3d.y + val - oldVal
    item.transform3d.scale3d.y = +Math.max(Math.min(v, 10), 0.1).toFixed(2)
  }
}

const updateScale3dY = (val: number, oldVal: number, item: GroupConfig) => {
  if (item.transform3d.scale3d.lock) {
    const v = item.transform3d.scale3d.x + val - oldVal
    item.transform3d.scale3d.x = +Math.max(Math.min(v, 10), 0.1).toFixed(2)
  }
}

const dialog = useDialog()
const handPreview = com => {
  dialog.info({
    title: '预览',
    class: 'render-v-modal_d1',
    style: `width: ${com.dialog.width}px; height: ${com.dialog.height}px;`,
    content: () => h('div', com.children.map(co=>h(DatavTransformLayer, {
      com: co,
      parentCom: com,
      editable: false,
    }, {
      default: () => h(resolveComponent(co.name), {
        com: co,
        style:{
          transform: 'translateZ(0)',
          opacity: co.attr.opacity,
        },
      }),
    }))),
  })
}

const animates = GlAnimationEasings
const animatecss = GlAnimatecss
const easings = GlEasing
const repeatTypes = GlRepeatTypes
</script>

<style lang="scss" scoped>
@import './config.scss';

.layer-setting-panel {
  position: absolute;
  top: 30px;
  bottom: 72px;
  width: 100%;
  background: var(--datav-gui-bgcolor-front);
  overflow-y: scroll;
}

.perspective-origin-container {
  position: relative;

  .layer-setting-touchpad {
    position: relative;
    left: 3px;
    width: 88px;
    height: 56px;
    border: 1px solid rgb(75 75 75 / 50%);
    background: rgb(0 0 0 / 40%);

    .layer-setting-touchpad-handler {
      display: block;
      width: 6px;
      height: 6px;
      border: 1px solid #a1aeb3;
      background: #181c21;
      transform: translate(-50%, -50%);
      position: absolute;
      cursor: pointer;

      &.--pointer {
        width: 10px;
        height: 10px;
        border: 2px solid #fff;
        background: var(--datav-main-hover-color);
      }
    }
  }

  .datav-gui-stepper {
    width: 92px;
    position: absolute;
    left: 100px;
    top: 32px;
  }

  .stepper-x {
    top: 0;
  }
}
</style>
