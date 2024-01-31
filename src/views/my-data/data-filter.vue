<!--
 * @Author: wfl
 * @LastEditors: wfl
 * @description:
 * @updateInfo:
 * @Date: 2022-05-05 16:49:41
 * @LastEditTime: 2022-07-15 10:55:57
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFilterStore } from '@/store/filter'
import DataHeader from './components/data-header.vue'
import { useMessage } from 'naive-ui'
import { IconBox, IconClose, IconDelete, IconEdit } from '@/icons'
import { _ } from 'iking-utils'

const filterStore = useFilterStore()
filterStore.loadFilters()
const filterLists:Ref<any> = ref({})
watch(() => filterStore.dataFilters, val => {
  filterLists.value = _.cloneDeep(filterStore.dataFilters.map(o => {
    return {
      ...o,
      readonly: true,
      editing: false,
      c_origin: o.origin,
    }
  }))
})

const nMessage = useMessage()

const changeCode = (val, mo) => {
  mo.origin = val.value
  if (val.value !== mo.c_origin) {
    mo.readonly = true
  }
}

const handDelete = async mo => {
  await filterStore.delete(mo.id)
}

const handUpdate = async mo => {
  mo.code = `
    if (!data) { return data; }
      return filter(...arguments);
      function filter(data) {
      ${mo.origin}
      return data;
    }`
  await filterStore.update(mo)
}

const loading = ref(false)
const showModal = ref(false)
const filterForm = ref({
  name: '',
  origin: 'return data',
  code: '',
})
const showFilterModal = () => {
  showModal.value = true
}
const handCancle = () => {
  showModal.value = false
  filterForm.value = {
    name: '',
    origin: 'return data',
    code: '',
  }
}
const changeNewCode = code => {
  filterForm.value.origin = code.value
}

const handConfime = async () => {
  loading.value = true
  const res = await filterStore.create({
    ...filterForm.value,
    code: `
    if (!data) { return data; }
      return filter(...arguments);
      function filter(data) {
         ${filterForm.value.origin}
         return data;
    }`,
  } as any)
  if (res.code === 1000) {
    loading.value = false
    filterStore.loadFilters()
    handCancle()
  } else {
    nMessage.error(res.message)
  }
}
</script>

<template>
  <div class="data-filter">
    <DataHeader
      label="新增的过滤器在当前登录用户所有大屏均可使用"
      tip="[修改或删除过滤器时，请确认已使用的组件不会受到影响]"
      @hand-click="showFilterModal"
    />
    <div class="filter-card">
      <div v-for="mo in filterLists" :key="mo.id">
        <p class="filter-name">
          <n-input v-model:value="mo.name" placeholder="输入名称" @blur="handUpdate(mo)" />
        </p>

        <p title="function filter(data) {" class="fake-code --start">
          <span class="--keyword">function</span> filter(data) {
        </p>
        <g-monaco-editor
          v-if="mo.readonly"
          language="javascript"
          :auto-format="true"
          :read-only="true"
          :code="mo.c_origin"
          :height="232"
          @change="changeCode($event, mo)"
        />
        <g-monaco-editor
          v-else
          language="javascript"
          :auto-format="true"
          :read-only="false"
          :code="mo.c_origin"
          :height="232"
          @change="changeCode($event, mo)"
        />
        <div class="fake-code --end">
          }
          <div>
            <n-popconfirm
              @positive-click="handDelete(mo)"
            >
              <template #trigger>
                <n-icon>
                  <IconDelete />
                </n-icon>
              </template>
              确认删除过滤器 [{{ mo.name }}] 吗?
            </n-popconfirm>

            <n-icon @click="mo.readonly = false">
              <IconEdit />
            </n-icon>
            <n-icon @click="handUpdate(mo)">
              <IconBox />
            </n-icon>
          </div>
        </div>
      </div>
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
      <div>新增过滤器</div>
    </template>
    <div>
      <n-form
        ref="formRef"
        :label-width="80"
        label-placement="top"
        :model="filterForm"
        size="small"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="filterForm.name" placeholder="输入配置名称" />
        </n-form-item>
        <n-form-item label="过滤代码" path="origin">
          <div style="width: 100%;">
            <p title="function filter(data) {" class="fake-code --start">
              <span class="--keyword">function</span> filter(data) {
            </p>
            <g-monaco-editor
              language="javascript"
              :auto-format="true"
              :code="filterForm.origin"
              @blur="changeNewCode"
            />
            <div class="fake-code --end">}</div>
          </div>
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
::v-deep(.n-form-item-blank .datav-editor) {
  width: 100%;
}

.data-filter {
  flex: 1;
  padding: 20px 28px 0;
  width: 100%;

  ::v-deep(.datav-editor.--read-only .margin) {
    background-color: #0e1013;
  }

  .filter-card {
    margin-top: 8px;
    display: grid;
    grid-gap: 18px;
    grid-template-columns: repeat(auto-fill, 350px);
    height: 350px;
    overflow-y: auto;

    & > div {
      border-radius: 8px;
      box-shadow: 0 0 11px 2px #00000063;
      margin: 8px;
    }

    .filter-name {
      color: #ccc;
      background: #17191c;
      padding: 8px;
      font-size: 14px;
      border-bottom: 1px solid #202020;
    }
  }
}

.fake-code {
  font-family: Menlo-Regular, monospace;
  color: #ccc;
  padding-left: 8px;
  height: 28px;
  line-height: 28px;
  background: var(--datav-data-form-bgcolor);
  margin-bottom: 0;

  &.--end {
    display: flex;
    justify-content: space-between;
    padding-right: 8px;
  }

  .--keyword {
    color: #569cd6;
  }

  i {
    cursor: pointer;
    padding: 0 5px;
    font-size: 16px;
    transition: all 0.25s linear;
  }

  .jh-shanchu:hover {
    color: #f00;
  }

  .jh-undo:hover,
  .jh-baocun:hover {
    color: #008cff;
  }
}
</style>
