<template>
  <div></div>
</template>

<script lang='ts' setup>
import { useDataCenter } from '@/components/_mixins/use-data-center'
import { ThreeBar } from './index'

const props = defineProps<{
  com: ThreeBar
}>()

useDataCenter(props.com)
</script>
