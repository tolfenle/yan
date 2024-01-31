<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-28 10:35:00
 * @LastEditTime : 2024-01-17 16:05:26
-->
<template>
  <div class="my-media">
    <n-upload
      accept="image/*"
      :action="uploadUrl"
      :multiple="true"
      :show-file-list="false"
      :data="form"
      @before-upload="beforeUpload"
      @finish="finishUpload"
    >
      <n-upload-dragger>
        <n-spin :show="loading">
          <div
            class="g-upload-image-wrap"
          >
            <div class="g-upload-image-content">
              <div class="g-upload-tip">
                <n-icon size="60">
                  <IconImg />
                </n-icon>
                <div>点击或拖拽文件到这里上传</div>
              </div>
            </div>
          </div>
        </n-spin>
      </n-upload-dragger>
    </n-upload>
    <n-tabs animated placement="left">
      <n-tab-pane name="1" tab="图片">
        <div v-for="i in typeObj.images" :key="i" class="img-list">
          <img
            :src="`${loadUrl}${i.path}`"
            :style="{ maxWidth: '100%' }"
          >
          <IconDelete @click="handDelete(i)" />
        </div>
      </n-tab-pane>
      <n-tab-pane name="2" tab="视频">
        <div v-for="i in typeObj.videos" :key="i" class="img-list">
          <video
            autoplay
            loop
            :style="{ maxWidth: '100%' }"
          >
            <source :src="`${loadUrl}${i.path}`" type="video/mp4">
          </video>
          <IconDelete @click="handDelete(i)" />
        </div>
      </n-tab-pane>
      <n-tab-pane name="3" tab="其它">
        <div v-for="i in typeObj.others" :key="i" class="img-list">
          <img
            :src="`${loadUrl}${i.path}`"
            :style="{ maxWidth: '100%' }"
          >
          <IconDelete @click="handDelete(i)" />
        </div>
      </n-tab-pane>
    </n-tabs>
    <!-- <div v-for="i in projectImages" :key="i" class="img-list">
      <img
        :src="`${loadUrl}${i.path}`"
        :style="{ maxWidth: '100%' }"
      >
      <IconDelete @click="handDelete(i)" />
    </div> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted } from 'vue'
import { UploadFileInfo, useDialog, useMessage, NUpload, NUploadDragger, NSpin } from 'naive-ui'
import { IconDelete, IconImg } from '@/icons'
import { getProjectImages, saveProjectFile, deleteProjectFile } from '@/api/image'
import { useEditorStore } from '@/store/editor'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/store/project'
import { ikStore, _ } from 'iking-utils'

export default defineComponent({
  name: 'MyCase',
  components: {
    IconDelete,
    NUpload,
    NUploadDragger,
    NSpin,
    IconImg,
  },
  setup() {
    const nMessage = useMessage()
    const { loadUrl, uploadUrl } = useEnvUrl()

    const form = ref({
      key: '',
      token: '',
      projectId: '',
      dir: '',
    })

    const editorStore = useEditorStore()
    const projectStore = useProjectStore()

    const { screen } = storeToRefs(editorStore)
    const projectImages = ref([])

    const projectId = computed(() => ikStore.session.getItem('project_id') ?? screen.value.groupId)
    const typeObj = reactive({
      images: [],
      videos: [],
      others: [],
    })
    // 获取项目图片
    const getProjectList = async () => {
      const res: any = await getProjectImages({
        keyWord: projectId.value,
      })
      if (res.code === 1000) {
        projectImages.value = res?.data || []
        res?.data?.forEach(v => {
          const _type = v.fileName.split('.')[1].toLocaleLowerCase()
          if (['jpg', 'jpeg','png', 'webp'].includes(_type)) {
            typeObj.images.push(v)
          } else if (['mp4', 'mov', 'avi', 'wmv', 'rmvb', 'mkv', 'flv', 'webm'].includes(_type)) {
            typeObj.videos.push(v)
          } else {
            typeObj.others.push(v)
          }
        })
      }
    }

    const loading = ref(false)
    const beforeUpload = async (options: { file: UploadFileInfo; }) => {
      try {
        loading.value = true
        form.value.token = localStorage.getItem(
          import.meta.env.VITE_DATAV_TOKEN_KEY as string,
        )
        form.value.dir = (projectId.value) as any
        return true
      } catch (error) {
        loading.value = false
        nMessage.error(error.message)
      }
      return false
    }
    const finishUpload = (options: {
      file: UploadFileInfo
      event?: ProgressEvent
    }) => {
      loading.value = false
      const res = JSON.parse((options.event.target as XMLHttpRequest).response)
      if (res.code !== 1000)
        nMessage.error(res.error)
      const { file, event } = options
      const response = JSON.parse((event?.target as any)?.response || '{}')
      saveProjectFile({
        ...(response?.data || {}),
        size: file.file.size,
        fileName: file.name,
        type: file.type,
        projectId: projectId.value,
      }).then(() => {
        getProjectList()
      })

    }

    const nDialog = useDialog()
    const handDelete = i => {
      const d = nDialog.create({
        content: `请确认该资源在项目中未使用，否则可能导致页面显示异常！`,
        negativeText: '取消',
        positiveText: '确定',
        showIcon: false,
        closable: false,
        onPositiveClick: async () => {
          d.loading = true
          try {
            const res = await deleteProjectFile([i.id])
            if (res.code === 1000) getProjectList()
            else
              nMessage.warning(res.message)
          } catch (error) {
            nMessage.error(error.message)
          }
        },
      })
    }

    onMounted(() => {
      getProjectList()
    })
    return {
      projectImages,
      loadUrl,
      uploadUrl,
      form,
      loading,
      typeObj,
      handDelete,
      beforeUpload,
      finishUpload,
    }
  },
})
</script>

<style lang="scss" soped>
.n-tabs {
  .n-tab-pane {
    background: transparent;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 290px));
    grid-gap: 18px;
    justify-content: center;
    overflow: auto;
    height: calc(100vh - 234px);
    padding-top: 9px !important;
  }
}

.my-media {
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(auto-fill, minmax(150px, 295px));
  grid-gap: 18px;
  justify-content: center;
  margin-top: 12px;

  .n-upload {
    .n-upload-trigger {
      height: 100%;

      .n-upload-dragger {
        height: 100%;
        color: #adaaaa;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .img-list {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #36363661;
    box-shadow: 0 0 5px 4px rgb(0 0 0 / 21%);
    border-radius: 8px;
    transition: all 0.25s;
    max-height: 300px;
    background: #00000061;
    position: relative;
    padding: 4px;

    img{
      max-width: 100%;
      max-height: 100%;
    }

    &:hover {
      box-shadow: 0 0 200px 200px #000000be inset;

      .icon {
        display: inline-block;
        fill: var(--el-color-danger-light-3);
        background-color: rgb(50 50 50 / 30.1%);

        &:hover {
          fill: var(--el-color-danger);
        }
      }

      img {
        opacity: 0.5;
      }
    }

    .icon {
      position: absolute;
      display: none;
      cursor: pointer;
      background-color: rgb(50 50 50 / 59%);
      width: 38px;
      height: 37px;
      padding: 0 8px;
      border-radius: 4px;
      fill: var(--el-color-primary-light-7);
      transition: all 0.35s ease-in-out;
      z-index: 2;
    }

    img {
      z-index: 1;
      transition: all 0.35s ease-in-out;
    }
  }
}
</style>
