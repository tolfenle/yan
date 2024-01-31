<template>
  <div class="my-screen">
    <div class="screen">
      <div class="screen-info">
        <div class="screen-img" :style="thumbnailStyle">
        </div>
        <div class="screen-edit">
          <div class="screen-button">
            <router-link
              :to="{
                name: 'ScreenEditor',
                params: {
                  screenId: screen?.id,
                  projectId: screen?.groupId
                }
              }"
              target="_blank"
              class="edit-wrap"
            >
              <n-button type="primary" :focusable="false" class="edit">
                编辑
              </n-button>
            </router-link>
            <div class="main-button">
              <g-tooltip-popover content="发布模板">
                <span class="button-span" @click="publishTemplate(screen)">
                  <n-icon :size="20">
                    <IconViewGrid />
                  </n-icon>
                </span>
              </g-tooltip-popover>
              <g-tooltip-popover content="移动">
                <span
                  class="button-span"
                  draggable="true"
                  @dragstart="onDragStart"
                  @dragend="onDragEnd"
                >
                  <n-icon :size="20">
                    <IconMove />
                  </n-icon>
                </span>
              </g-tooltip-popover>
              <g-tooltip-popover content="复制">
                <span class="button-span" @click="confirmCopyProject">
                  <n-icon :size="20">
                    <IconCopy />
                  </n-icon>
                </span>
              </g-tooltip-popover>
              <g-tooltip-popover content="删除">
                <span class="button-span" @click="confirmDeleteProject">
                  <n-icon :size="20">
                    <IconDelete />
                  </n-icon>
                </span>
              </g-tooltip-popover>
              <!-- <g-tooltip-popover content="导出大屏">
                <span class="button-span" @click="doExport">
                  <n-icon :size="20">
                    <IconMoveDown />
                  </n-icon>
                </span>
              </g-tooltip-popover> -->
            </div>
          </div>

          <router-link
            :to="{
              name: 'Preview',
              params: { screenId: screen?.id }
            }"
            target="_blank"
            class="preview"
          >
            <g-tooltip-popover content="预览">
              <n-icon :size="18">
                <IconPreview />
              </n-icon>
            </g-tooltip-popover>
          </router-link>
          <div class="public" @click="doPublish">
            <g-tooltip-popover content="发布分享">
              <n-icon :size="18">
                <IconRelease />
              </n-icon>
            </g-tooltip-popover>
          </div>
        </div>
      </div>
      <div class="screen-main">
        <div class="main-name">
          <g-tooltip-popover
            placement="top-start"
            :delay="1000"
            :content="screen?.name"
          >
            <div class="screen-name-input">
              <n-icon>
                <IconEdit />
              </n-icon>
              <input v-model.trim="screenName" class="input" @blur="onInputBlur">
            </div>
          </g-tooltip-popover>
          <div class="publish-info">
            <span class="dot" :class="{ published: publishState.published }"></span>
            <span>{{ publishState.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PublishTemplate v-model="showTemplate" :screen="screenData" />
  <ScreenRlease v-model="showRelease" :screen="screenData" />
</template>

<script lang='ts'>
import { h, defineComponent, PropType, toRefs, computed, ref, inject } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import { globalConfig } from '@/config'
import { Project } from '@/domains/project'
import { useProjectStore } from '@/store/project'
import { IconWarning, IconMove, IconCopy, IconDelete, IconEdit, IconPreview, IconRelease, IconViewGrid, IconMoveDown } from '@/icons'
import { projectInjectionKey, projectListInjectionKey } from './config'
import PublishTemplate from './publish-template.vue'
import { exportScreen } from '@/api/project'
import ScreenRlease from './export-screen.vue'

const cdn = import.meta.env.VITE_APP_CDN

export default defineComponent({
  name: 'MyScreen',
  components: {
    IconMoveDown,
    IconMove,
    IconCopy,
    IconDelete,
    IconEdit,
    IconPreview,
    IconRelease,
    IconViewGrid,
    PublishTemplate,
    ScreenRlease,
  },
  props: {
    screen: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  setup(props) {
    const { setUrl } = useEnvUrl()
    const nMessage = useMessage()
    const nDialog = useDialog()
    const projectStore = useProjectStore()
    const { id, name, groupId, shared, thumbnail, screenshot } = toRefs(props.screen)
    const screenName = ref(name.value)
    const oldScreenName = ref(name.value)
    const pConfig = inject(projectInjectionKey)
    const plConfig = inject(projectListInjectionKey)
    const showTemplate = ref(false)
    const screenData = ref(null)
    const showRelease = ref(false)

    const thumbnailStyle = computed(() => {
      if (screenshot.value) {
        return {
          'background-image': `url(${setUrl(screenshot.value)})`,
        }
      }
      return {
        'background-image': `url(${setUrl(globalConfig.logo)})`,
        'background-size': '50%',
        'background-position': 'center center',
        'background-repeat': 'no-repeat',
        filter: 'grayscale(0.2)',
        opacity: 0.4,
      }
    })

    const publishState = computed(() => {
      const published = !!shared.value
      return {
        published,
        text: published ? '已发布' : '未发布',
      }
    })

    const onInputBlur = async () => {
      if (screenName.value) {
        try {
          await projectStore.updateName(id.value, screenName.value)
          name.value = screenName.value
        } catch (error) {
          nMessage.error(error.message)
        }
      } else {
        screenName.value = oldScreenName.value
      }
    }

    const confirmCopyProject = () => {
      projectStore.copy(id.value, groupId.value)
    }

    const confirmDeleteProject = () => {
      const d = nDialog.create({
        content: `${screenName.value} 删除后无法恢复，确认删除？`,
        negativeText: '取消',
        positiveText: '确定',
        iconPlacement: 'top',
        icon: () => h(IconWarning),
        onPositiveClick: async () => {
          d.loading = true
          try {
            await projectStore.delete(id.value, groupId.value)
          } catch (error) {
            nMessage.error(error.message)
          }
        },
      })
    }

    const image = new Image()
    image.src = `${cdn}/logo.svg`

    const onDragStart = (event: DragEvent) => {
      pConfig.dragStart()

      const dt = event.dataTransfer
      if (dt) {
        dt.effectAllowed = 'move'
        dt.setDragImage(image, 30, 30)
        dt.setData('text', `${id.value},${groupId.value}`)
      }
    }

    const onDragEnd = () => {
      pConfig.dragEnd()
    }

    const doPublish = () => {
      plConfig.publish(id.value)
    }

    const publishTemplate = screen=>{
      showTemplate.value = true
      screenData.value = screen
    }

    const doExport = async () => {
      showRelease.value = true
      screenData.value = props.screen
      // const res = await exportScreen({
      //   projectId: groupId.value,
      //   id: id.value,
      // })
      // if (res.code === 1000) {
      //   nMessage.success(res.message)
      // }
    }

    return {
      name,
      showTemplate,
      screenData,
      thumbnailStyle,
      publishState,
      screenName,
      oldScreenName,
      showRelease,
      doExport,
      publishTemplate,
      onInputBlur,
      confirmCopyProject,
      confirmDeleteProject,
      onDragStart,
      onDragEnd,
      doPublish,
    }
  },
})
</script>

<style lang="scss" scoped>
.my-screen {
  margin: 16px 32px 16px 0;
}

.screen {
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 200px;
  transition: 0.2s;
  border-radius: 8px;
  overflow: hidden;
  background-image: url(@/assets/img/home/椭圆形.webp);
  border: 1px solid transparent;

  .screen-info {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    .screen-img {
      width: inherit;
      height: 146px;
      // opacity: 0.6;
      background-position: 15px 6px;
      background-repeat: no-repeat;
      background-size: calc(100% - 30px);
    }

    .screen-edit {
      position: absolute;
      opacity: 0;
      display: flex;
      width: 100%;
      height: 100%;
      pointer-events: none;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;
      background: rgb(0 0 0 / 60%);

      .edit-wrap {
        .edit {
          min-width: 116px;
          padding: 0 30px;
          font-size: 16px;
        }
      }

      .main-button {
        display: flex;
        justify-content: space-around;
        font-size: 19px;
        padding-top: 15px;
        align-items: center;
        color: #fff;
      }

      .screen-button {
        text-align: center;

        .button-span {
          padding: 0 10px;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.2s;

          &:hover {
            color: var(--datav-main-hover-color);
          }
        }
      }

      .preview {
        position: absolute;
        top: 10px;
        right: 35px;
      }

      .public {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        cursor: pointer;
        transition: color 0.2s;
      }

      .preview,
      .public {
        color: #fff;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: var(--datav-main-hover-color);
        }
      }
    }
  }

  &:hover {
    box-shadow: var(--datav-shadow);

    .screen-info {
      .screen-edit {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  .screen-main {
    .main-name {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      position: relative;
      justify-content: space-between;
      color: #fff;
      padding: 0 10px;

      .screen-name-input {
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        flex: 1;

        .input {
          width: 120px;
          color: var(--datav-font-color);
          background: 0 0;
          padding: 0 5px;
          line-height: 28px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          border: 1px solid transparent;

          &:hover {
            color: #fff;
          }

          &:focus {
            background: var(--datav-bgcolor-2);
          }
        }
      }

      .publish-info {
        align-items: center;
        display: flex;
        color: var(--datav-font-color);

        .dot {
          content: "";
          margin-right: 5px;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 5px;
          background-color: #576369;

          &.published {
            background-color: var(--datav-main-color);
          }
        }
      }
    }
  }
}
</style>
