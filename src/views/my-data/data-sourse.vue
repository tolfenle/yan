<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-05-05 16:49:41
 * @LastEditTime: 2022-07-14 14:31:49
-->
<script setup lang="ts">
import { computed, Ref, ref, toRaw } from 'vue'
import DataHeader from './components/data-header.vue'
import { connecting, dbApi } from '@/api/datebase'
import { useDBStore } from '@/store/db'
import { useDialog, useMessage } from 'naive-ui'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const nMessage = useMessage()
const dialog = useDialog()
const dbStore = useDBStore()
dbStore.loadDbs()
const loading = ref(false)
const showModal = ref(false)
const formRef = ref(null)
const baseTypes = ref([])
const sourseForm: Ref<{
  type: string | number
  name: string
  host: string
  port: number
  username: string
  password: string
  id?: string
}> = ref({
  type: '',
  name: '',
  host: '',
  port: 3306,
  username: '',
  password: '',
})
const rules = [];

(async () => {
  const res = await dbApi.getSqltype()
  if (res.code === 1000) {
    sourseForm.value.type = res.data[0].type
    baseTypes.value = res.data.map(d => {
      return {
        label: d.name,
        value: d.type,
      }
    })
  } else {
  }
})()

const sourceList = computed(() => dbStore.dbList)

const showSourseModal = () => {
  showModal.value = true
}

const handCancle = () => {
  showModal.value = false
  loading.value = false
  sourseForm.value = {
    type: '',
    name: '',
    host: '',
    port: 3306,
    username: '',
    password: '',
  }
}

const handConfime = async () => {
  const user = userStore.user
  loading.value = true
  const res = sourseForm.value.id
    ? await dbApi.updateDb(sourseForm.value)
    : await dbApi.addDb(sourseForm.value)
  if (res.code === 1000) {
    handCancle()
    dbStore.loadDbs()
  }
  loading.value = false
}

const checkConnect = async () => {
  loading.value = true
  const res = await connecting(toRaw(sourseForm.value))
  if (res?.code === 1000) {
    nMessage.success(res?.message)
  } else {
    nMessage.error(res?.message)
  }
  loading.value = false
}

const handleClose = d => {
  dialog.warning({
    title: '警告',
    content: '你确定删除该数据源吗？',
    positiveText: '确定',
    negativeText: '取消',
    showIcon: false,
    onPositiveClick: async () => {
      const res = await dbApi.deleteDb(d.id)
      if (res?.code === 1000) {
        dbStore.loadDbs()
      } else {
      }
    },
  })
}

const checkConnecting = d => {
  connecting(d)
}

const handEdit = d => {
  sourseForm.value = d
  showModal.value = true
}
</script>

<template>
  <div class="data-source">
    <DataHeader
      label="添加的数据源在当前登录用户所有大屏均可使用"
      @hand-click="showSourseModal"
    />
    <div class="data-source-card">
      <n-card
        v-for="d in sourceList"
        :key="d.host"
        :hoverable="true"
        :title="d.name"
        closable
        @close="handleClose(d)"
      >
        <ul @click="handEdit(d)">
          <li>
            <b>{{ d.type }}</b>
          </li>
          <li>{{ d.host }}</li>
          <li>{{ d.port }}</li>
          <li>{{ d.username }}</li>
          <li>{{ d.password.replace(/\S/g, "*") }}</li>
        </ul>
      </n-card>
    </div>
  </div>

  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="Dialog"
  >
    <template #header>
      <div>新增数据源配置</div>
    </template>
    <div>
      <n-form
        ref="formRef"
        :label-width="80"
        label-placement="top"
        :model="sourseForm"
        :rules="rules"
        size="small"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="sourseForm.name" placeholder="输入配置名称" />
        </n-form-item>
        <n-form-item label="数据源" path="type">
          <n-select v-model:value="sourseForm.type" :options="baseTypes" />
        </n-form-item>
        <n-form-item label="地址" path="host">
          <n-input v-model:value="sourseForm.host" placeholder="输入数据库地址" />
        </n-form-item>
        <n-form-item label="端口" path="port">
          <n-input v-model:value="sourseForm.port" placeholder="输入数据库端口" />
        </n-form-item>
        <n-form-item label="用户名" path="username">
          <n-input v-model:value="sourseForm.username" placeholder="输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input
            v-model:value="sourseForm.password"
            type="password"
            placeholder="输入密码"
          />
          <n-button
            attr-type="button"
            :disabled="loading"
            :loading="loading"
            style="margin-left: 8px;"
            @click="checkConnect"
          >
            测试连接
          </n-button>
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-button :disabled="loading" @click="handCancle">取消</n-button>
      <n-button type="primary" :disabled="loading" @click="handConfime"> 确定 </n-button>
    </template>
  </n-modal>
</template>

<style lang="scss" scoped>
.data-source {
  flex: 1;
  padding: 20px 28px 0;
  width: 100%;

  .data-source-card {
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 15px;
    margin: 15px 0;
    height: calc(100vh - 355px);
    grid-template-rows: 280px;

    .n-card {
      cursor: pointer;
      border-radius: 8px;
      box-shadow: 0 0 11px 2px #00000063;
      background: #17191c;

      &.n-card--bordered {
        border: none;
      }

      ul {
        line-height: 27px;
      }

      li:not(:last-child) {
        border-bottom: 1px solid rgb(95 95 95 / 9%);
        padding: 8px 0;
      }
    }
  }
}
</style>
