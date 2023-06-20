import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFilesAPI,getSearchAPI } from "@/apis/file"

export const useFileStore = defineStore('aside', () => {
    const fileData = ref({})
    const fileType = ref("public")
    const categoryType = ref("all")
    const page = ref(1)
    // 文件数据
    const getFilesState= async () => {
        const res = await getFilesAPI({idx:page.value,type:fileType.value,category:categoryType.value})
        fileData.value = res
    }
    // 切换文件显示
    const changeFile = (type)=>{
        page.value = 1
        fileType.value = type
        categoryType.value = 'all'
    }
    // 搜索文件显示
    const searchFile = async(searchValue)=>{
        page.value = 1
        const res = await getSearchAPI({searchValue,type:fileType.value,idx:page.value,category:categoryType.value})
        fileData.value = res
    }
    // 切换文件类型显示
    const changeCategory = (cateType)=>{
        page.value = 1
        categoryType.value = cateType
    }
    // 改变页数
    const changePage = (p)=>{
        page.value = p
    }
    return { 
        fileData,
        changeFile,
        changePage,
        getFilesState,
        page,
        searchFile ,
        changeCategory,
        categoryType
    }
})
