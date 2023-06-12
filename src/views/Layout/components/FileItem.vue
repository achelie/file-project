<script setup>
import { Download, Star, Edit, Delete, StarFilled,Document,Picture,Headset ,VideoPlay,Collection } from '@element-plus/icons-vue';
import { getUpdateAPI, getDeleteAPI,getCollectAPI } from "@/apis/file"
import { ref, watch, nextTick, onMounted } from "vue"
import { useFileStore } from "@/stores/file"
const fileStore = useFileStore()
const props = defineProps(['file'])
// 修改按钮设置
const fileShow = ref(true)
const fileTitle = ref('')
const fileDescribe = ref('')
const titleInputRef = ref(null)
const descInputRef = ref(null)
fileTitle.value = props.file.filename
fileDescribe.value = props.file.describle
const updateFile = () => {
    
    const response = getUpdateAPI({ filename: fileTitle.value, describle: fileDescribe.value })
    response.then((res)=>{
        if(res.msg){
            fileShow.value = false;
        nextTick(() => {
        titleInputRef.value.focus()
        })}
        else{
            fileShow.value=true;
        }
    })
    
}

// 控制双输入框的失去焦点
const blurCounter = ref(0);

const handleCounter = () => {
    blurCounter.value = 2;
}

const handleBlur = () => {
    blurCounter.value = 1;
    setTimeout(() => {
        if (blurCounter.value === 1) {
            blurCounter.value = 0;
            fileShow.value = true;
            getUpdateAPI({ filename: fileTitle.value, describle: fileDescribe.value })
        }
    }, 300);
};

// 当 fileShow 值改变时，重置 blurCounter
watch(fileShow, () => {
    blurCounter.value = 0;
});
// 删除按钮
const deleteFile = async () => {
    getDeleteAPI(fileTitle.value)
    setTimeout(async () => {
        await fileStore.getFilesState()
    }, 200)

}
// 修改收藏
const isCollect = ref(props.file.shouchang)
const changeCollect = async()=>{
    getCollectAPI({filename:fileTitle.value,collect:isCollect.value})
    setTimeout(async () => {
        isCollect.value = !isCollect.value;
        await fileStore.getFilesState()
    }, 100)
    
}
// 文件类型展示
const fileType = ref(props.file.filetype)
const handleFileIcon = ()=>{

}

</script>

<template>
    <div class="container">
        <div class="include">
            
            <div class="filename" v-if="fileShow"><el-text class="w-300px" size="large" truncated>
                <el-icon v-if="fileType === 'document'"><Document /></el-icon>
                <el-icon v-else-if="fileType === 'image'"><Picture /></el-icon>
                <el-icon v-else-if="fileType === 'audio'"><Headset  /></el-icon>
                <el-icon v-else-if="fileType === 'video'"><VideoPlay /></el-icon>
                <el-icon v-else-if="fileType === 'other'"><Collection /></el-icon>
                &ensp;{{ fileTitle }}</el-text>
            </div>
            <div class="filename" v-if="!fileShow"><el-input class="w-300px" v-model="fileTitle" @blur="handleBlur"
                    @click="handleCounter" ref="titleInputRef"></el-input></div>
            <div class="filedesc" v-if="fileShow"><el-text class="w-500px" size="small" truncated>文件描述:{{ fileDescribe
            }}</el-text>
            </div>
            <div class="filedesc" v-if="!fileShow"><el-input class="w-500px" v-model="fileDescribe" @blur="handleBlur"
                    @click="handleCounter" ref="descInputRef"></el-input></div>
            <div class="fileuser"><el-text class="w-150px" truncated>上传者:{{ file.upname }}</el-text></div>
            <el-row>
                <a :href="`http://192.168.1.151:8686/download?fileName=${file.filename}`"><el-button :icon="Download"
                        circle></el-button></a>
                <el-button v-if="!isCollect" @click="changeCollect" :icon="Star" circle />
                <el-button v-if="isCollect" @click="changeCollect" :icon="StarFilled" circle />
                <el-button @click="updateFile" :icon="Edit" circle />
                <el-button @click="deleteFile" :icon="Delete" circle />
            </el-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.el-row {
    a {
        display: box;
        height: 32px;
        border-radius: 50%;
        margin-right: 10px;
    }
}

.w-300px {
    width: 300px;
}

.w-500px {
    width: 500px;
}

.w-150px {
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

        .el-row {
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
}
</style>