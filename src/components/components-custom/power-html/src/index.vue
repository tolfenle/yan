<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-26 17:08:44
 * @LastEditTime : 2024-01-26 17:45:26
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle" v-html="formatHtml">
  </div>
</template>

<script lang='ts' setup>
import { computed, toRef } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { PowerHtml } from './power-html'

const props = defineProps<{
  com: PowerHtml
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? {}
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})

const formatHtml = computed(() => {
  const func = new Function('com, data', `${config.value.html}`)
  const html = func(props.com, dv_data.value)
  console.log('html: ', html)
  return html
})

</script>
