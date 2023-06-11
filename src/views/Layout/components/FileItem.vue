<script setup>
import { Download, Star, Edit, Delete } from '@element-plus/icons-vue';
import {getDownloadAPI} from "@/apis/file"
const props = defineProps(['file'])

// 下载按钮设置
const downloadFile = ()=>{
    getDownloadAPI(props.file.filename)
}

</script>

<template>
    <div class="container">
        <div class="include">
            <div class="filename"><el-text class="w-300px" size="large" truncated>{{file.filename}}</el-text></div>
            <div class="filedesc"><el-text class="w-500px" size="small" truncated>{{file.describle}}</el-text></div>
            <div class="fileuser"><el-text class="w-150px" truncated>上传者:{{ file.upname }}</el-text></div>
            <el-row>
                <el-button @click="downloadFile" :icon="Download" circle />
                <el-button :icon="Star" circle />
                <el-button :icon="Edit" circle />
                <el-button :icon="Delete" circle />
            </el-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.w-300px {
    width: 300px;
}

.w-500px {
    width: 500px;
}

.w-150px{
    width: 150px;
}

.container {
    .include {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 20px;
        border-bottom: 1px solid #f7f9fc;
        height: 40px;
        .el-row{
            height: 40px;
        }
    }

    &:hover {
        background-color: #f7f9fc !important;
        .el-row {
            opacity: 1;
        }
    }
}


.el-row {
    opacity: 0;
}</style>