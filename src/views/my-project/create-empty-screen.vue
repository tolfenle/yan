<script setup lang="ts" name="CreateEmptyScreen">
import { createScreen } from '@/api/screen'
import { useDefaultScreen } from './config'
import { _ } from 'iking-utils'
import { useMessage, NModal, NForm, NFormItem, NInput, NButton, NTreeSelect } from 'naive-ui'
import { useProjectStore } from '@/store/project'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: String,
    defaulr: '',
  },
})

const projectStore = useProjectStore()
const groups = computed(() => projectStore.groups)

const nMessage = useMessage()
const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue', 'request'])
const screenObj = reactive({
  loading: false,
})

const formRef= ref(null)
const screenForm = ref({
  name: '',
  groupId: props.projectId,
})
const rules = {
  name: [{ required: true, message: '请输入大屏名称', trigger: ['blur'] }],
  groupId: [{ required: true, message: '请选择大屏所属项目', trigger: ['change'] }],
}
const handCreateScreen = () => {
  formRef.value?.validate(async err => {
    if (!err) {
      try {
        screenObj.loading = true
        const { name, groupId } = screenForm.value
        const res = await createScreen(_.cloneDeep(useDefaultScreen(name, groupId)))
        if (res.code === 1000) {
          emits('request')
          window.open(`/#/admin/screen/${groupId}/${res.data?.id}`, '_blank')
          handCancel()
        } else {
          nMessage.error(res.message)
        }
        screenObj.loading = false
      } catch (error) {
        screenObj.loading = false
      }
    }
  })
}

const handCancel = () => {
  formRef.value?.restoreValidation()
  screenForm.value.name = ''
  screenForm.value.groupId = props.projectId ?? ''
  emits('update:modelValue', false)
}

</script>

<template>
  <n-modal
    v-model:show="modelValue"
    preset="dialog"
    :show-icon="false"
    title="创建数据大屏"
    style="width: 400px;"
    @close="handCancel"
  >
    <div class="create-dialog">
      <n-form
        ref="formRef"
        :label-width="80"
        label-placement="top"
        :model="screenForm"
        :rules="rules"
        size="small"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="screenForm.name" placeholder="请输入大屏名称" />
        </n-form-item>
        <n-form-item label="所属项目" path="groupId">
          <n-tree-select
            v-model:value="screenForm.groupId"
            :options="groups"
            default-expand-all
            placeholder="请选择大屏所属项目"
            size="small"
            key-field="depId"
            label-field="name"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-button
        :focusable="false"
        @click="handCancel"
      >
        取消
      </n-button>

      <n-button
        type="primary"
        :focusable="false"
        :loading="screenObj.loading"
        @click="handCreateScreen"
      >
        创建
      </n-button>
    </template>
  </n-modal>
</template>
