<script lang="ts" setup name="GlMapArea">
// import AMapLoader from '@amap/amap-jsapi-loader'
import { ElDialog } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

// const handOpend = async () => {
//   AMapLoader.load({
//     key: 'a24d1de2b30601cff1dfe7c6daefea31', //申请好的 Web 端开发者 Key，首次调用 load 时必填
//     version: '2.0', //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
//     plugins: ['AMap.Scale'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
//   })
//     .then(AMap => {
//       const map = new AMap.Map('amap-area', {
//         zoom: 11, // 初始化地图级别
//         center: [116.397428, 39.90923], // 初始化地图中心点位置
//       }) //"container"为 <div> 容器的 id
//       map.on('click', function (ev) {
//         //触发事件的对象
//         var target = ev.target
//         //触发事件的地理坐标，AMap.LngLat 类型
//         var lnglat = ev.lnglat
//         //触发事件的像素坐标，AMap.Pixel 类型
//         var pixel = ev.pixel
//         //触发事件类型
//         var type = ev.type
//       })
//     })
//     .catch(e => {
//       console.log(e)
//     })
// }
const emits = defineEmits(['update:modelValue'])
const showModal = toRef(props, 'modelValue')

watch(() => props.modelValue, val => {
  showModal.value = val
})

const handCancle = () => {
  showModal.value = false
  emits('update:modelValue', false)
}
const handConfime = () => {
  handCancle()
}
</script>

<template>
  <el-dialog
    v-model="showModal"
    title="选择地图范围"
    append-to-body
    align-center
    custom-class="iking-amap-area"
  >
    <div id="amap-area">
      <iframe src="http://datav.aliyun.com/portal/school/atlas/area_selector"></iframe>
    </div>
  </el-dialog>
</template>

<style lang="scss" scopde>
.iking-amap-area {
  height: 93vh;
  width: 83vw;

  .el-dialog__header {
  }

  .el-dialog__body {
    height: 673px;
    width: 100%;
    color: #e9e9e9;
    padding: 0;

    #amap-area {
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;

      iframe {
        height: 884px;
        width: 102%;
        position: absolute;
        top: -139px;
        right: -26px;
        overflow: hidden;
      }
    }
  }

  .el-dialog__footer {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
