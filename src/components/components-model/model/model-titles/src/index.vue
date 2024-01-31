<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-13 18:12:02
 * @LastEditTime : 2024-01-11 11:13:25
-->
<script setup lang="ts" name="ModelTitles">
import { defineComponent, PropType, computed, toRef } from 'vue'
import * as mars3d from 'mars3d'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { createTitleModel } from '../utils/create-titles'
import '../utils/billboard'
import { setModel } from '../../utils/set-model'
import { setMapOptions, changeTitles3D } from '../../utils/use-map-option'
import { ikMitt, _ } from 'iking-utils'
import { map } from '@/data/components/map'

const props = defineProps({
  com: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
})

const apiStore = useApiStore()
const eventStore = useEventStore()
useDataCenter(props.com)

const dv_data = computed(() => {
  return apiStore.dataMap[props.com.id]?.source ?? []
})

const dv_field = computed(() => {
  return getFieldMap(props.com.apis.source.fields)
})

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')

const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w}px`,
    height: `${attr.value.h}px`,
  }
})
let titlesLayer: any = null
let graphicLayer: any = null
let _map

const handLoaded = (map: any) => {
  _map = map
  useMarsLineFlow(_map, 500, [117.092121, 117.097145], [31.813883, 31.817876])

  titlesLayer = changeTitles3D(_map, config.value.global.model)
  _map.addLayer(titlesLayer)
  // divLayer = createDivLayer(_map, dv_data.value)
  // _map.addLayer(divLayer)

  setModel(_map, config.value)

  // _map.basemap.show = false

  // 创建DIV数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  _map.addLayer(graphicLayer)

  // 随机更新文本
  setInterval(() => {
    try {
      graphicLayer.eachGraphic(graphic => {
        graphic.text = random(0, 100) // 更新文本
      })
    } catch (error) {

    }
  }, 2000)

  ikMitt.on('mars-titles-change', map => {
    setModel(_map, config.value)
  })
}
const handClick = e => {

  if (e.graphic?.text) {
    e.graphic.text = random(0, 100)
  }
  // e.graphic._updateCanvas({
  //   ...e.graphic.options,
  //   style: {
  //     ...e.graphic.options.style,
  //     imageUrl: 'images/nav-menu-img.png',
  //   },
  // })

  eventStore.handleSubVariablesChange(
    props.com,
    'click',
    {
      map: _map,
      e,
      graphic: e.graphic,
    })
}

const handDbClick = e => {
  eventStore.handleSubVariablesChange(
    props.com,
    'dbclick',
    {
      map: _map,
      e,
      graphic: e.graphic,
    })
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const addGraphic = item => {
  const entry = new mars3d.graphic.CanvasBillboard({
    position: item[dv_field.value.z],
    name: item[dv_field.value.x],
    data: item,
    style: {
      text: item[dv_field.value.y],
      horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new mars3d.Cesium.NearFarScalar(800, 0.4, 1200, 0.2),
      distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(0, 10000),
    },
  })

  
  return entry

  // return new mars3d.graphic.DivGraphic({
  //   position: item[dv_field.value.z],
  //   name: item[dv_field.value.x],
  //   data: item,
  //   pointerEvents: true,
  //   style: {
  //     html: `<div style="backgroundImage: url('images/nav-menu-img.png');" >
  //       <p>${item[dv_field.value.x]}</p>
  //       <p>${item[dv_field.value.y]}</p>
  //       </div>`,
  //     horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
  //     verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
  //   },
  //   attr: { remark: '示例6' },
  // })
}

const graphicArr = []
watch(
  () => dv_data.value,
  val => {
    if (val) {
      for (let item of val) {
        let graphic
        if (graphicLayer.graphics?.length) {
          const gr = graphicLayer.graphics.find(g => g.name === item[dv_field.value.x])
          if (gr) {
            gr.position = item[dv_field.value.z]
            gr.style = {
              text: item[dv_field.value.y],
              horizontalOrigin: mars3d.Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: mars3d.Cesium.VerticalOrigin.BOTTOM,
              scaleByDistance: new mars3d.Cesium.NearFarScalar(800, 0.4, 1200, 0.2),
              distanceDisplayCondition: new mars3d.Cesium.DistanceDisplayCondition(0, 10000),
            }
          } else {
            graphicLayer?.addGraphic(addGraphic(item))
          }
        } else {
          graphicLayer?.addGraphic(addGraphic(item))
        }
      }

      // graphicLayer.eachGraphic(graphic => {
      //   console.log('graphic: ', graphic)
      //   _map.setCameraView(graphic.position)
      // })
      let num = 0
      const len = graphicLayer.graphics.length
      // setInterval(() => {
      //   _map.flyToGraphic(graphicLayer.graphics[num], {
      //     maxHeight: 200,
      //   })
      //   num++
      //   if(num > len) num = 0
      // }, 5000)
    }
  },
  { deep: true },
)

watch(
  () => config.value.scene.center,
  val => {
    _map.setCameraView(val)
  },
)

watch(
  () => config.value.effect,
  val => {
    _map && setModel(_map, config.value)
  },
  { deep: true },
)

watch(() => config.value.scene, val => {
  setMapOptions(_map, val)
}, { deep: true })

watch(() => config.value.global.model.url, val => {
  if (val) {
    changeTitles3D(_map, config.value.global.model)
  }
})

const { maskDiv, addMask, removeMask, updateMask } = useMask(config.value.mask.backgroundImage)
watch(
  () => config.value.mask,
  val => {
    if (!val.show) {
      removeMask()
    } else {
      addMask()
      updateMask(setChartColor(val.backgroundImage))
    }
  },
)

ikMitt.on('mar-title-open', () => {
  ikMitt.emit('mars-title-map', _map)
})

onMounted(() => {
  // if (config.value.mask.show) {
  //   addMask()
  // } else {
  //   removeMask()
  // }
})
</script>

<template>
  <GlMarSMap
    ref="refMap"
    :options="config"
    :style="wrapperStyle"
    @onload="handLoaded"
    @onclick="handClick"
    @ondblclick="handDbClick"
  />
</template>

<style lang="scss"></style>
