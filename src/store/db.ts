/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-07 18:57:26
 * @LastEditTime : 2024-01-15 18:26:20
 */
import { defineStore } from 'pinia'
import { dbApi } from '@/api/datebase'

export const useDBStore = defineStore('db', {
  state: () => ({
    dbList: [],
    dbBaseList: [],
    dbTableList: [],
    dbTableKeyList: [],
  }),
  actions: {
    async loadDbs() {
      try {
        const res = await dbApi.queryDb()
        if (res.code === 1000) {
          this.dbList = res?.data ?? []
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async loadBases(id) {
      try {
        const res = await dbApi.queryDBBases(id)
        if (res.code === 1000) {
          this.dbBaseList = res?.data ?? []
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async loadTables(param) {
      try {
        const res = await dbApi.queryDBTables(param)
        if (res.code === 1000) {
          this.dbTableList = res?.data?.map(item => ({ value: item, label: item })) ?? []
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    async loadTableKeys(param) {
      try {
        const res = await dbApi.queryDBTableKeys(param)
        if (res.code === 1000) {
          this.dbTableKeyList = res?.data ?? []
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
  },
})
