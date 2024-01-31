<template>
  <div :class="['g-aside layer-panel-wp', { '--hide': !visiblePanel }]">
    <div class="layer-manager">
      <div class="layer-manager-top">
        <div class="layer-num">图层</div>
        <div class="layer-layout">
          <n-icon
            title="缩略图版"
            class="btn-icon"
            :class="{ selected: !showText }"
            @click="showText = false"
          >
            <IconViewGrid />
          </n-icon>
          <n-icon
            title="文字版"
            class="btn-icon"
            :class="{ selected: showText }"
            @click="showText = true"
          >
            <IconViewList />
          </n-icon>
          <n-icon
            title="收起"
            class="btn-icon"
            @click="changeVisible"
          >
            <IconBack />
          </n-icon>
        </div>
      </div>
      <div class="layer-toolbar layer-toolbar-top">
        <n-icon
          title="上移一层"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          @click="moveCom(MoveType.up)"
        >
          <IconMoveUp />
        </n-icon>
        <n-icon
          title="下移一层"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          @click="moveCom(MoveType.down)"
        >
          <IconMoveDown />
        </n-icon>
        <n-icon
          title="置顶"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          @click="moveCom(MoveType.top)"
        >
          <IconMoveTop />
        </n-icon>
        <n-icon
          title="置底"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          @click="moveCom(MoveType.bottom)"
        >
          <IconMoveBottom />
        </n-icon>
      </div>
      <div class="layer-manager-wrap">
        <!-- <LayerManagerWrap>
          <template #default="{ com, idx, level }">
            <layer-manager-item
              :com="com"
              :level="level"
              :show-text="showText"
              :class="{
                selected: com.selected && !isDraging
              }"
              @mouseup="selectCom($event, com)"
              @dragstart="dragStart($event, com)"
              @dragend="dragEnd"
              @dragenter.self="dragEnter($event, idx, level, com)"
              @dragover="dragOver"
              @dragGroup="dragGroup"
            />
          </template>
        </LayerManagerWrap> -->
        <!-- TODO draggable -->
        <el-tree
          node-key="id"
          :data="coms"
          :expand-on-click-node="false"
          :default-expanded-keys="expendKeys"
          @node-click="handNodeClick"
          @node-contextmenu="handContextMenu"
          @node-drag-over="dragOver"
          @node-drag-enter="dragEnter"
          @node-collapse="handNodeCollapse"
          @node-expand="handNodeExpend"
        >
          <template #default="{ node, data }">
            <div
              class="custom-tree-node"
              :class="{
                'is-selected': data.selected,
                hided: data.hided,
                locked: data.locked,}"
              @mouseenter="toggleHover(data, 1)"
              @mouseleave="toggleHover(data, 0)"
              @dblclick="toggleRename(data, 1)"
            >
              <div class="icon-alias">
                <template v-if="data.type === ComType.layer">
                  <n-icon class="layer-item-icon">
                    <IconGroup />
                  </n-icon>
                </template>
                <div
                  v-if="data.type === ComType.com"
                  class="layer-item-thumbail"
                  :style="`background-image: url(${data.img})`"
                >
                </div>
                <input
                  v-if="data.renameing"
                  v-model.trim="data.alias"
                  v-focus
                  class="layer-item-input"
                  @blur="toggleRename(data, 0)"
                  @keydown.enter="toggleRename(data, 0)"
                >
                <span
                  v-else
                  class="layer-item-text"
                  :title="data.alias"
                  @dblclick="toggleRename(data, 1)"
                >
                  {{ data.alias }}
                </span>
              </div>
              <span>
                <n-icon v-if="node.data.hided" class="show-toggle-btn" @click="toggleHide(data, 0)">
                  <IconHide />
                </n-icon>
                <n-icon v-if="node.data.locked" class="show-toggle-btn" @click="toggleLock(data, 0)">
                  <IconLock />
                </n-icon>
              </span>
            </div>
          </template>
        </el-tree>
        <div class="last-flex-item" @click="cancelSelected"></div>
        <div
          v-if="dragInfo.visible"
          class="layer-move-to-line"
          :style="{
            width: `calc(100% - ${dragInfo.x}px)`,
            transform: `translate(${dragInfo.x}px, ${dragInfo.y}px)`
          }"
        ></div>
        <div class="draging-wrap"></div>
      </div>
      <div class="layer-toolbar layer-toolbar-bottom">
        <n-icon
          title="成组"
          class="toolbar-icon standard"
          :class="enableGroupBtnClass"
          @click="composeComs"
        >
          <IconGroup />
        </n-icon>
        <n-icon
          title="删除"
          class="toolbar-icon standard"
          :class="enableBtnClass"
          @click="confirmDeleteCom"
        >
          <IconDelete />
        </n-icon>
        <n-icon
          title="锁定"
          class="toolbar-icon standard"
          :class="enableLockBtnClass"
          @click="lockCom"
        >
          <IconLock />
        </n-icon>
        <n-icon
          title="隐藏"
          class="toolbar-icon standard"
          :class="enableHideBtnClass"
          @click="hideCom"
        >
          <IconHide />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
