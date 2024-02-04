/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-09 16:39:12
 * @LastEditTime : 2024-01-31 15:38:47
 */
/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2024-01-09 16:39:12
 * @LastEditTime : 2024-01-15 17:25:03
 */
import { bar,barChart } from './components/bar'
import { line } from './components/line'
import { pie } from './components/pie'
import { radar } from './components/radar'
import { scatter } from './components/scatter'
import { percent } from './components/percent'
import { relation } from './components/relation'
import { word } from './components/word'
import { customChart } from './components/custom'
import { map } from './components/map'
import { title } from './components/title'
import { numerical } from './components/numerical'
import { rank } from './components/rank'
import { list } from './components/list'
import { button, select } from './components/form' // dialog
import { interactData } from './components/interact'
import { material } from './components/material'
import { other } from './components/other'
import { water } from './components/water'
import { model } from './components/model'
import { itemList } from './components/item-list'
import { D3Bar, D3Pie, D3Line } from './components/3d'

const COM_CDN = import.meta.env.VITE_APP_CDN
export interface ComDataDto {
  name: string
  alias: string
  img: string
  thum?: string
  used: boolean
  full?: boolean
  vip?: boolean
  children?: ComDataDto[]
}
export interface ComDataType {
  type: string
  name: string
  icon: string
  data: (ComDataType | ComDataDto)[]
}

export const classifications: ComDataType[] = [
  {
    type: 'regular',
    name: '图表',
    icon: 'v-icon-chart',
    data: [customChart, bar, barChart, line, pie, radar, water, scatter, percent, relation, word],
  },
  {
    type: 'chart',
    name: '3D图表',
    icon: 'v-icon-chart',
    data: [D3Bar, D3Pie, D3Line],
  },
  {
    type: 'map',
    name: '地图',
    icon: 'v-icon-map',
    data: [map],
  },
  {
    type: 'text',
    name: '信息',
    icon: 'v-icon-com-info',
    data: [title],
  },
  {
    type: 'numerical',
    name: '数值',
    icon: 'v-icon-com-info',
    data: [numerical],
  },
  {
    type: 'dataViwe',
    name: '排行',
    icon: 'v-icon-com-info',
    data: [rank],
  },
  {
    type: 'table',
    name: '表格',
    icon: 'v-icon-table',
    data: [list],
  },
  {
    type: 'list',
    name: '列表',
    icon: 'v-icon-table',
    data: [itemList],
  },
  {
    type: 'interact',
    name: '控件',
    icon: 'v-icon-interact',
    data: [button, select, interactData],
  },
  {
    type: 'media',
    name: '媒体',
    icon: 'v-icon-media',
    data: [material],
  },
  {
    type: 'model',
    name: '模型',
    icon: 'v-icon-model',
    data: [model],
  },
  {
    type: 'other',
    name: '其他',
    icon: 'v-icon-other',
    data: [other],
  },
]

const getCom = (coms: ComDataDto[], name: string) => {
  for (let i = 0, len = coms.length; i < len; i++) {
    const com = coms[i]
    if (com.name === name) {
      return com
    }

    if (com.children) {
      const subCom = getCom(com.children, name)
      if (subCom) {
        return subCom
      }
    }
  }

  return null
}

export function getSystemSubComs(name: string) {
  const subComs = map.data.find(m => m.name === name) as ComDataDto
  return subComs && subComs.children ? subComs.children : []
}

export function findComByName(name: string) {
  for (const classification of classifications) {
    for (const category of classification.data as ComDataType[]) {
      const com = getCom(category.data as ComDataDto[], name)
      if (com) {
        return {
          classification,
          category,
          com,
        }
      }
    }
  }

  return null
}

export const supportedSubComs = [
  ...map.data.map(m => m.name),
]
