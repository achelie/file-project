<script setup>
import { ref, onMounted } from 'vue';
import { useFileStore } from "@/stores/file.js"
import { useRouter } from "vue-router";
import {
    Menu as IconMenu,
    Location,
    Setting,
    ChatDotRound
} from '@element-plus/icons-vue'

const router = useRouter()
const fileStore = useFileStore()
const getFiles = async (type) => {
    router.push('/')
    fileStore.changeFile(type)
    await fileStore.getFilesState()
}
// 控制路由当前路径时的侧边栏
const activeIndex = ref('1');

onMounted(() => {
    switch (router.currentRoute.value.path) {
        case '/':
            activeIndex.value = '1';
            break;
        case '/chat':
            activeIndex.value = '3';
            break;
        case '/person':
            activeIndex.value = '4';
            break;
        default:
            activeIndex.value = '1';
    }
});

</script>
<template>
    <el-col :span="12">
        <el-menu :default-active="activeIndex" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            text-color="#fff" >
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
            <el-menu-item index="4" @click="$router.push('/person')">
                <el-icon>
                    <setting />
                </el-icon>
                <span>设置</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>
  
<style scoped>

@media (max-height: 400px) {
  .el-menu-vertical-demo {
    height: 400px;
  }
}
.el-menu-vertical-demo{
    min-height: 400px;
    width: 200px;
    height: calc(100vh - 60px);
}
</style>