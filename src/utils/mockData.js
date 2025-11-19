//模拟数据
//电影数据（成员1、2写）
export const movies = [
  /* ... */
]

//轮播图数据（成员1）
export const bannerMovies = [
  /* ... */
]

//演员弹窗呈现的数据（成员3）
export const actors = [
  /* ... */
]

//用户登陆注册的个人信息数据
export const users = [
  /* ... */
]

//模拟登录功能
export const mockLogin = (phone, password) => {
  const user = users.find((u) => u.phone === phone)

  if (!user) {
    return {
      success: false,
      message: '该手机号未注册',
    }
  }

  if (user.password !== password) {
    return {
      success: false,
      message: '密码错误',
    }
  }

  //登录成功，返回用户信息（不包含密码）
  const { password: _, ...userInfo } = user
  return {
    success: true,
    data: userInfo,
    message: '登录成功',
  }
}

//模拟注册功能
export const mockRegister = (phone, password, nickname) => {
  //检查手机号是否已存在
  const exists = users.find((u) => u.phone === phone)
  if (exists) {
    return {
      success: false,
      message: '该手机号已注册',
    }
  }

  //创建新用户
  const newUser = {
    id: users.length + 1,
    phone,
    password,
    nickname: nickname || `用户${users.length + 1}`,
    avatar: '../assets/images/default-avatar.jpg',
    favorites: [],
    comments: [],
    registerTime: new Date().toLocaleString('zh-CN'),
  }

  users.push(newUser)

  //返回用户信息（不包含密码）
  const { password: _, ...userInfo } = newUser
  return {
    success: true,
    data: userInfo,
    message: '注册成功',
  }
}

//评论数据
export const mockAddComment = (userId, movieId, content) => {
  const user = users.find((u) => u.id === userId)
  const movie = movies.find((m) => m.id === movieId)

  if (!user || !movie) return { success: false }

  const newComment = {
    id: Date.now(),
    movieId,
    movieTitle: movie.title,
    content,
    createTime: new Date().toLocaleString('zh-CN'),
  }

  user.comments.push(newComment)
  return { success: true, data: newComment }
}
