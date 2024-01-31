/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-10 18:32:30
 * @LastEditTime : 2024-01-05 10:08:14
 */
import { defineStore } from 'pinia'
import { DataFilter } from '@/components/_models/data-filter'
import * as api from '@/api/filter'
import dayjs from 'dayjs'
import { useEditorStore } from '@/store/editor'
import { useUserStore } from './user'

export interface IFilterState {
  dataFilters: DataFilter[]
}

export const useFilterStore = defineStore('filter', {
  state: (): IFilterState => ({
    dataFilters: [],
  }),
  actions: {
    async loadFilters(param: any = {}) {
      const userStore = useUserStore()
      if (userStore?.user?.departmentId) {
        param.projectId = userStore.user.departmentId
      }
      try {
        const res = await api.getFilters(param)
        if (res.code === 1000) {
          this.dataFilters = res.data
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async create(payload: DataFilter) {
      const editorStore = useEditorStore()
      try {
        const res = await api.createFilter({
          ...payload,
          projectId: editorStore.screen.groupId,
          screenId: editorStore.screen.id,
        })
        if (res.code === 1000) {
          payload.id = res.data
          payload.createAt = dayjs().format('YYYY-MM-DD HH:mm:ss'),
          payload.updateAt = payload.createAt
          this.dataFilters.push(payload)
          return res
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async update(payload: DataFilter) {
      try {
        const res = await api.updateFilter(payload)
        if (res.code === 1000) {
          this.loadFilters()
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async updateName(payload: Pick<DataFilter, 'id' | 'name'>) {
      try {
        const res = await api.updateFilterName(payload)
        if (res.code === 1000) {
          const df = this.dataFilters.find(m => m.id === payload.id)
          Object.assign(df, {
            name: payload.name,
          })
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async delete(payload: number | string) {
      try {
        const res = await api.deleteFilter(payload)
        if (res.code === 1000) {
          this.loadFilters()
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
  },
})
