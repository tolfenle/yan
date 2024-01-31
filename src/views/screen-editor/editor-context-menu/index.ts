
import { reactive, computed, h } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import { useEditorStore } from '@/store/editor'
import { useComStore } from '@/store/com'
import { DatavComponent, ComType } from '@/components/_models/datav-component'
import { on, off } from '@/utils/dom'
import { MoveType } from '@/domains/editor'
import { IconWarning } from '@/icons'
import { copyText } from '@/utils/util'
import { cloneDeep } from 'lodash-es'

const pos = reactive({ x: 0, y: 0 })

export const useContextMenu = () => {
  const nMessage = useMessage()
  const nDialog = useDialog()
  const comStore = useComStore()
  const editorStore = useEditorStore()

  const isLocked = computed(() => comStore.selectedComs.every(m => m.locked))
  const isHided = computed(() => comStore.selectedComs.every(m => m.hided))
  const isGroup = computed(() => {
    return comStore.selectedComs.every(com => com.type === ComType.layer)
  })
  const disableGroup = computed(() => {
    return false
    const coms = comStore.selectedComs
    const pid = coms[0]?.parentId
    if (pid) {
      // 判断是否是子组
      if (coms.some(m => m.type === ComType.layer)) {
        return true
      }

      // 查找一级列表，判断父级是一级还是二级
      return !comStore.coms.find(m => m.id === pid)

    }

    // 全是一级时，判断是否有子组
    return coms.some(m => m.children?.some(s => s.type === ComType.layer))
  })

  const moveCom = (moveType: MoveType) => {
    const coms = comStore.selectedComs
    if (coms.length === 0) {
      return
    }

    const pid = coms[0].parentId
    const ids = coms.map(m => m.id)
    ids.forEach(id => {
      comStore.move(moveType, id, pid)
    })
  }

  const lockCom = () => {
    const coms = comStore.selectedComs
    if (coms.length === 0) {
      return
    }
    const locked = !isLocked.value
    coms.forEach(com => {
      com.locked = locked
    })
  }

  const hideCom = () => {
    const coms = comStore.selectedComs
    if (coms.length === 0) {
      return
    }
    const hided = !isHided.value
    coms.forEach(com => {
      com.hided = hided
    })
  }

  const confirmDeleteCom = () => {
    const coms = comStore.selectedComs
    if (coms.length === 0) {
      return
    }
    const names = coms.map(m => m.alias)
    const d = nDialog.create({
      content: `删除后无法恢复，是否删除${names.join('，')}，共${names.length}个组件`,
      negativeText: '取消',
      positiveText: '确定',
      iconPlacement: 'top',
      icon: () => h(IconWarning),
      onPositiveClick: async () => {
        d.loading = true
        try {
          await comStore.deletes(coms)
        } catch (error) {
          nMessage.error(error.message)
        }
      },
    })
  }

  const renameCom = () => {
    comStore.selectedComs[0].renameing = true
  }

  const copyCom = () => {
    comStore.selectedComs.forEach((com: any) => {
      comStore.copy(com)
    })
  }

  const copyComToScreen = () => {
    if (comStore.selectedComs?.length > 1) {
      nMessage.info('每次仅可复制一个组件/组合')
      return
    }
    const com = cloneDeep(comStore.selectedComs[0])
    const JSONStr = JSON.stringify(com)
    copyText(JSONStr)
    nMessage.success('复制成功')
  }

  const handCopyComToPage = async () => {
    if (comStore.selectedComs?.length > 1) {
      nMessage.info('请选择一个组件/组合粘贴')
      return
    }
    const pasteJson = await navigator.clipboard.readText()
    if (!pasteJson) {
      Message.info('无可用粘贴配置')
      return
    }
    const pasteContent = JSON.parse(pasteJson)
    const selectCom = comStore.selectedComs[0]

    const index = comStore.coms.findIndex(com => com.id === selectCom.id)
    if (index > -1) {
      comStore.coms[index] = {
        ...pasteContent,
        attr: {
          ...selectCom.attr,
          w: pasteContent.attr.w,
          h: pasteContent.attr.h,
        },
        id: selectCom.id,
      }
    }
  }

  const composeComs = () => {
    const coms = comStore.selectedComs
    if (coms.length === 0) {
      return
    }
    comStore.createGroup()
  }

  const decomposeComs = () => {
    const coms = comStore.selectedComs
    if (coms.length === 0) {
      return
    }
    comStore.cancelGroup()
  }

  const showMenu = (ev: MouseEvent, com: DatavComponent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (!com.selected) {
      return
    }

    pos.x = ev.clientX
    pos.y = ev.clientY
    editorStore.contextMenu.show = true

    on(document, 'click', hideMenu)
  }

  const hideMenu = () => {
    off(document, 'click', hideMenu)

    editorStore.contextMenu.show = false
  }

  return {
    pos,
    isLocked,
    isHided,
    isGroup,
    disableGroup,
    showMenu,
    hideMenu,
    moveCom,
    lockCom,
    hideCom,
    confirmDeleteCom,
    renameCom,
    copyCom,
    composeComs,
    decomposeComs,
    copyComToScreen,
    handCopyComToPage,
  }
}
