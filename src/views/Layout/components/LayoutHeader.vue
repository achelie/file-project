<script setup>
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { ref } from "vue"
import { Search, UploadFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
// 上传控制
const userStore = useUserStore()
const dialogVisible = ref(false)
const confirmDialog = ()=>{
    dialogVisible.value =false
    uploadFiles();
    describle.value =''
    
}
const describle = ref('')
const uploadData = ref({describle,upname:userStore.userState.username})
// 上传文件
const uploadRef = ref(null);
const uploadFiles = () => {
    uploadRef.value.submit();
    uploadRef.value.clearFiles()
    ElMessage.success("上传成功")
};

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
        <el-button type="primary" @click="dialogVisible = true">上传<el-icon>
                <UploadFilled />
            </el-icon></el-button>
        <el-dialog v-model="dialogVisible" title="上传" width="30%" :before-close="handleClose">
            <el-text>文件描述</el-text>
            <el-input v-model="describle"></el-input>
            <el-upload class="upload-demo" ref="uploadRef" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d1" :data="uploadData"
                multiple :auto-upload="false" @success="handleUploadSuccess" @error="handleUploadError">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件或者<em>点击上传</em>
                </div>
            </el-upload>
            <div class="footer">
                <el-button type="primary" @click="confirmDialog">确认</el-button>
            </div>
        </el-dialog>
        <el-input v-model="searchText" placeholder="搜索" :prefix-icon="Search" clearable @clear="handleClear"
            @keydown.enter="handleSearch" style="width: 300px;" class="search-input" />
    </div>
</template>

<style lang="scss" scoped>
.footer{
    display: flex;
    justify-content: flex-end;
}
.container {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;

}

.upload-demo{
    margin-top: 10px;
}
</style>
