<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-12-08 14:45:53
 * @LastEditTime : 2023-12-08 18:22:29
-->
<template>
  <div class="my-map-container">
    <DataHeader
      label="上传地图文件"
      tip="[修改或删除地图时，请确认已使用的组件不会受到影响]"
      @hand-click="showMapModal"
    />
    <n-data-table
      :columns="columns"
      :data="mapData"
      size="small"
      :bordered="false"
      :pagination="pagination"
    />
    <n-modal
      v-model:show="mapDialog"
      class="custom-card"
      preset="dialog"
      title="新增地图"
      :bordered="false"
      :show-icon="false"
    >
      <template #header-extra>
        新增地图
      </template>
      <n-form ref="mapRef" :model="map" :rules="rules">
        <n-form-item path="name" label="名称">
          <n-input v-model:value="map.name" />
        </n-form-item>
        <p>粘贴JSON或者上传地图.json文件</p>
        <n-tabs type="line" animated>
          <n-tab-pane name="地图JSON数据" tab="地图JSON数据">
            <g-monaco-editor
              language="json"
              :code="map.json"
              :height="180"
              style="width: 100%;"
              editor-class="formatter-editor"
              @change="handChangeCode"
            />
          </n-tab-pane>
          <n-tab-pane name="上传地图数据" tab="上传地图数据">
            <g-upload-file v-model="map.file" dir="mapjson" />
          </n-tab-pane>
        </n-tabs>
      </n-form>
      <template #action>
        <n-button :disabled="loading" @click="handCancle">取消</n-button>
        <n-button type="primary" :disabled="loading" @click="handConfime"> 确定 </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import { useMessage, NDataTable } from 'naive-ui'
import { IconTutorial, IconArrowUp, IconEdit, IconDelete } from '@/icons'
import DataHeader from '../my-data/components/data-header.vue'
import { mapApi } from '@/api/map'

export default defineComponent({
  name: 'MyMap',
  components: {
    IconTutorial,
    IconArrowUp,
    DataHeader,
    IconEdit,
    IconDelete,
    NDataTable,
  },
  setup() {
    const nMessage = useMessage()

    const loading = ref(false)
    const mapDialog = ref(false)
    const showMapModal = () => {
      mapDialog.value = true
    }

    const map = ref({
      name: '',
      json: '',
      file: '',
    })
    const mapRef = ref(null)

    const rules = {
      name: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur',
      }],
    }

    const handCancle = () => {
      mapDialog.value = false
      mapRef.value?.restoreValidation()
    }

    const handConfime = async () => {
      map.value.json = _code.value
      mapRef.value?.validate(async error => {
        if (!error) {
          if (!map.value.json && !map.value.file) {
            message.error('JOSN数据或文件必须填入一个')
            return
          }
          const imgArr = map.value.file.split('/')
          const res = await mapApi.addMap({
            ...map.value,
            uid: imgArr.length ? imgArr[imgArr.length - 1] : '',
          })
          if (res.code === 1000) {
            getMap()
            handCancle()
          }
        }
      })
    }

    const _code = ref('')
    const handChangeCode = val => {
      _code.value = val.value
    }
    const pagination = reactive({
      page: 1,
      pageSize: 40,
      pageCount: 0,
      showSizePicker: true,
      pageSizes: [40, 60, 80],
      onChange: (page: number) => {
        pagination.page = page
        getMap()
      },
      onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        pagination.page = 1
        getMap()
      },
    })
    const mapData = ref([])
    const getMap = async () => {
      const res = await mapApi.mapList({
        page: pagination.page,
        size: pagination.pageSize,
      })
      if (res.code === 1000) {
        mapData.value = res.data?.list || []
        pagination.pageCount = res.data?.pagination?.total || 0
      }
    }
    getMap()

    const editMap = (row: any) => {

    }

    const deleteMap = async (row: any) => {
      const res = await mapApi.deleteMAp(row.id)
      if (res.code === 1000) {
        getMap()
      }
    }

    const columns = [{
      title: '名称',
      key: 'name',
    },
    {
      title: '文件',
      key: 'file',
    },
    {
      title: 'JSON',
      key: 'json',
    },
    {
      title: '操作',
      key: 'actions',
      width: 80,
      render (row) {
        return [h(
          IconEdit,
          {
            class: 'map-icon',
            onClick: () => editMap(row),
          },
        ),h(
          IconDelete,
          {
            class: 'map-icon is-del',
            onClick: () => deleteMap(row),
          },
        )]
      },
    }]

    return {
      map,
      mapRef,
      rules,
      columns,
      mapData,
      mapDialog,
      loading,
      pagination,
      showMapModal,
      handCancle,
      handConfime,
      handChangeCode,
      action: import.meta.env.VITE_UPLOAD_URL,
    }
  },
})
</script>
<style lang="scss" scoped>
:deep(.formatter-editor) {
  flex: 1;
}

.my-map-container {
  padding: 0 16px;

  :deep(.map-icon) {
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: var(--datav-font-color);

    &.is-del {
      margin-left: 8px;
    }

    &:hover {
      fill: var(--datav-main-color);

      &.is-del {
        fill: var(--datav-warn-color);
      }
    }
  }
}
</style>
