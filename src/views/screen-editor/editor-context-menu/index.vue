<template>
  <div class="context-menu-wrap" :style="contextMenuStyle">
    <div class="context-menu-item" @click="moveCom(MoveType.top)">
      <n-icon class="menu-icon">
        <IconMoveTop />
      </n-icon>
      置顶
    </div>
    <div class="context-menu-item" @click="moveCom(MoveType.bottom)">
      <n-icon class="menu-icon">
        <IconMoveBottom />
      </n-icon>
      置底
    </div>
    <div class="context-menu-item" @click="moveCom(MoveType.up)">
      <n-icon class="menu-icon">
        <IconMoveUp />
      </n-icon>
      上移一层
    </div>
    <div class="context-menu-item" @click="moveCom(MoveType.down)">
      <n-icon class="menu-icon">
        <IconMoveDown />
      </n-icon>
      下移一层
    </div>

    <div class="context-menu-divider"></div>

    <div class="context-menu-item" :class="{ disable: disableGroup }" @click="composeComs">
      <n-icon class="menu-icon">
        <IconGroup />
      </n-icon>
      成组
    </div>
    <div class="context-menu-item" :class="{ disable: !isGroup }" @click="decomposeComs">
      <n-icon class="menu-icon">
        <IconUngroup />
      </n-icon>
      取消成组
    </div>

    <div class="context-menu-divider"></div>

    <div class="context-menu-item" @click="lockCom">
      <template v-if="isLocked">
        <n-icon class="menu-icon">
          <IconUnlock />
        </n-icon>
        解锁
      </template>
      <template v-else>
        <n-icon class="menu-icon">
          <IconLock />
        </n-icon>
        锁定
      </template>
    </div>
    <div class="context-menu-item" @click="hideCom">
      <template v-if="isHided">
        <n-icon class="menu-icon">
          <IconShow />
        </n-icon>
        显示
      </template>
      <template v-else>
        <n-icon class="menu-icon">
          <IconHide />
        </n-icon>
        隐藏
      </template>
    </div>

    <div class="context-menu-divider"></div>

    <div class="context-menu-item" @click="renameCom">
      <n-icon class="menu-icon">
        <IconEdit />
      </n-icon>
      重命名
    </div>
    <div class="context-menu-item" @click="copyCom">
      <n-icon class="menu-icon">
        <IconCopy />
      </n-icon>
      复制
    </div>
    <div class="context-menu-item" @click="copyComToScreen">
      <n-icon class="menu-icon">
        <IconCopy />
      </n-icon>
      复制至其它屏
    </div>
    <div class="context-menu-item" @click="handCopyComToPage">
      <n-icon class="menu-icon">
        <IconCopy />
      </n-icon>
      粘贴
    </div>
    <div class="context-menu-item" @click="confirmDeleteCom">
      <n-icon class="menu-icon">
        <IconDelete />
      </n-icon>
      删除
    </div>

    <div class="context-menu-divider"></div>
    <div class="context-menu-item" @click="collectComConfig">
      <n-icon class="menu-icon">
        <IconFavorite />
      </n-icon>
      收藏组件
    </div>
    <div class="context-menu-item" @click="exportComConfig">
      <n-icon class="menu-icon">
        <IconShapeArrow />
      </n-icon>
      导出配置
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="Dialog"
    style="width: 1000px;"
  >
    <template #header>
      <div>图表配置</div>
    </template>
    <g-monaco-editor
      language="javascript"
      :auto-format="true"
      :code="comConfig"
      :height="800"
    />
  </n-modal>

  <n-modal
    v-model:show="collectModal"
    :mask-closable="false"
    preset="dialog"
    :show-icon="false"
    title="收藏组件"
  >
    <div>
      <n-form
        ref="formRef"
        :label-width="80"
        label-placement="top"
        :model="collectForm"
        :rules="rules"
        size="small"
      >
        <n-form-item label="名称" path="alias">
          <n-input v-model:value="collectForm.alias" placeholder="输入收藏组件名称" />
        </n-form-item>
        <n-form-item label="预览图" path="img">
          <g-upload-image v-model="collectForm.img" />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <n-button :disabled="collectLoaing" @click="handCancle">取消</n-button>
      <n-button type="primary" :loading="collectLoaing" @click="handCollect"> 确定 </n-button>
    </template>
  </n-modal>
</template>

