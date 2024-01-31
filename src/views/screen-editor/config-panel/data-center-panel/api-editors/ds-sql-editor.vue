<template>
  <div class="ds-wrapper ds-sql">
    <p>数据源</p>
    <div class="datav-new-select-wp">
      <n-select
        v-model:value="apiDataConfig.config.database"
        :options="dbList"
        label-field="name"
        value-field="id"
        class="datav-new-select"
        placeholder="请选择数据源"
        @update:value="handChangeDB"
      />
    </div>
    <p>数据库(可选)</p>
    <div class="datav-new-select-wp">
      <n-select
        v-model:value="apiDataConfig.config.datatable"
        :options="dbBaseList"
        label-field="value"
        value-field="value"
        class="datav-new-select"
        clearable
        placeholder="请选择数据库"
        @update:value="handGetTables"
      />
      <n-popover
        v-model:show="visibleTables"
        placement="left"
        trigger="click"
        :width="260"
        :style="{
          '--n-color': '#0000',
        }"
      >
        <template #trigger>
          <div class="ds-response-btn" @click="handGetTables">
            <n-icon class="refresh-btn">
              <IconSearch />
            </n-icon>
            预览数据库中的数据表
          </div>
        </template>
        <div class="ds-preview-content-datasource">
          <p class="url-info-text">双击表名可复制</p>
          <ul>
            <li v-for="(ta, index) in dbTableList" :key="ta">
              <span>{{ index + 1 }}</span>
              <sub @dblclick="copy(ta)">{{ ta }}</sub>
            </li>
          </ul>
        </div>
      </n-popover>
      <p class="iking-datav-tip">不选择数据库编写SQL时需要在SQL中指定数据库(如: SELECT * FROM 'iking.user')</p>
      <p class="iking-datav-tip">如果指定了数据库就可以直接查询表(如:SELECT * FROM 'user')</p>
    </div>
    <p>数据表(可选)</p>
    <div class="datav-new-select-wp">
      <n-select
        v-model:value="apiDataConfig.config.datalist"
        :options="dbTableList"
        label-field="value"
        value-field="value"
        class="datav-new-select"
        clearable
        placeholder="请选择数据库"
        @update:value="handGetListKeys"
      />
    </div>
    <template v-if="apiDataConfig.config.datalist">
      <!-- <n-data-table
        size="small"
        :columns="columns"
        :data="dbTableKeyList"
        :bordered="false"
      /> -->
      <div class="table-keys">
        <p
          v-for="item in dbTableKeyList"
          :key="item.value"
          draggable="true"
          @dragstart="onDragStart($event, item)"
        >
          {{ item.value }}
        </p>
      </div>
    </template>
    <template v-else>
      <p class="url-info-text">
        请输入SQL语句，目前仅支持select语句，非select语句将被忽略
      </p>
      <g-monaco-editor
        language="sql"
        line-numbers="off"
        :height="120"
        :code="apiDataConfig.config.sql"
        @change="updateSQL"
        @blur="updateSQLBlur"
      />
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject } from 'vue'
import { ApiRequestMethod } from '@/components/_models/data-source'
import { useEventStore } from '@/store/event'
import { comInjectionKey, sourcePanelInjectionKey } from '../../config'
import { useDBStore } from '@/store/db'
import { IconSearch, IconRefresh } from '@/icons'
import { useClipboard } from '@vueuse/core'
import { NDataTable } from 'naive-ui'

export default defineComponent({
  name: 'DsSqlEditor',
  components: {
    IconSearch,
    NDataTable,
  },
  setup() {
    const visibleTables = ref(false)
    const eventStore = useEventStore()
    const dbStore = useDBStore()
    dbStore.loadDbs()
    const dbList = computed(() => dbStore.dbList)
    const dbBaseList = computed(()=> dbStore.dbBaseList)
    const dbTableList = computed(() => dbStore.dbTableList)
    const dbTableKeyList = computed(() => dbStore.dbTableKeyList)

    const com = inject(comInjectionKey)
    const { apiDataConfig } = inject(sourcePanelInjectionKey)

    const handChangeDB = async val => {
      await dbStore.loadBases(val)
    }
    if (apiDataConfig.value.config.database) {
      handChangeDB(apiDataConfig.value.config.database)
    }

    const variables = Object.keys(eventStore.publishersView)
    const handGetTables = async () => {
      await dbStore.loadTables({
        id: apiDataConfig.value.config.database,
        base: apiDataConfig.value.config.datatable,
      })
    }

    // loadTableKeys
    const handGetListKeys = async key => {
      await dbStore.loadTableKeys({
        id: apiDataConfig.value.config.database,
        base: apiDataConfig.value.config.datatable,
        key,
      })
    }

    const codeValue = ref(apiDataConfig.value.config.sql)
    const updateSQL = val => {
      codeValue.value  = val.value
    }
    const updateSQLBlur = val => {
      apiDataConfig.value.config.sql = val.value
    }

    onBeforeMount(() => {
      apiDataConfig.value.config.sql = codeValue.value
    })

    const { copy } = useClipboard({ legacy: true })

    const onDragStart = (e, item) => {
      e.dataTransfer.setData('application/x-custom-type', JSON.stringify(item))
    }

    return {
      onDragStart,
      visibleTables,
      ApiRequestMethod,
      apiDataConfig,
      dbList,
      dbTableList,
      dbTableKeyList,
      dbBaseList,
      variables,
      handGetListKeys,
      handGetTables,
      handChangeDB,
      updateSQL,
      updateSQLBlur,
      copy,
      columns: [{
        title: '列名',
        key: 'COLUMN_NAME',
      },{
        title: '类型',
        key: 'DATA_TYPE',
      }],
    }
  },
})
</script>

<style lang="scss">
.ds-preview-content-datasource {
  position: relative;
  width: 260px;
  max-height: 400px;
  padding: 10px;
  border-radius: 2px;
  overflow: auto;

  .url-info-text {
    color: var(--el-color-info-light-9);
    font-weight: 600;
  }

  ul li {
    padding: 5px 0;
    border-bottom: 1px solid #353535;

    span {
      display: inline-block;
      font-weight: 600;
      width: 25px;
    }

    sub {
      user-select: text;
      color: var(--datav-gui-hover-color);
    }
  }
}
</style>

<style lang="scss" scoped>
.ds-sql {
  .url-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .api-help {
      color: var(--datav-main-color);
    }
  }

  .table-keys {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 8px;

    & > p {
      background-color: var(--datav-bgcolor-1);
      padding: 6px;
      border-radius: 4px;
      cursor: move;
      transition: background-color 0.25s ease-in-out;

      &:hover {
        background-color: var(--datav-main-color);
      }
    }
  }

  .url-info-text {
    margin-bottom: 10px;
  }

  .ds-checkbox {
    line-height: 18px;
    margin-bottom: 10px;
  }

  ::v-deep(.datav-editor) {
    margin-bottom: 10px;
  }
}
</style>
