<template>
  <div :id="uid" class="mars3d-container" v-bind="$attrs"></div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, onMounted } from 'vue'
import * as mars3d from 'mars3d'
import 'mars3d-cesium/Build/Cesium/Widgets/widgets.css'
import 'mars3d/dist/mars3d.css'

import { buildUUID } from 'iking-utils'

const props = withDefaults(
  defineProps<{
    url: string
    mapKey?: string
    options?: any
  }>(),
  {
    url: '',
    mapKey: 'default',
    options: () => ({}),
  },
)

const uid = buildUUID()

// 用于存放地球组件实例
let map: mars3d.Map // 地图对象
const emit = defineEmits(['onload', 'onclick', 'ondblclick'])

const { setUrl } = useEnvUrl()

const initMars3d = (option: any) => {
  map = new mars3d.Map(uid, {
    ...option,
    scene:{
      ...option.scene,
      contextOptions: { webgl: { alpha: true } }, // 允许透明，只能Map初始化传入 [关键代码]
    },
  })

  // //如果有xyz传参，进行定位
  // const lat = getQueryString("lat")
  // const lng = getQueryString("lng")
  // if (lat && lng) {
  //   map.flyToPoint(new mars3d.LngLatPoint(lng, lat), { duration: 0 })
  // }

  // 开场动画
  // map.openFlyAnimation();

  // 针对不同终端的优化配置
  if (mars3d.Util.isPCBroswer()) {
    map.zoomFactor = 2.0 // 鼠标滚轮放大的步长参数

    // IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
      map.viewer.targetFrameRate = 20 // 限制帧率
      map.scene.requestRenderMode = false // 取消实时渲染
    }
  } else {
    map.zoomFactor = 5.0 // 鼠标滚轮放大的步长参数

    // 移动设备上禁掉以下几个选项，可以相对更加流畅
    map.scene.requestRenderMode = false // 取消实时渲染
    map.scene.fog.enabled = false
    map.scene.skyAtmosphere.show = false
    map.scene.globe.showGroundAtmosphere = false
  }

  // //二三维切换不用动画
  if (map.viewer.sceneModePicker) {
    map.viewer.sceneModePicker.viewModel.duration = 0.0
  }

  // webgl渲染失败后，刷新页面
  map.on(mars3d.EventType.renderError, async () => {
    window.location.reload()
  })

  // map构造完成后的一些处理
  onMapLoad()

  emit('onload', map)
  // 设置鼠标操作习惯,更换中键和右键
  map.changeMouseModel(true)

  map.on(mars3d.EventType.click, e => {
    emit('onclick', e)
  })
  map.on(mars3d.EventType.dblClick, e => {
    emit('ondblclick', e)
  })
}

// map构造完成后的一些处理
function onMapLoad() {
  // // Mars3D地图内部使用，如右键菜单弹窗
  // // @ts-ignore
  // window.globalAlert = $alert
  // // @ts-ignore
  // window.globalMsg = $message

  // // 用于 config.json 中 西藏垭口 图层的详情按钮 演示
  // // @ts-ignore
  // window.showPopupDetails = (item: any) => {
  //   $alert(item.NAME)
  // }
  map.container.style.backgroundImage = `url(${setUrl(props.options.global.backgroundImg)})`
  // map.setCameraView(props.options.scene.center)
}

onMounted(() => {
  initMars3d(props.options)
})
// 组件卸载之前销毁mars3d实例
onUnmounted(() => {
  if (map) {
    map.destroy()
    map = null
  }
  console.info('map销毁完成', map)
})

defineExpose([map])
</script>

<style lang="scss" scoped>
.mars3d-container {
  width: 100%;
  height: 100%;

  :deep(.cesium-viewer) {
    width: 100%;
    height: 100%;

    .cesium-widget,
    .cesium-viewer-cesiumWidgetContainer {
      width: 100%;
      height: 100%;

      canvas {
        width: 100%;
        height: 100%;
      }
    }

    .cesium-viewer-toolbar {
      top: 12px;
      right: 13px;

      .cesium-toolbar-button {
        display: block !important;
      }
    }
  }
}
</style>
