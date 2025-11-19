//用户相关API
import { USE_MOCK, mockDelay, formatResponse, API_BASE_URL } from './config'
import { mockUsers } from '@/utils/mockData'

export const userApi = {
  // 用户登录
  async login(credentials) {
    if (USE_MOCK) {
      // 模拟登录验证
      const user = mockUsers.find(
        (u) => u.username === credentials.username && u.password === credentials.password,
      )

      if (user) {
        const { password, ...userInfo } = user // 不返回密码
        const token = 'mock_token_' + Date.now()
        return mockDelay(formatResponse({ user: userInfo, token }))
      } else {
        return mockDelay(formatResponse(null, false, '用户名或密码错误'))
      }
    }

    // 真实 API 调用
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data = await response.json()
    return data
  },

  // 用户注册
  async register(userData) {
    if (USE_MOCK) {
      // 检查用户名是否已存在
      const exists = mockUsers.find((u) => u.username === userData.username)
      if (exists) {
        return mockDelay(formatResponse(null, false, '用户名已存在'))
      }

      const newUser = {
        id: Date.now(),
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
        favorites: [],
        ratings: [],
        createdAt: new Date().toISOString(),
      }

      const { password, ...userInfo } = newUser
      const token = 'mock_token_' + Date.now()
      return mockDelay(formatResponse({ user: userInfo, token }))
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    const data = await response.json()
    return data
  },

  // 获取用户信息
  async getUserInfo(userId) {
    if (USE_MOCK) {
      const user = mockUsers.find((u) => u.id === userId)
      if (user) {
        const { password, ...userInfo } = user
        return mockDelay(formatResponse(userInfo))
      }
      return mockDelay(formatResponse(null, false, '用户不存在'))
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}`)
    const data = await response.json()
    return data
  },

  // 更新用户信息
  async updateUserInfo(userId, updates) {
    if (USE_MOCK) {
      const user = mockUsers.find((u) => u.id === userId)
      if (user) {
        Object.assign(user, updates)
        const { password, ...userInfo } = user
        return mockDelay(formatResponse(userInfo))
      }
      return mockDelay(formatResponse(null, false, '更新失败'))
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    const data = await response.json()
    return data
  },

  // 收藏电影
  async toggleFavorite(userId, movieId) {
    if (USE_MOCK) {
      const user = mockUsers.find((u) => u.id === userId)
      if (user) {
        const index = user.favorites.indexOf(movieId)
        if (index > -1) {
          user.favorites.splice(index, 1)
        } else {
          user.favorites.push(movieId)
        }
        return mockDelay(formatResponse({ favorites: user.favorites }))
      }
      return mockDelay(formatResponse(null, false, '操作失败'))
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites/${movieId}`, {
      method: 'POST',
    })
    const data = await response.json()
    return data
  },

  // 获取收藏列表
  async getFavorites(userId) {
    if (USE_MOCK) {
      const user = mockUsers.find((u) => u.id === userId)
      if (user) {
        return mockDelay(formatResponse(user.favorites))
      }
      return mockDelay(formatResponse([]))
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}/favorites`)
    const data = await response.json()
    return data
  },
}
