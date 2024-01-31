<template>
  <n-drawer
    v-model:show="visible"
    width="500px"
    :trap-focus="false"
    class="source-drawer"
    to="#edit-main-wp"
    show-mask
  >
    <n-drawer-content closable>
      <template #header>
        <p class="source-drawer-title">设置数据源</p>
      </template>

      <div class="step-title" :class="{ '--error': !!dataStatus.api }">
        数据源
      </div>
      <sub>全局属性必须设置在<b>GlobalProxy</b>对象上,并且包含name、value属性;(如:GlobalProxy.lineData={name: '柱状图数据', value: 20}),否则不会在数据更改时监听响应</sub>
      <div class="datasource-selector">
        <label class="datasource-selector-title">数据源类型</label>
        <div class="datasource-select">
          <div class="datav-new-select-wp">
            <n-select
              v-model:value="apiDataConfig.type"
              :options="datasources"
              filterable
              class="datav-new-select"
              @update:value="changeSource"
            />
          </div>
        </div>
      </div>

      <ds-static-editor v-if="apiDataConfig.type === apiType.static" />
      <ds-api-editor v-else-if="apiDataConfig.type === apiType.api" />
      <ds-sql-editor v-else-if="apiDataConfig.type === apiType.sql" />
      <ds-global-editor v-else-if="apiDataConfig.type === apiType.global" />

      <n-popover
        v-model:show="visiblePreview"
        placement="left"
        :width="400"
        class="editor-popover"
        :style="{
          '--n-color': '#0000',
        }"
      >
        <template #trigger>
          <div class="ds-response-btn">
            <n-icon class="refresh-btn">
              <IconSearch />
            </n-icon>
            预览数据源返回结果
          </div>
        </template>
        <div class="ds-preview-content">
          <g-monaco-editor
            language="json"
            :read-only="true"
            :auto-format="true"
            :height="180"
            :code="dataOrign"
          />
        </div>
      </n-popover>
      <div class="step-title" :class="{ '--error': !!dataStatus.filter }">
        <n-checkbox
          v-model:checked="apiDataConfig.config.useFilter"
          class="use-filter-btn"
        />
        <span class="use-filter-text">数据过滤器</span>
        <span class="tutorial-popup">教程</span>
      </div>

      <filter-panel />

      <field-grid :fields="apiConfig.fields" />
      <g-field
        style="padding: 16px 0 0;"
        label-span="5"
        tooltip="配置字段名，会将返回的数据中对应字段名的数据直接返回;快键配置将先于过滤器执行"
        label="快捷属性配置(支持链式数据;如: data.obj)"
      >
        <div v-for="(item, index) in fields" :key="index">
          <g-input v-model="item.key" placeholder="请输入要返回的值对应的字段名" @blur="handFieldChange" />
        </div>
      </g-field>
      <div
        class="step-title"
        :class="{
          '--error': !!dataStatus.api || !!dataStatus.filter
        }"
      >
        <span>数据响应结果</span>
        <n-icon class="refresh-btn" @click="refreshData">
          <IconRefresh />
        </n-icon>
      </div>
      <div class="data-response">
        <g-monaco-editor
          language="json"
          :read-only="true"
          :auto-format="true"
          :code="resData"
        />
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, provide, inject } from 'vue'
import { loadAsyncComponent } from '@/utils/async-component'
import { createDataSources, ApiType, createDataConfigForApiSql } from '@/components/_models/data-source'
import { useDebugStore } from '@/store/debug'
import { useApiStore } from '@/store/api'
import { setComponentData } from '@/components/_mixins/use-data-center'
import { IconSearch, IconRefresh } from '@/icons'
import FieldGrid from '../components/field-grid.vue'
import { comInjectionKey, sourcePanelInjectionKey, sourceDrawerInjectionKey } from '../config'
import { _ } from 'iking-utils'

export default defineComponent({
  name: 'SourceDrawer',
  components: {
    IconSearch,
    IconRefresh,
    FieldGrid,
    FilterPanel: loadAsyncComponent(() => import('../../filter-manager/filter-panel.vue')),
    DsStaticEditor: loadAsyncComponent(() => import('./api-editors/ds-static-editor.vue')),
    DsApiEditor: loadAsyncComponent(() => import('./api-editors/ds-api-editor.vue')),
    DsSqlEditor: loadAsyncComponent(() => import('./api-editors/ds-sql-editor.vue')),
    DsGlobalEditor: loadAsyncComponent(() => import('./api-editors/ds-global-editor.vue')),
  },
  setup() {
    const debugStore = useDebugStore()
    const apiStore = useApiStore()
    const visible = ref(false)
    const visiblePreview = ref(false)
    const apiType = ApiType
    const datasources = Object.entries(createDataSources())
      .map(([value, label]) => ({ value, label }))

    const open = () => {
      visible.value = true
    }

    const com = inject(comInjectionKey)
    const { apiName, apiConfig, apiDataConfig } = inject(sourcePanelInjectionKey)

    const dataStatus = computed(() => {
      const data = debugStore.dataStatusMap[com.value.id]
      return data ? data[apiName] ?? {} : {}
    })

    const dataOrign = computed(() => {
      const comData = debugStore.originMap[com.value.id]
      return comData ? comData[apiName] : ''
    })

    const changeSource = (val: ApiType) => {
      switch (val) {
        case ApiType.api:
        case ApiType.sql:
          createDataConfigForApiSql(apiDataConfig.value.config)
          break
        default:
          break
      }
    }

    const resData = computed(() => {
      const data = apiStore.dataMap[com.value.id]
      return data ? data[apiName] : ''
    })

    const refreshData = async () => {
      await setComponentData(com.value.id, apiName, apiConfig.value, apiDataConfig.value)
    }

    provide(sourceDrawerInjectionKey, {
      dataStatus,
      refreshData,
    })

    const fields = ref(_.cloneDeep(apiDataConfig.value.config.fields))
    const handFieldChange = () => {
      apiDataConfig.value.config.fields = _.cloneDeep(fields.value)
    }

    return {
      visible,
      visiblePreview,
      apiType,
      datasources,
      apiConfig,
      apiDataConfig,
      dataStatus,
      dataOrign,
      resData,
      fields,
      open,
      changeSource,
      refreshData,
      handFieldChange,
    }
  },
})
</script>

<style lang="scss">
@import './source-drawer.scss';
</style>
