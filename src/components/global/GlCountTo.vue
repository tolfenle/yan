<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-04 11:12:20
 * @LastEditTime : 2023-12-05 12:08:48
-->
<script setup lang="ts" name="GlCountTO">
import { NNumberAnimation } from 'naive-ui'
const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  fromZero: {
    type: Boolean,
    default: false,
  },
})

const oldValue = ref(0)
watch(() => props.num, (newVal, oldVal) => {
  oldValue.value = oldVal
})

</script>

<template>
  <span v-bind="$attrs">
    <NNumberAnimation :from="fromZero ? 0 : oldValue" :to="num" />
  </span>
</template>
