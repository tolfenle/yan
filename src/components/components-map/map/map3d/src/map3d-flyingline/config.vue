<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-11 12:02:25
 * @LastEditTime : 2023-12-11 15:49:59
-->
<script lang="ts" setup>
import { toRef } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { Map3dFlyingline } from './index'

const props = defineProps<{
  com: Map3dFlyingline
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
    <el-tab-pane label="全局" tab="map">
      12312
    </el-tab-pane>
    <el-tab-pane label="飞线" tab="map">
      12312
    </el-tab-pane>
  </el-tabs>
</template>
