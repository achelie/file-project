import request from "@/utils/http"

export function getFilesAPI({idx,type}){
    return request({
        url:'/filedisplay',
        params:{
            idx,
            type
        }
    })
}