import { DatavComponent, ComType } from '@/components/_models/datav-component'
import { PanelType, useToolbarStore } from '@/store/toolbar'
import { useEditorStore } from '@/store/editor'
import { useComStore } from '@/store/com'
import { MoveType } from '@/domains/editor'
import { macMetaOrCtrl } from '@/utils/util'
import { ElTree } from 'element-plus'
import { NIcon } from 'naive-ui'
import {
  IconViewList,
  IconViewGrid,
  IconBack,
  IconMoveUp,
  IconMoveDown,
  IconMoveTop,
  IconMoveBottom,
  IconLock,
  IconHide,
  IconDelete,
  IconGroup,
} from '@/icons'
import { useContextMenu } from '../editor-context-menu'
import { cloneDeep } from 'lodash-es'

const toolbarStore = useToolbarStore()
const editorStore = useEditorStore()
const comStore = useComStore()
const {
  isLocked,
  isHided,
  disableGroup,
  moveCom,
  lockCom,
  hideCom,
  confirmDeleteCom,
  composeComs,
  showMenu,
} = useContextMenu()

const showText = ref(false)
const visiblePanel = computed(() => toolbarStore.layer.show)
const isDraging = ref(false)
const dragInfo = ref({
  visible: false,
  x: 0,
  y: 0,
  toLevel: 0,
  toIndex: 0,
  toCom: null,
  drop: false,
})

const coms = computed(()=> comStore.coms.filter(com => editorStore.selectedPage?.children.includes(com.id)))
const enableBtn = computed(() => comStore.selectedComs.length > 0)
const enableBtnClass = computed(() => {
  return {
    enable: enableBtn.value,
  }
})

const enableLockBtnClass = computed(() => {
  return {
    enable: enableBtn.value,
    checked: isLocked.value,
  }
})

const enableHideBtnClass = computed(() => {
  return {
    enable: enableBtn.value,
    checked: isHided.value,
  }
})

const enableGroupBtnClass = computed(() => {
  return {
    enable: enableBtn.value && !disableGroup.value,
  }
})

const changeVisible = () => {
  toolbarStore.setPanelState(PanelType.layer, !visiblePanel.value)
}

const selectCom = (ev: MouseEvent, com: DatavComponent) => {
  const isMult = macMetaOrCtrl(ev)
  if (ev.shiftKey && !isMult) {
    comStore.selects(com)
  } else if (!com.selected || (ev.button === 0 && (isMult || comStore.selectedComs.length > 1))) {
    comStore.select(com.id, com.parentId, isMult)
  }
}

const cancelSelected = () => {
  comStore.select('')
}

const dragStart = (ev: DragEvent, com: DatavComponent) => {
  if (editorStore.contextMenu.show || com.renameing) {
    ev.preventDefault()
    return false
  }
  isDraging.value = true
  if (com.selected) {
    const nodewp = document.querySelector('.draging-wrap')
    nodewp.innerHTML = ''
    const nodes = document.querySelectorAll('.layer-manager-wrap .selected')
    nodes.forEach(node => {
      nodewp.appendChild(node.cloneNode(true))
    })
    ev.dataTransfer.setDragImage(nodewp, 0, 1)
  } else {
    comStore.select(com.id, com.parentId)
  }
}

