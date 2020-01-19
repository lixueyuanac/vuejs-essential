/**
 * API 接口
 * @cache 是否对API接口进行缓存处理，目前仅对get接口有效
 * cache时间统一为一小时
 * 如果此处已经定义了cache为true，但是由于业务逻辑需要强制不走cache，只需要在调用此接口是传入参数 realRequest:true即可，同时会刷新cache
 */
import axios from './http'

//获取api请求根域名
export const getDomain = () => Promise.resolve(env['VUE_APP_API'])
// 文章列表
export const articles = params => axios.get(`articles`, {params})
// 文章详情
export const article = (id,params) => axios.get(`article/${id}`, params)
// 添加文章
export const addArticle = params => axios.post(`articles`, params)
// 修改文章
export const modifyArticle = (id,params) => axios.put(`articles/${id}`, params)
// 登录
export const login = params => axios.post(`auth`, params)
// 注册
export const register = params => axios.post(`register`, params)
// tag
export const getTags = params => axios.get(`tags`, {params})
// user
export const getUser = () => axios.get(`userinfo`)
// user by id
export const  getUserByID = (params) => axios.get(`userinfobyid`,{params})
// user by name
export const  getUserByUserName = username => axios.get(`userinfo/${username}`)
// export const getTags = function(params){
//   axios.get(`tags`,params)
// }

