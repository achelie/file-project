<script setup>
import { onMounted, ref, watch } from 'vue'
import { useFileStore } from '@/stores/file';
import FileItem from './FileItem.vue';

// 无限滚动获取数据
const fileStore = useFileStore()
const disabled = ref(false)
const fileList = ref([{id:1,filename:'name',describle:'描述',upname:"user"},{id:1,filename:'name',describle:'描述',upname:"user"}])
const load = async () => {
    fileStore.loadFile()
    await fileStore.getFilesState()
    if (fileStore.fileData.length === 0) {
        disabled.value = true
    }
}

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
        fileList.value = [fileList.value, ...fileStore.fileData]
    },
    { deep: true } // 开启深度监听
);



</script>

<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" :infinite-scroll-disabled="disabled">
        <FileItem v-for="i in fileList" :key="i.id" class="infinite-list-item" :file="i"></FileItem>
    </ul>
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
</style>