const dragEnd = () => {
  isDraging.value = false
  dragInfo.value.visible = false
  dragInfo.value.drop = false
  const info = dragInfo.value
  comStore.moveTo(info.toLevel, info.toIndex, info.toCom)
  const nodewp = document.querySelector('.draging-wrap')
  nodewp.innerHTML = ''
}

const dragEnter = (node, inNode, ev) => {
  // if (dragInfo.value.drop) {
  //   return
  // }

  // const h = 48
  // const top = ev.clientY - 104
  // const isHalf = top % h > 24
  // const i = isHalf ? Math.ceil(top / h) : Math.floor(top / h)
  // dragInfo.value.visible = true
  // dragInfo.value.y = (i < 0 ? 0 : i) * h
  // dragInfo.value.x = level * 10
  // dragInfo.value.toLevel = level
  // dragInfo.value.toIndex = isHalf ? idx + 1 : idx
  // dragInfo.value.toCom = com
}

const dragOver = (ev: any) => {
  // ev.preventDefault()
  // ev.stopPropagation()
  // ev.dataTransfer.dropEffect = 'copy'
}

const dragGroup = (data: any) => {
  if (data.key === 'enter') {
    dragInfo.value.visible = false
    dragInfo.value.drop = true
  } else if (data.key === 'leave') {
    dragInfo.value.visible = true
    dragInfo.value.drop = false
  } else {
    dragInfo.value.toLevel = data.level
    dragInfo.value.toIndex = 0
    dragInfo.value.toCom = data.com
  }
}

const handContextMenu = (event, com) => {
  comStore.select(com.id)
  showMenu(event, com)
}

const toggleRename = (com, flag: number) => {
  com.renameing = flag === 1
}

const expendSet = ref(new Set())
const expendKeys = computed(()=> Array.from(expendSet.value) as any)
const setExpendKey = (flag, com) => {
  if (flag && com.type === ComType.layer)
    expendSet.value.add(com.id)
}
const toggleHover = (com, flag: number) => {
  com.hovered = com.selected ? false : flag === 1
}

const toggleHide = (com, flag: number) => {
  com.hided = flag === 1
}

const toggleLock = (com, flag: number) => {
  com.locked = flag === 1
}

const handSelected = com => {
  comStore.select(com.id)
}

const handNodeClick = (com, b, el, d) => {
  handSelected(com)
}

const handNodeCollapse = com => {
  expendSet.value.delete(com.id)
}

const handNodeExpend = com => {
  expendSet.value.add(com.id)
}

</script>

<style lang="scss" scoped>
@import './style';

:deep(.el-tree-node__content) {
  height: auto;
  cursor: pointer;
  margin: 8px 0;

  .el-tree-node__expand-icon {
    padding: 3px;
    color: #dfdfdf;
    font-size: 16px;
  }
  // padding-left: 15px !important;
  .el-tree-node__expand-icon.is-leaf {
    padding: 0;
    display: none;
  }

  .layer-item-input {
    width: 100%;
    color: var(--datav-font-color);
    padding: 0 4px;
    height: 20px;
    line-height: 20px;
    background: 0 0;
    border: none;
    outline: 0;
    font-size: 12px;
    text-indent: 2px;

    &:focus {
      color: #fff;
      background: var(--datav-layer-input-bg);
    }
  }

  .layer-item-text {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 91%;
    flex: 1;
  }

  .custom-tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% + 20px);
    border: 1px solid transparent;
    // border-radius: 8px;
    transition: all 0.25s ease-in-out;
    margin-left: -20px;
    background-color: transparent;
    padding: 4px 0 4px 24px;

    &.is-selected {
      border-color: var(--datav-main-color);
      background-color: var(--datav-main-color);
    }

    &.locked,
    .hided {
      color: var(--datav-layer-item-color-locked);
      background: var(--datav-layer-item-bg-locked);
    }

    .icon-alias {
      display: flex;
      align-items: center;
      overflow: hidden;

      .layer-item-thumbail {
        width: 53px;
        height: 34px;
        // flex: none;
        display: block;
        border: var(--datav-border);
        background: var(--datav-layer-item-thumbail-bg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        margin-right: 6px;
      }
    }

    .layer-item-icon {
      font-size: 16px;
      margin-left: 4px;
      margin-right: 4px;
    }
  }
}

</style>
