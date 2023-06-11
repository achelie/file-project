<script setup>
import { onMounted, ref, watch } from 'vue'
import { useFileStore } from '@/stores/file';
import FileItem from './FileItem.vue';

// 无限滚动获取数据
const fileStore = useFileStore()
const fileList = ref([
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
    { id: 1, filename: 'name', describle: '描述', upname: "user" },
])

// 第一次获取数据
const getfileData = async () => {
    await fileStore.getFilesState()
    fileList.value = fileStore.fileData
}
onMounted(() => {
    getfileData()
})
// 监控file的数据变化
watch(
    () => fileStore.fileData,
    (newValue, oldValue) => {
        if (fileStore.page == 1) {
            fileList.value = fileStore.fileData
        } {
            fileList.value = [fileList.value, ...fileStore.fileData]
        }
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
    console.log(1);
    currentPage.value = fileStore.page
}, { deep: true })


</script>

<template>
    <ul class="infinite-list" style="overflow: auto">
        <FileItem v-for="i in fileList" :key="i.id" class="infinite-list-item" :file="i"></FileItem>
    </ul>
    <div class="pag">
        <div class="example-pagination-block">
            <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>
  

  
<style  scoped>
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