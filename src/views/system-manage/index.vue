<script setup lang="ts" name="SystemManage">
import { NTree, NCard, NButton, NDropdown, NDataTable, useDialog, useMessage, NUpload, NUploadDragger, NSpin } from 'naive-ui'
import { IconDelete, IconEdit, IconMoreVh } from '@/icons'
import { useProjectStore } from '@/store/project'
import { sysApi } from '@/api/user'
import { ikTree, _ } from 'iking-utils'

const projectStore = useProjectStore()
projectStore.request()

const demparents = computed(() => projectStore.lists)
const demparentist = computed(() => projectStore.groups)
watch(() => projectStore.groups, val => {
  if (!selectDep.value) {
    selectDep.value = val[0]
  }
})
const selectDep = ref()
const handleDepChange = val => {
  selectDep.value = demparents.value.find(v => v.depId === val[0])
  getUserList()
}

const userList = ref([])
const columns = [{
  title: '用户名',
  key: 'username',
},{
  title: '姓名',
  key: 'name',
},{
  title: '昵称',
  key: 'nickName',
},{
  title: '项目名称',
  key: 'departmentName',
},{
  title: '角色',
  key: 'roleName',
},{
  title: '状态',
  key: 'status',
},{
  title: '备注',
  key: 'remark',
},{
  title: '操作',
  key: '',
  width: 260,
  align: 'center',
  render (row) {
    return h('div', {}, [
      h(NButton,
        {
          strong: true,
          quaternary: true,
          size: 'small',
          onClick: () => { },
        },
        { default: () => '转移' }),
      h(NButton,
        {
          strong: true,
          quaternary: true,
          size: 'small',
          onClick: () => { },
        },
        { default: () => '编辑' }),
      h(NButton,
        {
          strong: true,
          quaternary: true,
          size: 'small',
          type:'warning',
          onClick: () => { },
        },
        { default: () => '删除' })])
  },
}]
const paginationReactive = reactive({
  page: 1,
  pageSize: 20,
  showSizePicker: true,
  pageSizes: [20, 40, 60],
  onChange: (page: number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  },
})
const getUserList = async () => {
  try {
    const res = await sysApi.getUserList({
      order: 'createTime',
      sort: 'desc',
      departmentId: selectDep.value?.depId,
      page: paginationReactive.page,
      size: paginationReactive.pageSize,
    })
    if (res.code === 1000) {
      userList.value = res.data?.list || []
    } else {
      nMessage.error(res.message)
      userList.value = []
    }
  } catch (error) {
    nMessage.error(error.message)
  }
}
getUserList()

const enum DepOper{
  新建子项目 = 'newProject',
  重命名 = 'rename',
  移动 = 'move',
  删除 = 'delete',
}

const addDepRef = ref(null)
const depObj = reactive({
  addModal: false,
  renameModal: false,
  moveModal: false,
  editing: false,
  addRules: {
    name: [{ required: true, message: '请输入项目名称', trigger: ['change'] }],
  },
  demparent: {
    name: '',
    parentId: '',
  },
  depRename: {
    name: '',
    id: '',
  },
})
const nDialog = useDialog()
const renderSuffix =  ({ option }: { option: TreeOption; })=> {
  return h(
    NDropdown,
    {
      text: true,
      class: 'dep-tree-suffix',
      trigger: 'click',
      placement: 'right-start',
      options: [{
        label: '新建子项目',
        key: DepOper.新建子项目,
      },
      {
        label: '重命名',
        key: DepOper.重命名,
      },
      {
        label: '移动',
        key: DepOper.移动,
      },
      {
        label: '删除',
        key: DepOper.删除,
      }],
      onSelect: key => {
        switch (key) {
          case DepOper.新建子项目:
            depObj.addModal = true
            depObj.demparent.parentId = selectDep.value?.depId
            break
          case DepOper.重命名:
            depObj.demparent.parentId = selectDep.value?.parentId
            depObj.demparent.name = selectDep.value?.name
            depObj.addModal = true
            depObj.editing = true
            break
          case DepOper.移动:
            depObj.moveModal = true
            break
          case DepOper.删除:
            const d = nDialog.create({
              content: `删除后此项目下的用户将被移动至父项目，确认删除？`,
              negativeText: '取消',
              positiveText: '确定',
              showIcon: false,
              onPositiveClick: async () => {
                d.loading = true
                try {
                  const res = await sysApi.deleteDep({
                    ids: [selectDep.value.depId],
                    deleteUser: false,
                  })
                  if (res.code === 1000) {
                    projectStore.request()
                    getUserList()
                  }
                  else
                    nMessage.warning(res.message)
                } catch (error) {
                  nMessage.error(error.message)
                }
              },
            })
            break
          default:
            break
        }

      },
    },
    { default: () => h(IconMoreVh) },
  )
}

