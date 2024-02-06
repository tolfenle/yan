<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-04 11:12:20
 * @LastEditTime : 2024-02-06 11:13:36
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
  item: {
    type: Object,
    default: () => ({}),
  },
})
const oldValue = ref(0)
watch(() => props.num, (newVal, oldVal) => {
  oldValue.value = oldVal
})

const refNumber = ref(null)

watch(() => refNumber.value, val => {
  if (val) {
    useLoopAnimation(props.item.animation, val)
  }
})

</script>

<template>
  <p v-bind="$attrs" style="padding: 0;margin: 0;">
    <span>{{ item.prefix }} </span>
    <NNumberAnimation
      ref="refNumber"
      :active="item.animation?.active"
      :precision="item.animation?.precision"
      :duration="item.animation?.duration"
      :show-separator="item.animation?.showSeparator"
      :from="fromZero ? 0 : oldValue"
      :to="num"
    />
    <span> {{ item.suffix }}</span>
  </p>
</template>
