/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-09-26 09:52:24
 * @LastEditTime : 2024-01-26 10:22:17
 */
import { nextTick } from 'vue'
import { useComStore } from '@/store/com'
import { useEditorStore } from '@/store/editor'
import { useBlueprintStore } from '@/store/blueprint'
import { DatavComponent } from '../_models/datav-component'

export const loadCom = async (com: DatavComponent, isAdd =true) => {
  const comStore = useComStore()
  const blueprintStore = useBlueprintStore()

  com.id = com.id
  com.sortOrder = 1
  comStore.select(com.id)

  if (com.apis.source) {
    await com.loadData()
    nextTick(() => {
      blueprintStore.events[com.id]?.requestData()
    })
  }
  await comStore.add(com, isAdd)
}

export const loadSubComs = async (parentCom: DatavComponent, subComs: DatavComponent[]) => {
  const comStore = useComStore()
  const blueprintStore = useBlueprintStore()
  const editStore = useEditorStore()

  const ps: Promise<any>[] = []
  const ids = []

  subComs.forEach(m => {
    m.parentId = parentCom.id
    m.screenId = editStore.screen.id as number
    if (m.apis.source) {
      ids.push(m.id)
      ps.push(m.loadData())
    }
  })

  if (ps.length > 0) {
    await Promise.all(ps)
    await comStore.addComs(subComs)
    nextTick(() => {
      ids.forEach(id => {
        blueprintStore.events[id]?.requestData()
      })
    })
  }
}
