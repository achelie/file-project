<script setup>
import LayoutAside from "./components/LayoutAside.vue"
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from "./components/LayoutHeader.vue";
</script>

<template>
    <LayoutNav/>
    <div class="common-layout" style="height: 90vh">
        <el-container>
            <el-aside width="200px" ><LayoutAside/></el-aside>
            <el-container>
                <el-header><LayoutHeader/></el-header>
                <el-main style="height: 856px;"><RouterView :key="$route.fullPath"></RouterView></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-header{
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
</style>