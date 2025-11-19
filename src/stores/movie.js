import { defineStore } from 'pinia'
import { movieApi } from '@/api'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    hotMovies: [],
    newMovies: [],
    currentMovie: null,
    carouselItems: [],
    comments: [],
    loading: false,
    error: null,
  }),

  actions: {
    // 获取所有电影
    async fetchMovies() {
      this.loading = true
      this.error = null
      try {
        const response = await movieApi.getAllMovies()
        if (response.success) {
          this.movies = response.data
        }
      } catch (error) {
        this.error = error.message
        console.error('获取电影列表失败:', error)
      } finally {
        this.loading = false
      }
    },

    // 获取电影详情
    async fetchMovieDetail(id) {
      this.loading = true
      try {
        const response = await movieApi.getMovieDetail(id)
        if (response.success) {
          this.currentMovie = response.data
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    // 获取热门电影
    async fetchHotMovies() {
      try {
        const response = await movieApi.getHotMovies()
        if (response.success) {
          this.hotMovies = response.data
        }
      } catch (error) {
        console.error('获取热门电影失败:', error)
      }
    },

    // 搜索电影
    async searchMovies(keyword) {
      this.loading = true
      try {
        const response = await movieApi.searchMovies(keyword)
        if (response.success) {
          this.movies = response.data
        }
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    // 获取轮播图
    async fetchCarouselItems() {
      try {
        const response = await movieApi.getCarouselItems()
        if (response.success) {
          this.carouselItems = response.data
        }
      } catch (error) {
        console.error('获取轮播图失败:', error)
      }
    },
  },
})
