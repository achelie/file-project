<script setup>
import LayoutAside from "./components/LayoutAside.vue"
import LayoutNav from './components/LayoutNav.vue';
</script>

<template>
    <LayoutNav/>
    <div class="common-layout" style="height: 90vh">
        <el-container>
            <el-aside width="200px" ><LayoutAside/></el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main style="height: 856px;"><RouterView :key="$route.fullPath"></RouterView></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
</style>