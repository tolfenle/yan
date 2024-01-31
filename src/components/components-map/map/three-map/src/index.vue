<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <gl-three-map v-if="showMap" :config="config" :bar-data="barData" />
  </div>
  <div class="subcoms-box">
    <component
      :is="sc.name"
      v-for="sc in subComs"
      :key="sc.id"
      :com="sc"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef } from 'vue'
import { groupBy } from 'lodash-es'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import { useEventStore } from '@/store/event'
import { ThreeMap } from './three-map'
import { ikMitt } from 'iking-utils'
import { DatavEChartsComponent } from '@/components/_models/datav-component'
import { useComStore } from '@/store/com'
import ThreeBar from './three-bar'
import { loadSubComs } from '@/components/_utils/component-util'

export default defineComponent({
  name: 'VThreeMap',
  props: {
    com: {
      type: Object as PropType<ThreeMap>,
      required: true,
    },
  },
  setup(props) {
    const apiStore = useApiStore()
    const comStore = useComStore()
    const eventStore = useEventStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const barConfig = computed(() => {
      return subComs.value.find(v => v.name === 'VThreeBar') || {}
    })
    const config = computed(() => {
      return {
        ...props.com.config,
        barConfig: barConfig.value,
      }
    })
    const attr = toRef(props.com, 'attr')

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const chartData = computed(() => {
      const groups = groupBy(dv_data.value, item => item[dv_field.value.x])
      return {
        keys: Object.keys(groups),
        values: Object.values(groups),
      }
    })

    const subComs = computed<DatavEChartsComponent[]>(() => {
      return comStore.subComs.filter(c => c.parentId === props.com.id && !c.hided)
    })

    const getSubComData = (comId: string) => {
      return apiStore.dataMap[comId]?.source ?? []
    }

    const getSubComField = (com: DatavEChartsComponent) => {
      return getFieldMap(com.apis.source.fields)
    }

    const barData = computed(() => {
      const sub = subComs.value.find(v => v.name === 'VThreeBar')
      if (!sub) return []
      const field = getSubComField(sub)
      const data = getSubComData(sub.id)
      return data.map(da => {
        return {
          name: da[field.name],
          adcode: da[field.adcode],
          value: da[field.value],
          lonlat: da[field.lonlat],
        }
      })
    })

    const option = computed(() => {
      const { generate } = config.value
      const opts = {
      }
      return opts as any
    })

    const onClick = (params: any) => {
      eventStore.handleSubVariablesChange(
        props.com,
        'click',
        {
          ...params,
          ...params.data.dataRef,
        })
    }

    const onDbClick = (params: any) => {
      eventStore.handleSubVariablesChange(
        props.com,
        'dbclick',
        {
          ...params,
          ...params.data.dataRef,
        })
    }

    const showMap = ref(true)
    const configType = ref(config.value.generate.configType)
    watch(() => config.value, val => {
      if (val) {
        if (val.generate.configType !== configType.value) {
          configType.value = val.generate.configType
          return
        }
        showMap.value = false
        nextTick(() => {
          showMap.value = true
        })
      }
    }, { deep: true })

    ikMitt.on('hand-camera', val => {
      config.value.generate.position = val.position
      // config.value.generate.up = val.rotation
    })

    return {
      subComs,
      barData,
      showMap,
      wrapperStyle,
      option,
      config,
      onClick,
      onDbClick,
    }
  },
})
</script>
