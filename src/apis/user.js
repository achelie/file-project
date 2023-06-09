import request from "@/utils/http"

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