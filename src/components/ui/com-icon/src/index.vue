<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:01
 * @LastEditTime : 2023-12-14 13:37:37
-->
<template>
  <n-icon>
    <IconChart v-if="icon === 'v-icon-chart'" />
    <IconChartBar v-else-if="icon === 'v-icon-chart-bar'" />
    <IconChartLine v-else-if="icon === 'v-icon-chart-line'" />
    <IconChartPie v-else-if="icon === 'v-icon-chart-pie'" />
    <IconRelation v-else-if="icon === 'v-icon-relation'" />
    <IconMap v-else-if="icon === 'v-icon-map'" />
    <IconTitle v-else-if="icon === 'v-icon-title'" />
    <IconInteract v-else-if="icon === 'v-icon-interact'" />
    <IconMaterial v-else-if="icon === 'v-icon-material'" />
    <IconComInfo v-else-if="icon === 'v-icon-com-info'" />
    <IconTable v-else-if="icon === 'v-icon-table'" />
    <IconMedia v-else-if="icon === 'v-icon-media'" />
    <IconOther v-else-if="icon === 'v-icon-other'" />
    <IconViewGrid v-else-if="icon === 'v-icon-view-grid'" />
    <IconFavorite v-else-if="icon === 'v-icon-favorite'" />
    <IconModel v-else-if="icon === 'v-icon-model'" />
    <IconHelp v-else />
  </n-icon>
</template>

<script lang='ts' setup>
import { NIcon } from 'naive-ui'
import {
  IconHelp,
  IconViewGrid,
  IconFavorite,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconRelation,
  IconOther,
  IconMap,
  IconTitle,
  IconInteract,
  IconMaterial,
  IconChart,
  IconComInfo,
  IconTable,
  IconMedia,
  IconModel,
} from '@/icons'

defineProps<{
  icon: string
}>()
</script>
