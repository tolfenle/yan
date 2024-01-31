<template>
  <g-loading type="square" :spinning="loading">
    <div class="create-screen">
      <div class="top-bar">
        <div class="left-bar"></div>
        <router-link to="/" class="return-btn">
          <span class="return-text">
            <n-icon class="return-icon">
              <IconBack />
            </n-icon>
            取消创建
          </span>
        </router-link>
        <!-- <n-button
          type="primary"
          class="create-new-screen"
          :focusable="false"
          @click="confirmCreate(null)"
        >
          <template #icon>
            <n-icon>
              <IconPlus />
            </n-icon>
          </template>
          创建空白项目
        </n-button> -->
      </div>
      <div class="creator-wp">
        <n-tabs v-model="activeTab" @update-value="handChangeTab">
          <n-tab-pane :name="0" tab="官方模板">
            <div class="template-list">
              <div v-for="(tpl, idx) in templatesSys" :key="tpl?.id" class="template-item">
                <div class="template-image">
                  <img :src="tpl.snapshot" alt="" class="preview-image">
                  <div class="template-mask">
                    <n-button
                      type="primary"
                      :focusable="false"
                      class="create-btn"
                      @click="previewTemplate(tpl, idx)"
                    >
                      <!-- confirmCreate(tpl) -->
                      创建项目
                    </n-button>
                    <!-- <n-button class="preview-btn" :focusable="false" @click="previewTemplate(tpl, idx)">
                      预览
                    </n-button> -->
                  </div>
                </div>
                <div class="template-info">
                  <div class="template-name">{{ tpl.name }}</div>
                  <div class="template-size">
                    <p>{{ tpl.width }}</p>
                    <p>{{ tpl.height }}</p>
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>
          <n-tab-pane :name="1" tab="社区模板">
            <div class="template-list">
              <div v-for="(tpl, idx) in templates" :key="tpl?.id" class="template-item">
                <div class="template-image">
                  <img :src="tpl.snapshot" alt="" class="preview-image">
                  <div class="template-mask">
                    <n-button
                      type="primary"
                      :focusable="false"
                      class="create-btn"
                      @click="previewTemplate(tpl, idx)"
                    >
                      创建项目
                    </n-button>
                    <!-- <n-button class="preview-btn" :focusable="false" @click="previewTemplate(tpl, idx)">
                      预览
                    </n-button> -->
                  </div>
                </div>
                <div class="template-info">
                  <div class="template-name">{{ tpl.name }}</div>
                  <div class="template-size">
                    <p>{{ tpl.width }}</p>
                    <p>{{ tpl.height }}</p>
                  </div>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </g-loading>

  <n-modal
    v-model:show="visibleCreateDialog"
    preset="dialog"
    :show-icon="false"
    title="创建数据大屏"
    style="width: 400px;"
  >
    <div class="create-dialog">
      <p class="name-title">
        <span class="required">*</span>数据大屏名称
      </p>
      <new-input
        v-model="projectName"
        placeholder="请输入大屏名称"
        spellcheck="false"
        class="name-input"
      />
      <p class="name-title">
        <span class="required">*</span>大屏分组
      </p>
      <n-tree-select
        v-model:value="groupId"
        :options="groups"
        default-expand-all
        placeholder="请选择大屏分组"
        size="small"
        key-field="depId"
        label-field="name"
      />
    </div>
    <template #action>
      <n-button
        :focusable="false"
        @click="visibleCreateDialog = false"
      >
        取消
      </n-button>

      <n-button
        type="primary"
        :focusable="false"
        :loading="saveLoading"
        @click="doCreate"
      >
        创建
      </n-button>
    </template>
  </n-modal>

  <n-modal
    v-model:show="visiblePreviewDialog"
    preset="dialog"
    :show-icon="false"
    title="使用模板创建"
    style="width: 1100px; padding-bottom: 0;"
  >
    <div class="preview-dialog">
      <div class="preview-list">
        <p class="template-list-title">模板列表</p>
        <div class="blur-wp">
          <div ref="scrollRef" class="scroll-wp">
            <div
              v-for="(tpl, idx) in (activeTab ? templates : templatesSys)"
              :key="tpl?.id"
              class="preview-wp"
              :class="{ selected: tpl?.id === template.id }"
              @click="togglePreviewTemplate(tpl, idx)"
            >
              <img :src="tpl.snapshot" class="preview-small-img">
              <div class="preview-screen-name">{{ tpl.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="preview-gif">
        <div class="gif-wp">
          <img class="snapshot-gif" :src="template.snapshot">
          <n-icon class="prev-icon" @click="prevPreviewTemplate">
            <IconArrowLeft />
          </n-icon>

          <n-icon class="next-icon" @click="nextPreviewTemplate">
            <IconArrowRight />
          </n-icon>
        </div>
        <div class="preview-create">
          <div class="create-dialog">
            <p class="template-desc">
              {{ template.description || template.name }}
            </p>
            <p class="name-title">
              <span class="required">*</span>数据大屏名称
            </p>
            <new-input
              v-model="projectName"
              placeholder="请输入大屏名称"
              spellcheck="false"
              class="name-input"
            />
            <p class="name-title">大屏分组</p>
            <n-tree-select
              v-model:value="groupId"
              :options="groups"
              default-expand-all
              placeholder="请选择大屏分组"
              size="small"
              key-field="depId"
              label-field="name"
            />
          </div>
          <n-button
            type="primary"
            size="tiny"
            :focusable="false"
            icon-placement="right"
            :loading="saveLoading"
            class="preview-create-btn"
            @click="doCreateByTemplate"
          >
            <template #icon>
              <n-icon class="next-icon">
                <IconArrowRight />
              </n-icon>
            </template>
            创建大屏
          </n-button>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, NTreeSelect, NTabs, NTabPane } from 'naive-ui'
import { ProjectGroup, ProjectTemplate } from '@/domains/project'
import { createScreen, createScreenByTemplate } from '@/api/screen'
import { getSysTemplates } from '@/api/templates'
import { scrollToLeft } from '@/utils/scroll-util'
import { IconArrowLeft, IconArrowRight, IconBack, IconPlus } from '@/icons'
import { useProjectStore } from '@/store/project'

export default defineComponent({
  name: 'CreateScreen',
  components: {
    NTreeSelect,
    IconArrowLeft,
    IconArrowRight,
    IconBack,
    IconPlus,
    NTabs,
    NTabPane,
  },
  setup() {
    const nMessage = useMessage()
    const loading = ref(true)
    const templates = ref<ProjectTemplate[]>([])
    const templatesSys = ref<ProjectTemplate[]>([])

    const visibleCreateDialog = ref(false)
    const visiblePreviewDialog = ref(false)
    const projectName = ref('')
    const template = ref<Partial<ProjectTemplate> | null>({})
    const groupId = ref('')
    const saveLoading = ref(false)
    const router = useRouter()
    const scrollRef = ref<any>(null)
    const activeTab = ref(0)

    const projectStore = useProjectStore()
    projectStore.request()
    const groups = computed(() => {
      return projectStore.groups
    })

    const { setUrl } = useEnvUrl()

    const getSystemTemplate = async () => {
      const res = await getSysTemplates({ isSystem: true })
      if (res.code === 1000)
        templatesSys.value = res.data?.list.map(v => {
          return {
            ...v,
            snapshot: setUrl(v.snapshot),
          }
        })
      else {
        nMessage.warning(res.message)
        templatesSys.value = []
      }
      loading.value = false
    }

    const getPublicTemplate = async () => {
      const res = await getSysTemplates({ isSystem: false })
      if (res.code === 1000)
        templates.value = res.data?.list?.map(v => {
          return {
            ...v,
            snapshot: setUrl(v.snapshot),
          }
        })
      else {
        nMessage.warning(res.message)
        templates.value = []
      }

      loading.value = false
    }


    onMounted(async () => {
      getSystemTemplate()
    })

    const confirmCreate = (tpl: ProjectTemplate | null) => {
      template.value = tpl ?? {}
      visibleCreateDialog.value = true
    }

    const previewTemplate = (tpl: ProjectTemplate, idx: number) => {
      template.value = tpl
      visiblePreviewDialog.value = true

      nextTick(() => {
        togglePreviewTemplate(tpl, idx)
      })
    }

    const togglePreviewTemplate = (tpl: ProjectTemplate, idx: number) => {
      template.value = tpl
      scrollToLeft(149 * idx - 350, {
        getContainer: () => scrollRef.value,
      })
    }

    const prevPreviewTemplate = () => {
      const idx = templates.value.findIndex(m => m.id === template.value.id)
      if (idx > 0) {
        const nidx = idx - 1
        const tpl = templates.value[nidx]
        togglePreviewTemplate(tpl, nidx)
      }
    }

    const nextPreviewTemplate = () => {
      const idx = templates.value.findIndex(m => m.id === template.value.id)
      if (idx < templates.value.length - 1) {
        const nidx = idx + 1
        const tpl = templates.value[nidx]
        togglePreviewTemplate(tpl, nidx)
      }
    }

    const checkForm = () => {
      if (!projectName.value) {
        nMessage.error('请输入大屏名称')
        return false
      }
      if (!groupId.value) {
        nMessage.error('请选择大屏分组')
        return false
      }
      return true
    }

    const successLink = res => {
      saveLoading.value = false
      visibleCreateDialog.value = false
      visiblePreviewDialog.value = false
      router.push({
        name: 'ScreenEditor',
        params: {
          projectId: groupId.value,
          screenId: res.data?.id,
        },
        query: {
          tpl: template.value?.id,
        },
      })
      projectName.value = ''
      groupId.value = ''
      template.value = {}
    }

    const doCreateByTemplate = async () => {
      if(!checkForm()) return
      saveLoading.value = true
      const res = await createScreenByTemplate({
        name: projectName.value,
        groupId: groupId.value,
        templateId: template.value?.id,
      })
      if (res.code === 1000) {
        successLink(res)
      } else {
        saveLoading.value = false
        throw Error(res.data.message)
      }
    }

    const doCreate = async () => {
      try {
        if(!checkForm()) return
        saveLoading.value = true
        // TODO 初始化使用默认配置
        const res = await createScreen({
          width: 1920,
          height: 1080,
          bgimage: '',
          bgcolor: '#262626',
          grid: 8,
          screenshot: '',
          zoomMode: 1,
          useWatermark: true,
          name: projectName.value,
          groupId: groupId.value,
          templateId: template.value?.id ?? null,
          pages: [{
            id: 0,
            name: '主屏',
            animation: {
              duration: 1000,
              loop: true,
              type: 'css',
              css: '',
              img: '',
              video: '',
              lottie: '',
            },
            children: [],
          }],
          iframe: {
            title: '',
            favico: '',
            loadingTitle: '',
            loadingIcon: '',
            body: {
              name: 'body',
              config: '',
            },
            header: {
              name: 'header',
              config: '',
            },
          },
          dialogs: [],
          styleFilterParams: {
            enable: false,
            hue: 0,
            saturate: 100,
            brightness: 100,
            contrast: 100,
            opacity: 100,
          },
          variables: {
            componentsView: {},
            publishersView: {},
            subscribersView: {},
          },
          host: [{
            host: '',
            name: '',
            token: '',
          }],
          events: [],
          defaultPage: 0,
        })
        if (res.code === 1000) {
          successLink(res)
        } else {
          throw Error(res.data.message)
        }
      } catch (error) {
        nMessage.error(error.message)
      } finally {
        saveLoading.value = false
      }
    }

    const handChangeTab = val => {
      switch (val) {
        case 0:
          getSystemTemplate()
          break
        case 1:
          getPublicTemplate()
          break
        default:
          getSystemTemplate()
          break
      }
    }

    return {
      activeTab,
      loading,
      templates,
      visibleCreateDialog,
      visiblePreviewDialog,
      projectName,
      template,
      templatesSys,
      groupId,
      groups,
      saveLoading,
      scrollRef,
      doCreateByTemplate,
      confirmCreate,
      previewTemplate,
      togglePreviewTemplate,
      prevPreviewTemplate,
      nextPreviewTemplate,
      doCreate,
      handChangeTab,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "@/styles/mixins/function.scss";

@font-face {
  font-family: Orbitron-Bold;
  src: url('@/styles/fonts/orbitron-bold.ttf') format('truetype');
}

.create-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(0 51 125 / 7%);
  margin: 0;
  padding: 0;
  user-select: none;

  .create-new-screen {
    position: absolute;
    right: 16px;
    top: 10px;
  }

  .top-bar {
    height: 50px;
    width: 100%;
    position: relative;

    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 20px;
      width: 100%;
      background: #151b22;
    }

    .left-bar {
      position: absolute;
      left: 0;
      top: 24px;
      height: 25px;
      width: 105%;
      border-right: 2px solid var(--datav-main-color);
      border-bottom: var(--datav-border-primary);
      transform: skewX(-45deg);
      border-bottom-right-radius: 5px;
      box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
    }

    .return-btn {
      position: absolute;
      left: -31px;
      top: 0;
      width: 180px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: #151b22;
      cursor: pointer;
      transform: skewX(-45deg);
      border-bottom-right-radius: 5px;

      .return-text {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
        transform: skewX(45deg);
        transition: 0.2s;

        &:hover {
          color: var(--datav-main-color);
        }
      }

      .return-icon {
        margin-right: 5px;
      }
    }
  }

  .creator-wp {
    flex: 1;
    padding: 0 30px;
    margin-top: 12px;

    .title {
      font-size: 16px;
      color: #70ccf9;
      padding: 8px 0;
    }

    :deep(.n-tab-pane) {
      background: transparent;

      .template-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        overflow-x: hidden;
        overflow-y: scroll;
        color: #fff;
        font-size: 12px;
        margin: 0 -16px;
        height: 100%;

        .template-item {
          width: 300px;
          height: 200px;
          box-shadow: var(--datav-shadow);
          border: var(--datav-border);
          margin: 16px;
          transition: 0.2s;
          outline: 1px solid transparent;
          cursor: default;
          border-radius: 5px;
          overflow: hidden;

          .template-image {
            width: 100%;
            height: 163px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s;
            position: relative;
          }

          .template-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            height: 36px;
            background: var(--datav-bgcolor-2);
            transition: 0.2s;
          }

          &.--blank {
            position: relative;
            outline: var(--datav-border-primary);

            .template-image {
              box-shadow: inset 0 0 46px 0 rgb(136 215 255 / 29%);
            }

            .template-info {
              border-top: var(--datav-border-primary);
              justify-content: center;
              font-size: 14px;
            }
          }
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;

          &::after {
            @include cover-img;
          }
        }

        .template-mask {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgb(0 0 0 / 50%);
          transition: 0.2s;
          pointer-events: none;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          opacity: 0;
          font-weight: 400;

          .create-btn {
            width: 112px;
            padding: 0 5px;
          }

          .preview-btn {
            margin-top: 10px;
            width: 112px;
            padding: 0 5px;
            margin-left: 0;
          }
        }

        .template-item:hover {
          outline: var(--datav-border-primary);

          .template-mask {
            pointer-events: all;
            opacity: 1;
          }
        }

        .template-name {
          font-size: 12px;
        }

        .template-size {
          color: #999;
          text-align: right;
          font-family: Orbitron-Bold, PingFangSC-Medium, "PingFang SC", "Microsoft YaHei", Arial, Helvetica, sans-serif;
        }

        .template-item-placehoder {
          width: 258px;
          margin: 16px;
        }
      }
    }

    :deep(.n-tabs-nav-scroll-wrapper) {
      --n-tab-font-size: 15px;

      .n-tabs-nav-scroll-content {
        margin-bottom: 10px;

        .n-tabs-bar {
          display: none;
        }
      }

      .n-tabs-tab-wrapper {
        .n-tabs-tab {
          padding: 6px 30px;
          background: linear-gradient(45deg, #0256d924, #ffffff4f);
          border-radius: 34px;

          &.n-tabs-tab--active {
            color: #fff;
            font-weight: var(--n-tab-font-weight-active);
            background: linear-gradient(45deg, #7da7e9, #01d2e7bf);
          }
        }
      }
    }
  }
}

.create-dialog {
  .required {
    display: inline-block;
    margin-right: 6px;
    color: var(--datav-red-color);
  }

  .template-desc {
    margin-bottom: 20px;
    opacity: 0.8;
    overflow: hidden;
    -webkit-line-clamp: 3;
    display: box;
    -webkit-box-orient: vertical;
  }

  .name-title {
    margin-bottom: 10px;
    line-height: 20px;
  }

  .name-input {
    margin-bottom: 15px;
    height: 28px;
    line-height: 26px;
  }
}

@mixin slider-blur($placement: left, $angle: -90deg) {
  content: ' ';
  position: absolute;
  top: 0;
  #{$placement}: 0;
  background-image:
    linear-gradient(
      #{$angle},
      rgb(0 0 0 / 0%) 64%,
      #0a0a0a7a 100%
    );
  width: 82px;
  height: 96px;
  pointer-events: none;
  z-index: 1;
}

.preview-dialog {
  margin-top: -10px;
  margin-bottom: -40px;

  .preview-list {
    width: 1100px;
    height: 150px;
    margin-left: -20px;
    background: #00000042;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .template-list-title {
      font-size: 12px;
      margin: 0 0 15px 30px;
    }
  }

  .blur-wp {
    position: relative;
    margin: 0 24px;

    &::before {
      @include slider-blur();
    }

    &::after {
      @include slider-blur(right, 90deg);
    }
  }

  .scroll-wp {
    white-space: nowrap;
    overflow-x: scroll;
    padding-bottom: 8px;

    &::-webkit-scrollbar-thumb {
      background: var(--datav-main-color);
      border-radius: 5px;
      border: none;
    }
  }

  .preview-wp {
    position: relative;
    font-size: 0;
    width: 137px;
    height: 97px;
    overflow: hidden;
    display: inline-block;
    margin: 0 6px;
    cursor: pointer;
    border: 1px solid rgb(123 123 123 / 25%);
    transition: 0.2s;

    .preview-small-img {
      display: block;
      width: 100%;
      height: 76px;
      object-fit: cover;
      position: relative;

      &::after {
        @include cover-img;
      }
    }

    .preview-screen-name {
      font-size: 12px;
      line-height: 19px;
      background: var(--datav-bgcolor-2);
      padding: 0 5px;
      font-weight: 300;
    }

    &:hover,
    &.selected {
      border-color: var(--datav-main-color);
    }
  }

  .preview-gif {
    height: 540px;
    display: flex;
    padding: 20px 10px 50px;

    .gif-wp {
      width: 780px;
      position: relative;

      .snapshot-gif {
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        border: var(--datav-border);
        box-shadow: var(--datav-shadow);

        &::after {
          @include cover-img();
        }
      }

      .next-icon,
      .prev-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px;
        border-radius: 50%;
        height: 26px;
        width: 26px;
        margin: 10px;
        font-weight: 600;
        background: rgb(255 255 255 / 20%);
        color: rgb(255 255 255 / 80%);
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          color: #fff;
          background: rgb(255 255 255 / 30%);
        }
      }

      .next-icon {
        right: 0;
      }
    }

    .preview-create {
      flex: 1;
      overflow: hidden;
      padding-left: 20px;
    }
  }
}

.preview-create-btn {
  margin-top: 30px;
  width: 100%;

  .next-icon {
    font-size: 12px;
  }
}
</style>
