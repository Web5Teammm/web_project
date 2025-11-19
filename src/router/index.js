import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/detail/:id',
      name: 'MovieDetail',
      component: () => import('@/views/MovieDetail.vue'),
    },
    //添加登录路由
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    //添加注册路由
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
    },
    //添加用户中心路由
    {
      path: '/user',
      name: 'UserCenter',
      component: () => import('@/views/UserCenter.vue'),
      meta: { requiresAuth: true }, // 需要登录才能访问
    },
  ],
})

//添加路由守卫,检查登录状态
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  //如果页面需要登录,但用户未登录
  if (to.meta.requiresAuth && !token) {
    next('/login') // 跳转到登录页
  } else if (to.path === '/login' && token) {
    next('/') // 已登录用户访问登录页,跳转到首页
  } else {
    next() //正常访问
  }
})

export default router
