import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserAPI } from "@/apis/user";
import { getRegisterUserAPI } from "@/apis/user";

export const useUserStore = defineStore('user', () => {
    const userState = ref({})
    const getUserState = async ({ username, password }) => {
        const res = await getUserAPI({ username, password })
        userState.value = res
    }
    const getRegisterUserState = async({username,password})=>{
        const res = await getRegisterUserAPI({ username, password })
        userState.value = res
    }
    const clearUserState = ()=>{
        userState.value = {}
    }
    return {
        userState,
        getUserState,
        clearUserState,
        getRegisterUserState
    }
}, {
    persist: true,
})