<script lang='ts' setup>
import { computed, onBeforeMount, onUnmounted } from 'vue'
import { cloneDeep } from 'lodash-es'
import { useEditorStore } from '@/store/editor'
import { on, off } from '@/utils/dom'
import { MoveType } from '@/domains/editor'
import {
  IconMoveUp,
  IconMoveDown,
  IconMoveTop,
  IconMoveBottom,
  IconLock,
  IconUnlock,
  IconShow,
  IconHide,
  IconCopy,
  IconEdit,
  IconDelete,
  IconGroup,
  IconUngroup,
  IconShapeArrow,
  IconFavorite,
} from '@/icons'
import { useMessage, NModal, NButton, NForm, NFormItem, NInput } from 'naive-ui'
import { useContextMenu } from './index'
import { useComStore } from '@/store/com'

const editorStore = useEditorStore()
const {
  pos,
  isLocked,
  isHided,
  isGroup,
  disableGroup,
  moveCom,
  lockCom,
  hideCom,
  confirmDeleteCom,
  renameCom,
  copyCom,
  copyComToScreen,
  handCopyComToPage,
  composeComs,
  decomposeComs,
} = useContextMenu()

const contextMenuStyle = computed(() => {
  return {
    display: editorStore.contextMenu.show ? 'block' : 'none',
    left: `${pos.x + 10}px`,
    top: `${pos.y + 10}px`,
    transform: document.documentElement.clientHeight - pos.y < 250
      ? 'translate(0px, -100%)'
      : '',
  }
})

const handleContextmenu = (ev: Event) => ev.preventDefault()

const message = useMessage()
const comConfig = ref()
const showModal = ref(false)

const comStore = useComStore()
const collectModal = ref(false)
const collectLoaing = ref(false)
const formRef = ref()
const rules = {
  alias: [{ required: true, message: '请输入收藏组件名称' }],
  img: [{ required: true, message: '请上传组件预览图' }],
}
const collectForm = ref({
  alias: '',
  img: '',
})
const handCancle = () => {
  formRef.value?.restoreValidation()
  collectLoaing.value = false
  collectModal.value = false
}
const handCollect = async () => {
  formRef.value?.validate(async errors => {
    if (!errors) {
      collectLoaing.value = true
      const res = await comStore.collectionComponent({
        ...comStore.selectedComs[0],
        ...collectForm.value,
      } as any)
      if (res.code === 1000) {
        message.success('收藏成功')
        handCancle()
      } else {
        message.warning(res.message)
      }
      collectLoaing.value = false
    }
  })
}
// 收藏组件
const collectComConfig = async () => {
  const len = comStore.selectedComs.length
  if(!len) return
  if (comStore.selectedComs.length > 1) {
    message.warning('一次仅可收藏一个组件')
    return
  }
  collectModal.value = true
  // const res = await comStore.collectionComponent(comStore.selectedComs[0])
  // if (res.code === 1000) {
  //   message.success('收藏成功')
  // } else {
  //   message.warning(res.message)
  // }
}

// 导出图标配置
const exportComConfig = () => {
  const comStore = useComStore()
  if (comStore.selectedComs.length > 1) {
    message.info('一次仅可导出一个图表配置')
    return
  }
  const config = cloneDeep(comStore.selectedComs[0].config)
  delete config.generate
  delete config.quickly
  delete config.bar
  delete config.line

  comConfig.value = JSON.stringify(config)
  showModal.value = true
}

onBeforeMount(() => {
  on(document, 'contextmenu', handleContextmenu)
})

onUnmounted(() => {
  off(document, 'contextmenu', handleContextmenu)
})
</script>

<style lang="scss" scoped>
.context-menu-wrap {
  position: fixed;
  z-index: 9999;
  display: none;
  width: 111px;
  color: var(--datav-font-color);
  background: #111417;
  user-select: none;
  border-radius: 8px;
  overflow: hidden;
}

.context-menu-item {
  display: flex;
  height: 28px;
  padding: 0 6px;
  padding-right: 1em;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  border-left: 2px solid transparent;

  &:hover {
    color: var(--datav-menu-color-hover);
    background-color: var(--datav-menu-bg-hover);
    border-left: 2px solid var(--datav-menu-color-hover);
  }

  .menu-icon {
    margin-right: 4px;
    font-size: 14px;
  }

  &.disable {
    color: var(--datav-menu-color-disabled);
    pointer-events: none;
    cursor: auto;
  }
}

.context-menu-divider {
  width: 100%;
  height: 1px;
  background-color: #3a46595c;
}
</style>
