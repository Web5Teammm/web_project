//电影相关API
import { USE_MOCK, mockDelay, formatResponse, API_BASE_URL } from './config'
import {
  mockMovies,
  mockComments,
  mockCarouselItems,
  getMovieById,
  getHotMovies,
  getNewMovies,
  searchMovies,
} from '@/utils/mockData'

// ============= 电影列表 API =============
export const movieApi = {
  // 获取所有电影
  async getAllMovies() {
    if (USE_MOCK) {
      return mockDelay(formatResponse(mockMovies))
    }

    // 真实 API 调用 (后期替换)
    const response = await fetch(`${API_BASE_URL}/movies`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 获取电影详情
  async getMovieDetail(id) {
    if (USE_MOCK) {
      const movie = getMovieById(id)
      return mockDelay(formatResponse(movie))
    }

    // 真实 API 调用
    const response = await fetch(`${API_BASE_URL}/movies/${id}`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 获取热门电影
  async getHotMovies() {
    if (USE_MOCK) {
      return mockDelay(formatResponse(getHotMovies()))
    }

    const response = await fetch(`${API_BASE_URL}/movies/hot`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 获取最新电影
  async getNewMovies() {
    if (USE_MOCK) {
      return mockDelay(formatResponse(getNewMovies()))
    }

    const response = await fetch(`${API_BASE_URL}/movies/new`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 搜索电影
  async searchMovies(keyword) {
    if (USE_MOCK) {
      const results = searchMovies(keyword)
      return mockDelay(formatResponse(results))
    }

    const response = await fetch(`${API_BASE_URL}/movies/search?q=${keyword}`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 获取轮播图数据
  async getCarouselItems() {
    if (USE_MOCK) {
      return mockDelay(formatResponse(mockCarouselItems))
    }

    const response = await fetch(`${API_BASE_URL}/carousel`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 获取电影评论
  async getMovieComments(movieId) {
    if (USE_MOCK) {
      const comments = mockComments[movieId] || []
      return mockDelay(formatResponse(comments))
    }

    const response = await fetch(`${API_BASE_URL}/movies/${movieId}/comments`)
    const data = await response.json()
    return formatResponse(data)
  },

  // 添加评论
  async addComment(movieId, commentData) {
    if (USE_MOCK) {
      const newComment = {
        id: Date.now(),
        movieId,
        ...commentData,
        date: new Date().toISOString(),
        likes: 0,
      }
      return mockDelay(formatResponse(newComment))
    }

    const response = await fetch(`${API_BASE_URL}/movies/${movieId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    })
    const data = await response.json()
    return formatResponse(data)
  },
}
