//核心配置文件
// 环境配置 - 通过这个开关控制使用模拟数据还是真实 API
export const USE_MOCK = true // 改为 false 即可切换到真实后端

// 改API 基础地址切换后端
export const API_BASE_URL = import.meta.env.VITE_API_URL || '真实后端地址'

// 请求超时时间
export const REQUEST_TIMEOUT = 10000

// 模拟请求延迟(毫秒) - 模拟真实网络延迟
export const MOCK_DELAY = 500

// 模拟网络延迟的辅助函数
export const mockDelay = (data, delay = MOCK_DELAY) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

// 统一的响应格式
export const formatResponse = (data, success = true, message = '') => {
  return {
    success,
    data,
    message,
    timestamp: Date.now(),
  }
}

// 统一的错误处理
export const handleError = (error) => {
  console.error('API Error:', error)
  return {
    success: false,
    data: null,
    message: error.message || '请求失败',
    timestamp: Date.now(),
  }
}
