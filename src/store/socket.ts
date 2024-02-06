/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-07 18:57:26
 * @LastEditTime : 2024-02-04 16:19:33
 */
import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { useUserStore } from '@/store/user'

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: null,
  }),
  actions: {
    async createSocket() {
      const { loadUrl } = useEnvUrl()
      try {
        this.socket = io(`${loadUrl}?token=${useUserStore().token}`)
        this.socket.on('connect', () => {
          console.log('socket连接成功')
        })
        this.socket.on('notification', msg => {
          console.log('msg: ', msg)
        })
      } catch (error) {
        throw error
      }
    },
  },
})
