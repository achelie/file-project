<script setup>
import { onMounted, ref, watch } from 'vue'
import { useFileStore } from '@/stores/file';
import FileItem from './FileItem.vue';
import LayoutHeader from "./LayoutHeader.vue";
import { Grid,Document,Picture,Headset ,VideoPlay,More } from '@element-plus/icons-vue';

// 文件数据

const fileStore = useFileStore()
const fileList = ref([])
const totalLen = ref(0)
const infiniteList = ref(null)

// 获取文件数据
const getfileData = async () => {
    await fileStore.getFilesState()
    fileList.value = fileStore.fileData.data
    totalLen.value = fileStore.fileData.len
}
onMounted(() => {
    getfileData()
})
// 监控file的数据变化
watch(
    () => fileStore.fileData,
    (newValue, oldValue) => {
        fileList.value = fileStore.fileData.data
        totalLen.value = fileStore.fileData.len
    },
    { deep: true } // 开启深度监听
);
// 监控当前页数
const currentPage = ref(1)
watch(currentPage, async () => {
    if (!fileStore.isChangePage) {
        fileStore.changePage(currentPage.value)
        await fileStore.getFilesState()
        infiniteList.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fileStore.falseIs()
})

watch(() => fileStore.page, async () => {
    currentPage.value = fileStore.page
}, { deep: true })
// 切换文件类型的显示
const changeCategory = async(type)=>{
    fileStore.changeCategory(type)
    await fileStore.getFilesState()
}


</script>

<template>
    <div class="maincontainer">
        <div class="layoutHeader">
            <LayoutHeader></LayoutHeader>
        </div>
        <div class="category">
            <el-row> 
                <el-button :icon="Grid" @click="changeCategory('all')" :class="{ active: fileStore.categoryType === 'all' }" />
                <el-button :icon="Document" @click="changeCategory('document')" :class="{ active: fileStore.categoryType === 'document' }" />
                <el-button :icon="Picture" @click="changeCategory('image')" :class="{ active: fileStore.categoryType === 'image' }" />
                <el-button :icon="Headset" @click="changeCategory('audio')" :class="{ active: fileStore.categoryType === 'audio' }" />
                <el-button :icon="VideoPlay" @click="changeCategory('video')" :class="{ active: fileStore.categoryType === 'video' }" />
                <el-button :icon="More" @click="changeCategory('other')" :class="{ active: fileStore.categoryType === 'other' }" />
            </el-row>
        </div>
        <ul class="infinite-list" style="overflow: auto" ref="infiniteList">
            <FileItem v-for="i in fileList" :key="i.id" class="infinite-list-item" :file="i"></FileItem>
        </ul>
        <div class="noFile" v-if="fileList.length === 0">No files found.</div>
        <div class="pag">
            <div class="example-pagination-block">
                <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalLen"
                    :page-size="20" />
            </div>
        </div>
    </div>
</template>
  

  
<style  scoped>

.active {
    background: #409eff;
    color: #fff;
}
.category{
    padding: 0 16px;
}

.category .el-button{
    border: none;
}
.noFile {
    margin: 0 auto;
}

.layoutHeader {
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    padding: 0 30px;
    margin-bottom: 10px;
}

.infinite-list {
    padding: 0;
    margin: 0;
    list-style: none;
}
.maincontainer{
    padding-bottom: 0px;
    margin-bottom: 0px;
}
.infinite-list .infinite-list-item {

    height: 50px;
    background: #fff;
    color: var(--el-color-primary);
    padding: 10px;
}


.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.example-pagination-block+.example-pagination-block {
    margin-top: 10px;
}

.example-pagination-block .example-demonstration {
    margin-bottom: 16px;
}

.pag {
    display: flex;
    justify-content: flex-end;
}
</style>