import request from "@/utils/http"
// 登录接口
export function getUserAPI({username,password}){
    return request({
        url:'/login',
        method:'POST',
        data:{
            username,
            password
        }
    })
}
// 注册接口
export function getRegisterUserAPI({username,password}){
    return request({
        url:'/register',
        method:'POST',
        data:{
            username,
            password
        }
    })
}
// 用户数据接口
export function getUserDataAPI(){
    return request({
        url:'/info',
    })
}