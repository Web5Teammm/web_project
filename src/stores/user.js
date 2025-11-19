import { defineStore } from 'pinia'
import { userApi } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoggedIn: false,
    favorites: [],
  }),

  actions: {
    // 登录
    async login(credentials) {
      try {
        const response = await userApi.login(credentials)
        if (response.success) {
          this.user = response.data.user
          this.token = response.data.token
          this.isLoggedIn = true
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))
          return { success: true }
        } else {
          return { success: false, message: response.message }
        }
      } catch (error) {
        return { success: false, message: '登录失败' }
      }
    },

    // 注册
    async register(userData) {
      try {
        const response = await userApi.register(userData)
        if (response.success) {
          this.user = response.data.user
          this.token = response.data.token
          this.isLoggedIn = true
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))
          return { success: true }
        } else {
          return { success: false, message: response.message }
        }
      } catch (error) {
        return { success: false, message: '注册失败' }
      }
    },

    // 登出
    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
