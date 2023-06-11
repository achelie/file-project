<script setup>
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { ref } from "vue"
import { Search,UploadFilled } from '@element-plus/icons-vue'
// 上传控制
const handleSuccess = () => {
    ElMessage({ type: 'success', message: "上传成功" })
}
const handleError = () => {
    ElMessage({ type: 'warning', message: "上传失败" })
}
// 搜索控制
const searchText = ref('');

const handleClear = () => {
    searchText.value = '';
};

const handleSearch = () => {
    console.log('Search for:', searchText.value);
};

</script>

<template>
    <div class="container">
        <el-upload class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-success="handleSuccess" :on-error="handleError" show-file-list="false" style="height: 32px;" >
            <el-button type="primary">上传<el-icon><UploadFilled /></el-icon></el-button>
        </el-upload>
        <el-input v-model="searchText" placeholder="搜索" :prefix-icon="Search" clearable @clear="handleClear"
            @keydown.enter="handleSearch" style="width: 300px;" class="search-input" />
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    
}


</style>
