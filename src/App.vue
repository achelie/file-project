<script setup>
import { onMounted } from 'vue';
import {useUserStore} from "@/stores/user"
const userStore = useUserStore()
onMounted(()=>{
    
    userStore.getUserInfo()
})
</script>

<template>
    <div class="app">
        <RouterView></RouterView>
    </div>
</template>

<style >

</style>