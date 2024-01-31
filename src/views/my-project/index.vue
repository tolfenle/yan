<!--
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-31 09:56:35
-->
<template>
  <div class="my-project">
    <div class="project-main">
      <div class="project-manage">
        <div class="manage-title">
          <div class="my-project project-group">
            <span class="new-project">
              <n-icon class="btn-add-icon">
                <IconProject />
              </n-icon>
              我的项目
            </span>
          </div>
        </div>

        <div class="manage-main" :class="{ draging: draging }">
          <n-tree
            block-line
            :data="groups"
            default-expand-all
            key-field="depId"
            label-field="name"
            selectable
            :default-selected-keys="defaultSelectKey"
            @update:selected-keys="handleGroupChange"
          />
        </div>
      </div>
      <div class="project-screen-list">
        <g-loading :spinning="loading">
          <project-list :group="selectedGroup" />
        </g-loading>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { h, defineComponent, ref, computed, provide, onMounted } from 'vue'
import { useMessage, useDialog, NTree } from 'naive-ui'
import { ElNotification } from 'element-plus'
import { ProjectGroup } from '@/domains/project'
import { useProjectStore } from '@/store/project'
import { addClass, removeClass } from '@/utils/dom'
import { IconWarning, IconProject } from '@/icons'
import ProjectList from './project-list.vue'
import { projectInjectionKey } from './config'
import { ikTree } from 'iking-utils'
import { noticatApi } from '@/api/notication'

