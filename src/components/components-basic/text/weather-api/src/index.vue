<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-27 14:50:42
 * @LastEditTime : 2023-11-21 12:14:08
-->
<template>
  <div class="datav-wrapper" :style="wrapperStyle">
    <div v-loading="loading" class="importent-info" :style="weatherStyle">
      <template v-if="weatherInfo">
        <i v-if="config.icon.show" :class="`qi-${weatherInfo?.icon}`" :style="iconStyle"></i>
        <div class="status">{{ config.api.now ? weatherInfo?.text : weatherInfo?.textDay }}</div>
        <div v-if="!config.api.now" class="temolate">
          {{ weatherInfo?.tempMin || '-' }}°C ~ {{ weatherInfo?.tempMax || '-' }}°C
        </div>
        <div v-else class="temolate">
          {{ weatherInfo?.temp || '-' }}°C
        </div>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, toRef, watch, ref } from 'vue'
import { useDataCenter, getFieldMap } from '@/components/_mixins/use-data-center'
import { useApiStore } from '@/store/api'
import axios from 'axios'
import { WeatherApi } from './weather-api'

const LOCAL_ITEM_NAME = 'weather-api-info'

export default defineComponent({
  name: 'VWeatherApi',
  props: {
    com: {
      type: Object as PropType<WeatherApi>,
      required: true,
    },
  },
  setup(props) {

    const apiStore = useApiStore()
    useDataCenter(props.com)

    const dv_data = computed(() => {
      return apiStore.dataMap[props.com.id]?.source ?? []
    })

    const dv_field = computed(() => {
      return getFieldMap(props.com.apis.source.fields)
    })

    const config = toRef(props.com, 'config')
    const attr = toRef(props.com, 'attr')

    const weatherInfo = ref(null)
    const loading = ref(false)
    const getWeatherInfo = async () => {
      loading.value = true
      const { api } = config.value
      try {
        const res = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${api.key}&location=${dv_data.value[dv_field.value.city]}&adm=${dv_data.value[dv_field.value.province]}`)
        if (res.status === 200) {
          if (Number(res.data.code) === 200) {
            const resc = !api?.now ? await axios.get(`https://devapi.qweather.com/v7/weather/3d?key=${api.key}&location=${res.data.location[0].id}`) : await axios.get(`https://devapi.qweather.com/v7/weather/now?key=${api.key}&location=${res.data.location[0].id}`)
            if (resc.status === 200) {
              if (Number(resc.data.code) === 200) {
                weatherInfo.value = {
                  ...(api?.now ? resc.data.now : resc.data.daily?.[0]),
                  icon: api?.now ? resc.data.now.icon : resc.data.daily?.[0]?.iconDay, //`${config.value.icon.path}${resc.data.daily?.[0]?.iconDay}.png?key=${api.key}`,
                }
              }
              try {
                localStorage.setItem(LOCAL_ITEM_NAME, JSON.stringify(weatherInfo.value))
              } catch (error) {

              }
            } else {
              weatherInfo.value = JSON.parse(localStorage.getItem(LOCAL_ITEM_NAME) || '{}')
            }
          }
        } else {
          weatherInfo.value = JSON.parse(localStorage.getItem(LOCAL_ITEM_NAME) || '{}')
        }
        loading.value = false
      } catch (error) {
        loading.value = false
      }
    }
    watch(() => config.value.api.now, () => {
      getWeatherInfo()
    })

    watch(() => dv_data.value, val => {
      if (val) {
        getWeatherInfo()
      }
    },{ deep: true })

    const wrapperStyle = computed(() => {
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
      }
    })

    const weatherStyle = computed(() => {
      const { font } = config.value
      return {
        ...font,
        fontSize: `${font.fontSize}px`,
        color: setChartColor(config.value.font?.color),
      } as any
    })

    const iconStyle = computed(() => {
      const { icon, font } = config.value
      return {
        fontFamily: font.fontFamily,
        fontSize: `${icon.size}px`,
        color: setChartColor(icon.colorBy ? font.color : icon.color),
      } as any
    })

    return {
      wrapperStyle,
      weatherStyle,
      iconStyle,
      weatherInfo,
      config,
      loading,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "./qweather-icons.css";

.importent-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
