<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :show-icon="false"
    title="发布模板"
    style="width: 435px;"
    @close="closeDialog"
  >
    <n-spin :show="loading" class="share-setting">
      <n-form ref="formRef" :model="template" :rules="rules">
        <n-form-item path="name" label="名称">
          <n-input v-model:value="template.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="description" label="描述">
          <n-input v-model:value="template.description" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="snapshot" label="截图">
          <g-upload-image v-model="template.snapshot" />
        </n-form-item>
        <div style="display: flex;justify-content: space-between;">
          <n-form-item path="width" label="宽度">
            <n-input-number v-model:value="template.width" disabled @keydown.enter.prevent />
          </n-form-item>
          <n-form-item path="height" label="高度">
            <n-input-number v-model:value="template.height" disabled @keydown.enter.prevent />
          </n-form-item>
        </div>
      </n-form>
      <div class="initial-dialog">
        <n-button
          type="primary"
          :focusable="false"
          class="publish-btn"
          @click="publish"
        >
          发布模板
        </n-button>
      </div>
    </n-spin>
  </n-modal>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, nextTick } from 'vue'
import { useMessage, NForm, NFormItem, NInput } from 'naive-ui'
import { publishTemplate } from '@/api/project'
import { UPDATE_MODEL_EVENT } from '@/utils/constants'

export default defineComponent({
  name: 'PublishTemplate',
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

    const template = ref({
      name: '',
      isSystem: true,
      description: '',
      width: 1920,
      height: 1080,
      config: '',
      snapshot: '',
      coms: '',
    })

    const closeDialog = () => {
      visible.value = false
      formRef.value?.restoreValidation()
      ctx.emit(UPDATE_MODEL_EVENT, false)
    }

    watch(() => props.modelValue, val => {
      if (val) {
        visible.value = true
        template.value.height = props.screen.height
        template.value.width = props.screen.width
        template.value.snapshot = props.screen?.screenshot || ''
      } else {
        visible.value = false
      }
    })

    const publish = async () => {
      formRef.value?.validate(async errors => {
        if (!errors) {
          try {
            loading.value = true
            const data = {
              ...template.value,
            }
            const res = await publishTemplate({
              template: data,
              screen: props.screen,
            })
            if (res.code === 1000) {
              loading.value = false
              closeDialog()
              nMessage.success('发布成功')
            }
          } catch (error) {
            nMessage.error('发布失败')
          } finally {
            loading.value = false
          }
        } else {
        }
      })

    }

    return {
      template,
      visible,
      isPublish,
      showTooltip,
      password,
      closeDialog,
      loading,
      passwordType,
      publish,
      formRef,
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        width: [{ required: true, message: '请输入宽度' }],
        height: [{ required: true, message: '请输入高度' }],
        snapshot: [{ required: true, message: '请上传截图',trigger: ['blur', 'change'] }],
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.share-setting {
  user-select: text;

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
