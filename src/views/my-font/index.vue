<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-28 10:35:00
 * @LastEditTime : 2023-11-28 10:41:08
-->
<template>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { IconTutorial } from '@/icons'

export default defineComponent({
  name: 'MyCase',
  components: {
    IconTutorial,
  },
  setup() {
    const nMessage = useMessage()

    onMounted(() => {
      nMessage.warning('建设中。。。')
    })
  },
})
</script>
