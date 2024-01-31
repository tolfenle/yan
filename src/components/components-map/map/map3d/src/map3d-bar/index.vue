<template>
  <div></div>
</template>

<script lang='ts' setup>
import { useDataCenter } from '@/components/_mixins/use-data-center'
import { Map3dBar } from './index'

const props = defineProps<{
  com: Map3dBar
}>()

useDataCenter(props.com)
</script>
