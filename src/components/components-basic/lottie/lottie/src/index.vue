<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-19 10:33:14
 * @LastEditTime : 2024-01-19 11:17:39
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <IkingLottie
      :animation-data="animationData"
      :assets-path="assetsPath"
      width="100%"
      height="100%"
      :auto-play="config.autoPlay"
      :loop="config.loop"
      :delay="config.delay"
      :direction="config.direction"
      :no-margin="config.noMargin"
      :scale="config.scale"
      :speed="config.speed"
    />
  </div>
</template>

<script lang='ts' setup>
import { computed, ref, toRef, watch } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { Lottie } from './lottie'
import { Vue3Lottie as IkingLottie } from 'vue3-lottie'

const props = defineProps<{
  com: Lottie
}>()

const apiStore = useApiStore()
useDataCenter(props.com)

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const { setUrl } = useEnvUrl()
const assetsPath = computed(() => setUrl(config.value.assetsPath))
const animationData = ref('')
watch(() => config.value.assetsPath, path => {
  fetch(setUrl(path)).then(res => {
    res.json().then(data => {
      animationData.value = data
    })
  })
}, { immediate: true })

const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
</script>
