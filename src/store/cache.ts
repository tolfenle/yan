/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-14 11:26:37
 * @LastEditTime : 2023-11-14 13:51:55
 */
import { defineStore } from 'pinia'
import { useComStore } from './com'
import { _ } from 'iking-utils'

export const useCacheStore = defineStore('cache', {
  state: () => ({
    caches: [],
    cacheIndex: 1,
  }),
  actions: {
    // 添加缓存
    addCache() {
      const comStore = useComStore()
      const len = this.caches.length
      this.cacheIndex = len
      this.caches.push({
        id: len,
        value: _.cloneDeep(comStore.coms),
      })
      // 超过10条缓存，删除最早的
      if (len > 10) {
        this.caches.splice(0, 1)
      }
    },
    // 后退
    setBackCache() {
      if (this.cacheIndex >= 0) {
        const comStore = useComStore()
        this.cacheIndex = this.cacheIndex > 0 ? this.cacheIndex - 1 : 0
        comStore.load(_.cloneDeep(this.caches[this.cacheIndex].value))
      }
    },
    // 前景
    setNextCache() {
      if (this.cacheIndex < this.caches.length - 1) {
        const comStore = useComStore()
        this.cacheIndex++
        comStore.load(_.cloneDeep(this.caches[this.cacheIndex].value))
      }
    },
  },
})
