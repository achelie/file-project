import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFilesAPI } from "@/apis/file"

export const useFileStore = defineStore('aside', () => {
    const fileData = ref([])
    const fileType = ref("public")
    const page = ref(1)
    const isChangePage = ref(false)
    const getFilesState= async () => {
        const res = await getFilesAPI({idx:page.value,type:fileType.value})
        fileData.value = res
    }
    const changeFile = (type)=>{
        page.value = 1
        fileType.value = type
        isChangePage.value = true;
    }
    const changePage = (p)=>{
        page.value = p
    }
    const falseIs = ()=>{
        isChangePage.value = false;
    }
    return { fileData,changeFile,changePage,getFilesState,page,falseIs,isChangePage }
})
