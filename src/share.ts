/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2023-12-29 11:46:46
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import i18n from '@/locales'

import NaiveUI from '@/components/naive-ui'
import GUI from '@/components/ui'
import '@/styles/index.scss'
import ColorPicker from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import Highcharts from 'highcharts'
import Highcharts3D from 'highcharts/highcharts-3d'
import HighchartsVue from 'highcharts-vue'

import 'animate.css'
import 'swiper/css/bundle'

import DatavCharts from '@/components'

import router from './routes/share'
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

app.mount('#app')