export default defineComponent({
  name: 'MyProject',
  components: {
    NTree,
    ProjectList,
    IconProject,
  },
  setup() {
    const nMessage = useMessage()
    const nDialog = useDialog()
    const projectStore = useProjectStore()

    const loading = ref(true)
    const adding = ref(false)
    const draging = ref(false)

    const group = computed(() => projectStore.group)
    const ungroup = computed(() => projectStore.ungroup)
    const groups = computed(() => projectStore.groups)

    const selectedGroupId = ref(groups.value?.[0]?.id)
    const groupList = computed(() => ikTree.treeToList(projectStore.groups))

    const selectedGroup = ref()
    watch(() =>groups.value , () => {
      selectedGroup.value = groups.value.find(g => g.id === selectedGroupId.value) || groups.value[0]
    })
    const defaultSelectKey = computed(()=> [groups.value?.[0]?.depId] )

    const toggleProject = (id: number) => {
      selectedGroupId.value = id
    }

    const onAddInputBlur = (e: any) => {
      if (!adding.value) {
        return
      }

      const name = (e.target.value || '').trim()
      if (!name) {
        adding.value = false
      }
    }

    const addGroup = async (e: any) => {
      if (!adding.value) {
        return
      }

      const name = (e.target.value || '').trim()
      if (name) {
        try {
          adding.value = false
          await projectStore.createGroup(name)
        } catch (error) {
          nMessage.error(error.message)
        }
      } else {
        adding.value = false
      }
    }

    const onEditInputBlur = (e: any, group: any) => {
      if (!group.editing) {
        return
      }

      const newName = (e.target.value || '').trim()
      if (!newName || group.name === newName) {
        group.editing = false
      }
    }

    const editGroup = async (e: any, group: any) => {
      if (!group.editing) {
        return
      }

      const newName = (e.target.value || '').trim()
      if (newName && group.name !== newName) {
        try {
          await projectStore.updateGroupName(group.id, newName)
          group.name = newName
          group.editing = false
        } catch (error) {
          nMessage.error(error.message)
        }
      } else {
        group.editing = false
      }
    }

    const confirmDeleteGroup = (group: ProjectGroup) => {
      const d = nDialog.create({
        content: `${group.name} 删除后无法恢复，该分组中的可视化应用将全部移动到未分组，确认删除？`,
        negativeText: '取消',
        positiveText: '确定',
        iconPlacement: 'top',
        icon: () => h(IconWarning),
        onPositiveClick: async () => {
          d.loading = true
          try {
            await projectStore.deleteGroup(group.id)
            toggleProject(ungroup.value.id)
          } catch (error) {
            nMessage.error(error.message)
          }
        },
      })
    }

    provide(projectInjectionKey, {
      dragStart() {
        draging.value = true
      },
      dragEnd() {
        draging.value = false
      },
    })

    const onDragEnter = (event: any) => {
      addClass(event.target, 'drag-enter')
    }

    const onDragLeave = (event: any) => {
      removeClass(event.target, 'drag-enter')
    }

    const onDrop = (event: any, toGroup: ProjectGroup) => {
      event.preventDefault()
      removeClass(event.target, 'drag-enter')

      const str = event.dataTransfer.getData('text')
      if (str) {
        const [pid, fromId] = str.split(',').map((m: string) => parseInt(m))
        if (fromId !== toGroup.id) {
          projectStore.move(pid, fromId, toGroup.id)
        }
      }
    }

    // --------------------------
    const handleGroupChange = val => {
      selectedGroup.value = groupList.value.find(g => g.depId === (val?.[0] || val))
    }

    const getNewNotication = async () => {
      // noticatApi.getNewNotication().then(res => {
      //   if (res.code === 1000 && res.data?.length) {
      //     const { type, title, message, position } = res.data
      //     ElNotification[type]({
      //       title,
      //       message,
      //       duration: 0,
      //       position: position || 'top-right',
      //     })
      //   }
      // })
    }

    onMounted(() => {
      projectStore.request().finally(() => {
        loading.value = false
      })
      getNewNotication()
    })

    return {
      loading,
      group,
      ungroup,
      groups,
      selectedGroup,
      selectedGroupId,
      defaultSelectKey,
      adding,
      toggleProject,
      onAddInputBlur,
      addGroup,
      onEditInputBlur,
      editGroup,
      confirmDeleteGroup,
      draging,
      onDragEnter,
      onDragLeave,
      onDrop,
      handleGroupChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/util';
@import '@/styles/mixins/function';

.my-project {
  position: relative;
  user-select: none;
  height: 100%;

  .project-main {
    display: flex;
    flex: 1;
    // height: 100%;
  }

  .project-manage {
    min-width: 240px;
    max-width: 240px;
    color: #fff;
    position: sticky;
    font-size: 14px;
    overflow-y: auto;
    background-color: var(--datav-home-nav-bg);
    padding: 0 8px;
    top: 0;
    height: calc(100vh - 64px);
    // border-radius: 6px;
    :deep(.n-tree) {
      .n-tree-node.n-tree-node--selected {
        background-image: url(@/assets/img/data-li-bg.png);
        background-repeat: round;
        color: var(--datav-gui-font-color-1);

        .n-tree-node-switcher .n-tree-node-switcher__icon {
          color: var(--datav-gui-font-color-1);
          fill: var(--datav-gui-font-color-1);
        }

        .icon {
          height: 20px;
          fill: var(--datav-gui-font-color-1);
        }
      }
    }

    .manage-main {
      display: flex;
      flex-direction: column;
      font-size: 12px;

      &.draging {
        background: rgb(36 127 255 / 30%);
      }

      :deep(.n-tree) {
        --n-arrow-color: rgb(118 124 130) !important;
        --n-loading-color: #2681ff !important;
        --n-bezier: cubic-bezier(0.4, 0, 0.2, 1) !important;
        --n-font-size: 14px !important;
        --n-node-border-radius: 0 !important;
        --n-node-color-active: rgb(38 129 255 / 22%) !important;
        --n-node-color-hover: rgb(243 243 245 / 5%) !important;
        --n-node-color-pressed: rgb(243 243 245 / 5%) !important;
        --n-node-text-color: rgb(213 213 213) !important;

        .n-tree-node {
          padding: 6px 0;

          .n-base-icon {
            font-size: 19px;
            position: relative;
            right: 3px;
            top: -5px;
          }
        }
      }
    }

    .my-project {
      line-height: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 30px;
    }

    .manage-title {
      .project-group {
        padding-left: 8px;
        height: 56px;
        border-bottom: 1px solid #27343e;

        .new-project {
          display: flex;
          align-items: center;
          font-size: 16px;

          i {
            margin-right: 4px;
          }
        }
      }

      .btn-add-icon {
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: var(--datav-main-color);
        }
      }
    }

    .project-ungrouped {
      color: var(--datav-font-color);
    }

    .project-all {
      padding-left: 50px;
      transition: color 0.2s;
      cursor: pointer;

      &:hover {
        color: var(--datav-main-color);
      }
    }

    .project-checked-color {
      background-repeat: round;

      &:hover {
        color: #fff !important;
      }

      .project-name {
        color: #fff !important;
      }
    }

    .project-num {
      user-select: none;
      color: var(--datav-font-color);
    }

    .group-btns {
      display: none;
      color: var(--datav-main-color);

      i + i {
        margin-left: 10px;
      }
    }

    .main-project {
      position: relative;
      height: 36px;
      padding: 0 30px 0 50px;
      display: flex;
      font-size: 12px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: color 0.2s;

      .project-name {
        width: 100px;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        pointer-events: none;
      }

      &:hover {
        .project-name {
          color: var(--datav-main-color);
        }
      }

      &.drag-enter {
        background: var(--datav-body-bg);
      }
    }

    .group-project {
      &:hover {
        .project-num {
          display: none;
        }

        .group-btns {
          display: inline-block;
        }
      }
    }
  }

  .new-group {
    padding: 5px 30px 5px 50px;
  }

  .edit-input {
    @include utils-ellipsis;

    background: var(--datav-bgcolor-2);
    color: #fff;
    padding: 0 10px;
    line-height: 30px;
    width: 100%;
    height: 30px;
    border: var(--datav-border-primary);
    transition: 0.2s;
    box-shadow: var(--datav-shadow);
  }

  .project-screen-list {
    padding: 0 28px;
    width: 100%;
    margin-top: 20px;
  }
}
</style>
