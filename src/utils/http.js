import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/user"
// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://192.168.1.151:8686',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userState.token
  if(token){
    config.headers.Authorization = token
  }
  else{
    config.headers.Authorization = ''
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage({type:'warning',message:e.response.data.msg})
  return Promise.reject(e)
})

export default httpInstance