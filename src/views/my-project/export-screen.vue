<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    draggable
    :show-icon="false"
    style="width: 800px;"
    @close="closeDialog"
  >
    <!-- <n-button style="margin-bottom: 8px;" @click="createRelease">重新构建部署包</n-button> -->
    <template #header>
      {{ `${screen?.name}_构建部署包记录` }}
      <span class="datav-warn-font">(构建包存储时限为7天，过期后将无法下载)</span>
    </template>
    <n-spin :show="loading" class="share-setting">
      <n-button quaternary @click="handDownloadHelp">点击下载应用部署说明文档</n-button>
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
      />
    </n-spin>
  </n-modal>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, nextTick } from 'vue'
import { useMessage, NDataTable, NButton, NPopover, NIcon } from 'naive-ui'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'
import { exportScreen, getScreenZipList } from '@/api/project'
import { IconHelp } from '@/icons'

export default defineComponent({
  name: 'ScreenRlease',
  components: {
    NDataTable,
    NButton,
    NPopover,
    IconHelp,
    NIcon,
  },
  props: {
    screen: {
      type: Object,
      required: true,
      default: () => { },
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    projectId: {
      type: String,
      default: '',
    },
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const nMessage = useMessage()
    const visible = ref(false)
    const isPublish = ref(false)
    const showTooltip = ref(false)
    const password = ref('')
    const passwordType = ref('password')
    const loading = ref(false)
    const formRef = ref(null)

    const data = ref([])
    const getScreenReleaseList = async () => {
      const res = await getScreenZipList({
        page: paginationReactive.page,
        size: paginationReactive.pageSize,
        projectId: props.projectId,
      })
      if (res.code === 1000) {
        data.value = res.data.list.map(v => {
          return {
            ...v,
            // viewUrl: location.origin
          }
        })
      }
    }

    const closeDialog = () => {
      visible.value = false
      formRef.value?.restoreValidation()
      ctx.emit(UPDATE_MODEL_EVENT, false)
    }

    watch(() => props.modelValue, val => {
      if (val) {
        visible.value = true
        getScreenReleaseList()
      } else {
        visible.value = false
      }
    })

    const createRelease = async () =>{
      const res = await exportScreen({
        projectId: props.screen.groupId,
        id: props.screen.id,
      })
      if (res.code === 1000) {
        nMessage.success('正在打包，请1分钟后查看下载...')
      }
    }

    const { setUrl } = useEnvUrl()
    const downScreen = row =>{
      window.open(setUrl(row.fileUrl))
    }

    const columns = [
      {
        title: '名称',
        key: 'name',
      },
      {
        title: '构建时间',
        key: 'createTime',
      },
      {
        title: '应用编号',
        key: 'screenId',
      },
      {
        title: '操作',
        key: '',
        render (row) {
          return h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => downScreen(row),
            },
            { default: () => '下载' },
          )
        },
      },
    ]

    const publish = async () => {
    }

    const paginationReactive = reactive({
      page: 1,
      pageSize: 5,
      onChange: (page: number) => {
        paginationReactive.page = page
        getScreenReleaseList()
      },
    })

    const handDownloadHelp = () => {
      window.open(setUrl('/public/help/应用单独部署流程.doc'))
    }

    return {
      columns,
      data,
      visible,
      isPublish,
      showTooltip,
      password,
      handDownloadHelp,
      closeDialog,
      createRelease,
      loading,
      passwordType,
      publish,
      formRef,
      pagination: paginationReactive,
    }
  },
})
</script>

<style lang="scss" scoped>
.share-setting {
  user-select: text;

  .n-button {
    float: right;
    position: relative;
    top: -8px;
  }

  .share-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    font-size: 14px;
    border-bottom: 1px solid var(--datav-border-color);
  }

  .header-wp {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label-color {
    font-size: 14px;
    letter-spacing: 1.09px;
    color: #fff;
    white-space: nowrap;
    padding: 10px 0;
  }

  .share-switch {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .share-tutorial-url {
    line-height: 28px;
    letter-spacing: 1.09px;
    color: var(--datav-main-color);
    text-decoration: none;
  }

  .share-verify {
    .label-color {
      padding-top: 16px;
    }
  }

  .link-content,
  .share-pwd {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .share-input {
    width: 80%;
    height: 50px;
    line-height: 22px;
    background: var(--datav-bgcolor-2);
    cursor: pointer;
    resize: none;
  }

  .pwd-input {
    width: 80%;
    height: 25px;
    line-height: 25px;
    background: var(--datav-bgcolor-2);
    cursor: text;
  }

  .func-btn {
    color: var(--datav-main-color);
    cursor: pointer;
    margin-left: 10px;
  }
}

.initial-dialog {
  width: 100%;
  text-align: center;
  position: relative;

  .publish-btn {
    width: 100%;
  }
}
</style>
