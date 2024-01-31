<script setup lang="ts">
import { defineComponent, computed, ref, watch, toRef } from 'vue'
import type { CSSProperties, PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { ElDialog, ElButton } from 'element-plus'
import { useToolbarStore } from '@/store/toolbar'
import { useEditorStore } from '@/store/editor'
import { useComStore } from '@/store/com'
import { createComponent } from '@/components/datav'
import { ComType } from '@/components/_models/datav-component'
import { loadCom } from '@/components/_utils/component-util'
import { on, off } from '@/utils/dom'
import { checkRectIntersect } from '@/utils/editor'
import { warn } from '@/utils/warn-util'
import CanvasArea from '../../../../views/screen-editor/canvas-main/canvas-area.vue'
import DatavTransform from '../../../../views/screen-editor/canvas-main/datav-transform/index.vue'
import { useContextMenu } from '../../../../views/screen-editor/editor-context-menu'
import { Dialog } from './dialog'

const props = defineProps({
  com: {
    type: Object as PropType<Dialog & any>,
    required: true,
  },
})

const editorStore = useEditorStore()
const { hideMenu } = useContextMenu()

const { pageConfig, canvas } = storeToRefs(editorStore)
const { setUrl } = useEnvUrl()
const canvasPanelStyle = computed(() => {
  const bg: any = {}
  if (pageConfig.value.bgimage) {
    bg.backgroundImage = `url(${setUrl(pageConfig.value.bgimage)})`
  } else {
    if (pageConfig.value.bgcolor.includes('gradient'))
      bg.backgroundImage = pageConfig.value.bgcolor
    else
      bg.backgroundColor = pageConfig.value.bgcolor
  }
  return {
    width: `${pageConfig.value.width}px`,
    height: `${pageConfig.value.height}px`,
    transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
    ...bg,
  } as CSSProperties
})

const config = toRef(props.com, 'config')
const attr = toRef(props.com, 'attr')
const wrapperStyle = computed(() => {
  return {
    width: `${attr.value.w * canvas.value.scale}px`,
    height: `${attr.value.h * canvas.value.scale}px`,
  }
})

const toolbarStore = useToolbarStore()
const dropToAddCom = async (ev: DragEvent) => {
  ev.preventDefault()

  try {
    const name = ev.dataTransfer.getData('text')
    if (name) {
      toolbarStore.addLoading()
      let com = await createComponent(name)
      const { scale } = canvas.value
      const { left, top } = toolbarStore.getPanelOffset
      const canvasWp = document.getElementById('canvas-wp')
      const scrollLeft = canvasWp?.scrollLeft || 0
      const scrollTop = canvasWp?.scrollTop || 0
      const offsetLeft = (scrollLeft + ev.clientX - left) / scale
      const offsetTop = (scrollTop + ev.clientY - top) / scale
      com.attr.x = Math.round(offsetLeft - com.attr.w / 2)
      com.attr.y = Math.round(offsetTop - com.attr.h / 2)
      com.parentId = props.com.id
      await loadCom(com, false)
      if (!props.com?.children) {
        props.com.children = [com]
      } else {
        props.com.children.push(com)
      }
      toolbarStore.removeLoading()
    }
  } catch(error) {
    warn('dropToAddCom', error.message)
  }
}

const dragOver = (ev: DragEvent) => {
  ev.preventDefault()
  ev.stopPropagation()
  ev.dataTransfer.dropEffect = 'copy'
}

// const comStore = useComStore()
const coms = computed(() => {
  return (props.com?.children || [])
})

const dialogVisible = ref(true)

watch(() => props.com.hided, bool => {
  dialogVisible.value = bool
})

</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    title="新建弹窗"
    :modal="false"
    append-to="#iking-editor-main"
    draggable
    align-center
    custom-class="design-dialog"
    :close-on-click-modal="false"
  >
    <div
      id="canvas-coms-dialog"
      class="canvas-panel"
      :style="wrapperStyle"
      @dragover="dragOver"
      @drop="dropToAddCom"
    >
      <transition-group name="list">
        <datav-transform v-for="com in coms" :key="com.id" :com="com" />
      </transition-group>
    </div>
    <!-- <align-line /> -->
    <!-- <ruler /> -->
  </ElDialog>
</template>
<style lang="scss">
.design-dialog {
  margin: 0;

  .el-dialog__body {
    height: 100%;
    width: 100%;
    padding: 0;

    .canvas-coms-dialog {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
