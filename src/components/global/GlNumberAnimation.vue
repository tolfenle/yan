<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-23 18:29:07
 * @LastEditTime : 2024-01-11 17:43:15
-->
<script lang='ts'>
import { defineComponent } from 'vue'
import { NNumberAnimation } from 'naive-ui'
import { buildUUID } from 'iking-utils'

export default defineComponent({
  name: 'GlNumberAnimation',
  components: {
    NNumberAnimation,
  },
  props: {
    animation: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const refNumber = ref(null)

    watch(() => refNumber.value, val => {
      if (val) {
        useLoopAnimation(props.animation, val)
      }
    })

    return {
      refNumber,
    }
  },
})
</script>

<template>
  <NNumberAnimation
    ref="refNumber"
    :from="animation.loop ? 0 : item.oldCount"
    :to="item.count"
    :active="animation.active"
    :duration="animation.duration"
    :show-separator="animation.showSeparator"
    :precision="animation.precision"
  />
</template>
