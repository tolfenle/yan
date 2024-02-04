/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-02-04 13:39:34
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import i18n from '@/locales'
import NaiveUI from '@/components/naive-ui'
import GUI from '@/components/ui'
import '@/styles/index.scss'
import ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'animate.css'
import 'swiper/css/bundle'
import Highcharts from 'highcharts'
import Highcharts3D from 'highcharts/highcharts-3d'
import HighchartsVue from 'highcharts-vue'
import Vue3Lazyload from 'vue3-lazyload'

import DatavCharts from '@/components'
import router from './routes'
import App from './App.vue'

Highcharts3D(Highcharts)

const app = createApp(App)
app.use(i18n)
app.use(NaiveUI)
app.use(GUI)
app.use(DatavCharts)
app.use(createPinia())
app.use(router)
app.use(ColorPicker)
app.use(HighchartsVue, { tagName: 'HightchartsVue' })
app.use(Vue3Lazyload, {
  loading: '', // 加载中的占位图
  error: '', // 图片加载失败时显示的图像
})

app.mount('#app')
