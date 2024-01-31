/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:03
 * @LastEditTime : 2023-11-03 19:59:12
 */
import { InjectionKey, ComputedRef } from 'vue'
import { DataFilter } from '@/components/_models/data-filter'

interface FilterManagerInjection {
  usedFilters: ComputedRef<Record<number, {
    ids: string[]
    names: string[]
  }>>
  editFilterName: (val: string, df: DataFilter) => void
  removeFilter: (id: number | string) => void
  saveFilter: (data: DataFilter) => Promise<void>
}

interface FilterConfigInjection {
  enabledFilters?: ComputedRef<Record<number, boolean>>
  onUsedChange?: (id: number | string, val: boolean) => void
  updateIndicator?: (visible: boolean, index: number, el: HTMLElement) => void
}

export const filterManagerInjectionKey: InjectionKey<FilterManagerInjection> = Symbol('filterManagerInjectionKey')

export const filterConfigInjectionKey: InjectionKey<FilterConfigInjection> = Symbol('filterConfigInjectionKey')
