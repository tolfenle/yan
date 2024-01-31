<template>
  <div></div>
</template>

<script lang='ts' setup>
import { useDataCenter } from '@/components/_mixins/use-data-center'
import { ThreePoint } from './index'

const props = defineProps<{
  com: ThreePoint
}>()

useDataCenter(props.com)
</script>
