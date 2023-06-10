<script setup>
import { useAsideStore } from "@/stores/aside"
// 导入图标
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { onMounted, ref } from "vue";

// 控制左侧
// const handleOpen = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
// }


// 改变获取类型
const asideStore = useAsideStore()
const getFiles =async(type)=>{
    asideStore.changeFile(type)
    await asideStore.getFilesState()
}


</script>
<template>
    <el-col :span="12">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="1"
            text-color="#fff" @open="handleOpen" @close="handleClose" :style="{ width: '200px', height: 'calc(100vh - 60px)' }">
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
                <el-menu-item index="1-1" @click="getFiles('private')">上传</el-menu-item>
                <el-menu-item index="1-2" @click="getFiles('private')">下载</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3">
                <el-icon>
                    <setting />
                </el-icon>
                <span>设置</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>
  
