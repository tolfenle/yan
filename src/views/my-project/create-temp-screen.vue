<script setup lang="ts" name="CreateTempScreen">
import { createScreenByTemplate } from '@/api/screen'
import { IconArrowLeft, IconArrowRight, IconBack, IconPlus } from '@/icons'
import { _ } from 'iking-utils'
import { useMessage, NModal, NForm, NFormItem, NInput, NButton, NTreeSelect } from 'naive-ui'
import { useProjectStore } from '@/store/project'
import { ProjectTemplate } from '@/domains/project'
import { scrollToLeft } from '@/utils/scroll-util'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: String,
    defaulr: '',
  },
  useTemplate: {
    type: Object as PropType<ProjectTemplate>,
    default: () => { },
  },
  templates: {
    type: Array as PropType<ProjectTemplate[]>,
    default: () => [],
  },
})

const projectStore = useProjectStore()
const groups = computed(() => projectStore.groups)

const { setUrl } = useEnvUrl()
const template = ref<Partial<ProjectTemplate> | null>({})
watch(() => props.modelValue, bool => {
  if (bool) {
    template.value = {
      ...props.useTemplate,
      snapshot: setUrl(props.useTemplate.snapshot),
    }
  }
})

const templatesList = computed(() => props.templates)

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
        const res = await createScreenByTemplate({
          name,
          groupId,
          templateId: template.value?.id,
        })
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

const scrollRef = ref<any>(null)
const togglePreviewTemplate = (tpl: ProjectTemplate, idx: number) => {
  template.value = tpl
  scrollToLeft(149 * idx - 350, {
    getContainer: () => scrollRef.value,
  })
}

const prevPreviewTemplate = () => {
  const idx = props.templates.findIndex(m => m.id === template.value.id)
  if (idx > 0) {
    const nidx = idx - 1
    const tpl = props.templates[nidx]
    togglePreviewTemplate(tpl, nidx)
  }
}

const nextPreviewTemplate = () => {
  const idx = props.templates.findIndex(m => m.id === template.value.id)
  if (idx < props.templates.length - 1) {
    const nidx = idx + 1
    const tpl = props.templates[nidx]
    togglePreviewTemplate(tpl, nidx)
  }
}

</script>

<template>
  <n-modal
    v-model:show="modelValue"
    preset="dialog"
    :show-icon="false"
    title="使用模板创建"
    style="width: 1100px; padding-bottom: 0;"
    @close="handCancel"
  >
    <div class="preview-dialog">
      <div class="preview-list">
        <div class="blur-wp">
          <div ref="scrollRef" class="scroll-wp">
            <div
              v-for="(tpl, idx) in templatesList"
              :key="tpl?.id"
              class="preview-wp"
              :class="{ selected: tpl?.id === template.id }"
              @click="togglePreviewTemplate(tpl, idx)"
            >
              <img v-lazy="tpl.snapshot" class="preview-small-img">
              <div class="preview-screen-name">{{ tpl.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="preview-gif">
        <div class="gif-wp">
          <img v-lazy="template.snapshot" class="snapshot-gif">
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
          <n-button
            type="primary"
            size="tiny"
            :focusable="false"
            icon-placement="right"
            :loading="screenObj.loading"
            class="preview-create-btn"
            @click="handCreateScreen"
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

<style lang="scss" scoped>
@import "@/styles/mixins/function.scss";

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
  height: 115px;
  pointer-events: none;
  z-index: 1;
}

.preview-dialog {
  margin-top: -10px;
  margin-bottom: -40px;

  .template-desc {
    margin-bottom: 20px;
    opacity: 0.8;
    overflow: hidden;
    -webkit-line-clamp: 3;
    display: box;
    -webkit-box-orient: vertical;
  }

  .preview-list {
    width: 1100px;
    height: 120px;
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
    padding-top: 8px;

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

      .preview-create-btn {
        width: 100%;
      }
    }
  }
}
</style>
