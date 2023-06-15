import request from "@/utils/http"

export function getFilesAPI({ idx, type ,category }) {
    return request({
        url: '/filedisplay',
        params: {
            idx,
            type,
            category
        }
    })
}

export function getUpdateAPI({ filename, describle }) {
    return request({
        url: "/fileupdate",
        method: "POST",
        data: {
            filename,
            describle,
        },
    })
}

export function getDeleteAPI(fileName) {
    return request({
        url: '/filedel',
        method: 'POST',
        data: {
            fileName,
        }
    })
}

export function getSearchAPI({searchValue,type,idx,category}) {
    return request({
        url: '/filesearch',
        method: 'POST',
        params: {
            searchValue,
            type,
            idx,
            category
        }
    })
}

export function getCollectAPI({filename,collect}) {
    return request({
        url: '/collection',
        method: 'POST',
        data: {
            filename,
            collect
        }
    })
}