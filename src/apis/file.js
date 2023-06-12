import request from "@/utils/http"

export function getFilesAPI({ idx, type }) {
    return request({
        url: '/filedisplay',
        params: {
            idx,
            type
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

export function getSearchAPI({searchValue,type,idx}) {
    return request({
        url: '/filesearch',
        method: 'POST',
        params: {
            searchValue,
            type,
            idx
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