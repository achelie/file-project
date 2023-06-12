<script setup>
import { onMounted, ref, watch } from 'vue'
import { useFileStore } from '@/stores/file';
import FileItem from './FileItem.vue';
import LayoutHeader from "./LayoutHeader.vue";

// 文件数据
const fileStore = useFileStore()
const fileList = ref([])
const totalLen = ref(0)

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
    },
    { deep: true } // 开启深度监听
);
// 监控当前页数
const currentPage = ref(1)
watch(currentPage, async () => {
    if (!fileStore.isChangePage) {
        fileStore.changePage(currentPage.value)
        await fileStore.getFilesState()
    }
    fileStore.falseIs()
})

watch(() => fileStore.page, async () => {
    currentPage.value = fileStore.page
}, { deep: true })


</script>

<template>
    <div class="layoutHeader">
        <LayoutHeader></LayoutHeader>
    </div>
    <ul class="infinite-list" style="overflow: auto">
        <FileItem v-for="i in fileList" :key="i.id" class="infinite-list-item" :file="i"></FileItem>
    </ul>
    <div class="noFile" v-if="fileList.length === 0">No files found.</div>
    <div class="pag">
        <div class="example-pagination-block">
            <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalLen" :page-size="20" />
        </div>
    </div>
</template>
  

  
<style  scoped>
.noFile{
    margin: 0 auto;
}
.layoutHeader{
    position: relative;
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    padding: 0 30px;
    margin-bottom: 10px;
}
.infinite-list {
    height: calc(100vh-113px);
    padding: 0;
    margin: 0;
    list-style: none;
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