<script setup>
import { useFileStore } from "@/stores/file.js"
import { useRouter } from "vue-router";
// 导入图标
import {
    Menu as IconMenu,
    Location,
    Setting,
    ChatDotRound
} from '@element-plus/icons-vue'

// 改变获取类型
const router = useRouter()
const fileStore = useFileStore()
const getFiles =async(type)=>{
    router.push('/')
    fileStore.changeFile(type)
    await fileStore.getFilesState()
}
// 设置路由跳转


</script>
<template>
    <el-col :span="12">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1"
            text-color="#fff" :style="{ width: '200px', height: 'calc(100vh - 60px)' }">
            <el-menu-item index="1" @click="getFiles('public')">
                <el-icon><icon-menu /></el-icon>
                <span>主页</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>个人</span>
                </template>
                <el-menu-item index="1-1" @click="getFiles('private')">我的上传</el-menu-item>
                <el-menu-item index="1-2" @click="getFiles('privatecollect')">我的收藏</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3" @click="$router.push('/chat')">
                <el-icon><ChatDotRound /></el-icon>
                <span>聊天</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <span>设置</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>
  
