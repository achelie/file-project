<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAsideStore } from '@/stores/aside';
import FileItem from './FileItem.vue';

// 无限滚动获取数据
const asideStore = useAsideStore()
const disabled = ref(false)
const fileList = ref([{id:1,name:'name'},{id:1,name:'name'}])
const load = async () => {
    // asideStore.loadFile()
    // await asideStore.getFilesState()
    if (asideStore.fileData.length === 0) {
        disabled.value = true
    } else {
        fileList.value = [fileList.value, ...asideStore.fileData.value]
    }
}

// 第一次获取数据
const getfileData = async () => {
    await asideStore.getFilesState()
    fileList.value = asideStore.fileData
}
onMounted(() => {
    getfileData()
})

watch(
    () => asideStore.fileData,
    (newValue, oldValue) => {
        fileList.value = asideStore.fileData
    },
    { deep: true } // 开启深度监听
);



</script>

<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" :infinite-scroll-disabled="disabled">
        <FileItem v-for="i in fileList" :key="i.id" class="infinite-list-item">{{ i }}</FileItem>
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