const addUpdateDep = () => {
  addDepRef.value?.validate(async err => {
    if (!err) {
      const res = depObj.editing ? await sysApi.updateDep({
        id: selectDep.value.id,
        ...depObj.demparent,
      }) : await sysApi.addDep(depObj.demparent)
      if (res.code === 1000) {
        projectStore.request()
        addDepRef.value?.restoreValidation()
        depObj.addModal = false
      } else {
        nMessage(res.message)
      }
    }
  })
}
</script>

<template>
  <div class="datav-sys-manage">
    <n-card title="">
      <template #header>
        <div class="manage-title">
          <div class="my-project project-group">
            <span class="new-project">
              <n-icon class="btn-add-icon">
                <IconMyData />
              </n-icon>
              项目列表
            </span>
          </div>
        </div>
      </template>
      <n-tree
        block-line
        :data="demparentist"
        default-expand-all
        key-field="depId"
        label-field="name"
        selectable
        :render-suffix="renderSuffix"
        @update:selected-keys="handleDepChange"
      />
    </n-card>
    <n-card title="用户列表">
      <template #header>
        <div class="manage-title">
          <div class="my-project project-group">
            <span class="new-project">
              <n-icon class="btn-add-icon">
                <IconMyData />
              </n-icon>
              用户列表
            </span>
          </div>
        </div>
        <n-data-table
          :columns="columns"
          :data="userList"
          :pagination="paginationReactive"
          :bordered="false"
        />
      </template>
    </n-card>

    <n-modal
      v-model:show="depObj.addModal"
      preset="dialog"
      :show-icon="false"
      :title="depObj.editing ? '重命名' : '新增项目'"
      style="width: 435px;"
    >
      <n-form
        ref="addDepRef"
        label-placement="left"
        label-width="80px"
        require-mark-placement="left"
        :model="depObj.demparent"
        :rules="depObj.addRules"
      >
        <n-form-item path="" label="父级项目">
          <n-input
            v-if="depObj.editing"
            v-model:value="selectDep.parentName"
            disabled
            @keydown.enter.prevent
          />
          <n-input
            v-else
            v-model:value="selectDep.name"
            disabled
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="name" label="项目名称">
          <n-input
            v-model:value="depObj.demparent.name"
            placeholder="请输入项目名称"
            clearable
            @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
      <div style="text-align: right;">
        <n-button
          type="primary"
          :focusable="false"
          @click="addUpdateDep"
        >
          确定
        </n-button>
      </div>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>

.datav-sys-manage {
  display: flex;
  // padding: 20px 24px;
  height: calc(100% - 10px);

  .n-card {
    border: none;
    background: transparent;
    // border-radius: 6px;
    .n-card-header {
      padding: 0;
    }

    .manage-title {
      .project-group {
        padding-left: 8px;
        height: 56px;
        display: flex;
        border-bottom: 1px solid #27343e;

        .new-project {
          display: flex;
          align-items: center;
          color: #fff;
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

    &:first-child {
      width: 240px;
      margin-right: 16px;
      background-color: var(--datav-home-nav-bg);

      :deep(.n-tree-node) {
        font-size: 15px;
        padding: 4px 0;

        .n-tree-node-content__suffix {
          .icon {
            height: 0;
            fill: var(--datav-gui-font-color-1);
            transition: height 0.25s ease;
          }
        }

        &:hover {
          .icon {
            height: 20px;
            fill: var(--datav-gui-font-color-1);
          }
        }

        &.n-tree-node--selected,
        &.n-tree-node--pending {
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
    }
  }

  .n-data-table {
    --n-merged-th-color: rgb(38 38 42 / 0%);
    --n-merged-td-color: rgb(24 24 28 / 24%);
    --n-merged-border-color: rgb(45 45 48 / 38%);
    --n-merged-th-color-hover: rgb(51 51 55 / 44%);
    --n-merged-td-color-hover: rgb(38 38 42 / 17.1%);
    --n-merged-td-color-striped: rgb(36 36 39 / 48%);

    .n-data-table-thead {
      background-color: rgb(5 8 15 / 42%);
    }
  }
}
</style>

<style lang="scss">
.dep-tree-suffix {
  box-shadow: 0 0 9px 0 #00000070;

  .n-dropdown-option-body__label {
    &::before {
      content: '·';
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
