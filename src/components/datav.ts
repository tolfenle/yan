/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:00
 * @LastEditTime : 2024-01-19 16:15:01
 */
import { cloneDeep, kebabCase } from 'lodash-es'
import { useEditorStore } from '@/store/editor'
import { useComStore } from '@/store/com'
import { generateId } from '@/utils/util'

const correctStr = (str: string) => {
  return str
    .replace('-2-d', '2d')
    .replace('-3-d', '3d')
    .replace(/([a-zA-Z])-([0-9])/g, '$1$2')
}

export async function createComponent(name: string, facom?: any) {
  const modules: Record<string, () => Promise<any>> = import.meta.glob([
    // /chart-component
    '@/components/components-*/**/*.ts',
    '!@/components/_*/**/*',
    '!@/components/ui/**/*',
    '!@/components/*',
  ])

  const editorStore = useEditorStore()

  if (facom?.type === ComType.layer) {
    const comStore = useComStore()
    comStore.createGroup({
      ...facom,
      id: generateId('Group'),
      screenId: editorStore.screen.id,
    })
    return null
  }

  const file = correctStr(kebabCase(name.substring(1)))
  const paths = Object.keys(modules)
  let path = paths.find(m => m.includes(`src/${file}.ts`))
  if (!path) {
    path = paths.find(m => m.includes(`src/${file}/index.ts`))
  }

  if (path) {
    const mod = await modules[path]()
    const comConfig = await new mod.default()

    if (facom?.isCollect) {
      const cCom = cloneDeep(facom)
      comConfig.img = cCom.img
      comConfig.config = cCom.config
      comConfig.children = cCom.children
      comConfig.alias = cCom.alias
      comConfig.animate = cCom.animate
      comConfig.bgImg = cCom.bgImg
      comConfig.events = cCom.events
      comConfig.apiData = cCom.apiData
      comConfig.apis = cCom.apis
      comConfig.attr = cCom.attr
    }
    comConfig.screenId = editorStore.screen.id
    return comConfig
  }

  throw Error(`Unknown component type: ${name}.`)
}
