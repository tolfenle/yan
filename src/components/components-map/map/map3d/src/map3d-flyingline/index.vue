<template>
  <div></div>
</template>

<script lang='ts' setup>
import { useDataCenter } from '@/components/_mixins/use-data-center'
import { Map3dFlyingline } from './index'

const props = defineProps<{
  com: Map3dFlyingline
}>()

useDataCenter(props.com)
</script>
