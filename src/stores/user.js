import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserAPI,getRegisterUserAPI,getUserDataAPI } from "@/apis/user";

export const useUserStore = defineStore('user', () => {
    // 用户数据
    const userToken = ref('')
    const userState = ref({})
    // 获取登录数据
    const getUserState = async ({ username, password }) => {
        const res = await getUserAPI({ username, password })
        userToken.value = res.token
        userState.value = await getUserDataAPI()
    }
    // 获取注册数据
    const getRegisterUserState = async({username,password})=>{
        const res = await getRegisterUserAPI({ username, password })
        userToken.value = res.token
        userState.value = await getUserDataAPI()
    }
    // 进入主页获取用户数据
    const getUserInfo = async()=>{
        userState.value = await getUserDataAPI()
    }
    // 清空用户数据
    const clearUserState = ()=>{
        userState.value = {}
        userToken.value = ''
    }
    // 改头像
    const changeAvatar =(avatar)=>{
        userState.value.avatar  = avatar
    }

    return {
        userState,
        getUserState,
        clearUserState,
        getRegisterUserState,
        userToken,
        changeAvatar,
        getUserInfo
    }
}, {
    persist: true,
})