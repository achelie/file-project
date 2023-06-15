<script setup>
import LayoutAside from "./components/LayoutAside.vue"
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from "./components/LayoutHeader.vue";
</script>

<template>
    <div class="container">
        <LayoutNav />
        <div class="common-layout">
            <el-container>
                <el-aside width="200px">
                    <LayoutAside />
                </el-aside>
                <el-container>
                    <!-- <el-header><LayoutHeader/></el-header> -->
                    <el-main class="el-main">
                        <RouterView :key="$route.fullPath"></RouterView>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<style scoped>
.el-main {
    height: calc(100vh - 53px) !important;
    padding: 0;
}

@media (max-height: 400px) {
    .el-main {
        height: 400px !important;
    }
}

</style>