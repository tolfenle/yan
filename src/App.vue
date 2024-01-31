<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-24 14:25:35
-->
<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="themeOverrides"
    :theme="darkTheme"
    abstract
  >
    <n-message-provider closable keep-alive-on-hover>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { themeOverrides } from '@/styles/themes/naive-ui-theme-overrides'
import { useComStore } from './store/com'
import { useDictStore } from './store/dict'
import { setComponentData } from './components/_mixins/use-data-center'

export default defineComponent({
  name: 'AppRoot',
  setup() {
    const dictStore = useDictStore()
    // 获取字典项
    dictStore.requestDicts()
    // 获取组件1
    const comStore = useComStore()
    const flatComs = computed(() => comStore.flatComs?.[0]?.filter(com => {
      return com?.apiData?.source.type === ApiType.global
    }))
    useChartMap()
    onMounted(() => {
      // TODO 创建一个代理对象并指定目标对象为window.IKING
      if (!(window as any).GlobalData) {
        (window as any).GlobalData = {}
      }
      (window as any).GlobalProxy = new Proxy((window as any).GlobalData, {
        set(target, property, value) {
          const tout = window.setTimeout(() => {
            flatComs.value.forEach(com => {
              setComponentData(com.id, 'source', com.apis.source, com.apiData.source)
            })
            window.clearTimeout(tout)
          })
          // 执行原始的属性设置操作
          return Reflect.set(target, property, value)
        },
      });

      // 高德地图密钥
      (window as any)._AMapSecurityConfig = {
        securityJsCode: 'fb6a132e833c85214219bad50599ecce',
      }

      console.clear()
    })

    return {
      darkTheme,
      themeOverrides,
      locale: zhCN,
      dateLocale: dateZhCN,
    }
  },
})
</script>
