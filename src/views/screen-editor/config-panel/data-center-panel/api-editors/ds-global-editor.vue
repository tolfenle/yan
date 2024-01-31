<template>
  <div class="ds-wrapper ds-global">
    <p class="url-info-text">
      请编写全局处理函数，返回要应用的全局变量名
    </p>
    <n-popover
      placement="left"
      trigger="click"
      :width="600"
      :style="{
        '--n-color': '#0e1013',
        borderRadius: '8px',
      }"
    >
      <template #trigger>
        <div class="ds-response-btn" @click="handGetGlobalParam">
          <n-icon class="refresh-btn">
            <IconSearch />
          </n-icon>
          查看当前全局属性
        </div>
      </template>
      <div class="ds-preview-content-datasource">
        <n-data-table
          size="small"
          :columns="globalParamColumns"
          :data="globalParamList"
          :bordered="false"
        />
      </div>
    </n-popover>
    <p title="function formatter(data) {" class="fake-code --start">
      <span class="--keyword">function</span> globalFunc(param) {
    </p>
    <g-monaco-editor
      language="sql"
      line-numbers="off"
      :height="120"
      :code="apiDataConfig.config.global"
      @change="updateGlobal"
      @blur="updateGlobalBlur"
    />
    <p class="fake-code --end">}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'
import { ApiRequestMethod } from '@/components/_models/data-source'
import { useEventStore } from '@/store/event'
import { comInjectionKey, sourcePanelInjectionKey } from '../../config'
import { useDBStore } from '@/store/db'
import { IconSearch, IconRefresh } from '@/icons'
import { NDataTable } from 'naive-ui'

export default defineComponent({
  name: 'DsGlobalEditor',
  components: {
    IconSearch,
    NDataTable,
  },
  setup() {
    const com = inject(comInjectionKey)
    const { apiDataConfig } = inject(sourcePanelInjectionKey)

    const code = ref(apiDataConfig.value.config.global)
    const updateGlobalBlur = val => {
      apiDataConfig.value.config.global = val.value
    }

    const updateGlobal = val => {
      code.value = val.value
    }

    onBeforeUnmount(() => {
      apiDataConfig.value.config.global = code.value
    })

    const globalParamList = ref([])
    const handGetGlobalParam = () => {
      globalParamList.value = []
      const global = (window as any).GlobalProxy
      for (const key in global) {
        globalParamList.value.push({
          name: global[key].name,
          key,
          value: JSON.stringify(global[key].value),
        })
      }
    }
    handGetGlobalParam()

    return {
      globalParamList,
      ApiRequestMethod,
      apiDataConfig,
      updateGlobal,
      updateGlobalBlur,
      handGetGlobalParam,
      globalParamColumns: [{
        title: '字段名',
        key: 'name',
        width: 100,
      },{
        title: '字段key',
        key: 'key',
        width: 120,
      },{
        title: '值',
        key: 'value',
      }],
    }
  },
})
</script>

<style lang="scss">
.ds-preview-content-datasource {
  position: relative;
  min-width: 384px;
  width: 100%;
  max-height: 400px;
  // padding: 10px;
  border-radius: 2px;
  overflow: auto;

  ul li {
    padding: 5px 0;
    user-select: text;
    border-bottom: 1px solid #353535;

    span {
      display: inline-block;
      font-weight: 600;
      width: 25px;
    }
  }
}
</style>

<style lang="scss" scoped>
.ds-global {
  .url-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .api-help {
      color: var(--datav-main-color);
    }
  }

  .url-info-text {
    margin-bottom: 10px;
  }

  .ds-checkbox {
    line-height: 18px;
    margin-bottom: 10px;
  }
}
</style>
