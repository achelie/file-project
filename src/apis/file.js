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

export function getDownloadAPI(fileName){
    return request({
        url:'/download',
        method:'POST',
        data:{
            fileName
        }
    })
}


export function getUpdateAPI({filename,describle}){
    return request({
        url:'/fileupdate',
        method:'POST',
        data:{
            filename,
            describle
        }
    })
}