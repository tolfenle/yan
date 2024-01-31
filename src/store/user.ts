/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-10-31 11:13:02
 * @LastEditTime : 2024-01-16 18:20:05
 */
import { defineStore } from 'pinia'
import { login, logout, getInfo } from '@/api/user'
import { useMessage } from 'naive-ui'

const TokenKey = import.meta.env.VITE_DATAV_TOKEN_KEY

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    name: '',
    avatar: '',
    role: -1,
    user: null,
  }),
  actions: {
    async login(param) {
      try {
        const nMessage = useMessage()
        const res = await login(param)
        if (res.code === 1000) {
          this.token = res.data.token
          localStorage.setItem(TokenKey, res.data.token)
          localStorage.setItem(`_${TokenKey}_`, res.data.refreshToken)
        }
        return res
      } catch (error) {
        throw error
      }
    },
    async getUserInfo() {
      try {
        const res = await getInfo()
        if (res.code === 1000) {
          const data = res.data
          this.name = data.name
          this.avatar = data.headImg
          this.role = 1
          this.user = data
        } else {
          throw Error(res.message)
        }
      } catch (error) {
        throw error
      }
    },
    resetToken() {
      this.token = ''
      localStorage.removeItem(TokenKey)
    },
    isLogin() {
      const token = localStorage.getItem(TokenKey)
      return !!token
    },
    async logout() {
      const res = await logout()
      if (res.code === 1000)
        this.resetToken()
      else
        throw Error(res.msg)
    },
  },
})
