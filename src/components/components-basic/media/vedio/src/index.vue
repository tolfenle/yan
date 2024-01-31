<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-07-20 16:39:20
 * @LastEditTime: 2022-09-13 10:26:37
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div :id="com.id" :style="wrapperStyle"></div>
  </div>
</template>

<script lang="ts">
import { getFieldMap, useDataCenter } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, PropType, toRef, watch } from 'vue'
import { SimplePlayer, I18N } from 'xgplayer'
// 引入es目录下的插件
import Start from 'xgplayer/es/plugins/start'
import PC from 'xgplayer/es/plugins/pc'
import Mobile from 'xgplayer/es/plugins/mobile'
import Progress from 'xgplayer/es/plugins/progress'
import Time from 'xgplayer/es/plugins/time'
import Play from 'xgplayer/es/plugins/play'
import Error from 'xgplayer/es/plugins/error'
import Volume from 'xgplayer/es/plugins/volume'
import ZH from 'xgplayer/es/lang/zh-cn'
import { Vedio } from './vedio'

// 启用中文
I18N.use(ZH)

export default defineComponent({
  name: 'VVedio',
  props: {
    com: {
      type: Object as PropType<Vedio>,
      required: true,
    },
  },
  setup(props) {

    const apiStore = useApiStore()
    useDataCenter(props.com)

    let player: any = null
    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      player && player.reload()
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    watch(
      () => config.value,
      newVal => {
        if (player) {
          player.config = {
            ...player.config,
            ...newVal,
          }
          player.reload()
        }
      },
      { deep: true },
    )
    const { setUrl } = useEnvUrl()
    const createPlayer = () => {
      try {
        if (player) player.destroy(false)
        player = new SimplePlayer({
          id: props.com.id,
          controlPlugins: [Start,PC,Mobile, Progress, Play, Time, Error, Volume],
          ...config.value,
          width: attr.value.w,
          height: attr.value.h,
          poster: setUrl(config.value.poster),
          src: setUrl(dv_data.value[dv_field.value.url] || config.value.url),
          url: setUrl(dv_data.value[dv_field.value.url] || config.value.url),
          autoplayMuted: config.value.autoplay,
        } as any)
      } catch (error) {
        console.info('error: ', error)
      }
    }

    onMounted(() => {
      createPlayer()
    })

    onBeforeUnmount(() => {
      player?.destroy()
      player = null
    })

    return {
      wrapperStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.xgplayer-skin-default) {
  background: transparent;
}

.datav-wrapper {
  :deep(.xgplayer) {
    padding-top: 0 !important;
    height: 100% !important;
    width: 100% !important;

    video {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
