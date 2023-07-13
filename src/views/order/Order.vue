<template>
    <div class="order">
        <!-- 顶部导航栏 -->
        <div class="topbar">
            <van-nav-bar title="订单列表" left-text="返回" left-arrow @click-left="onClickLeft">
                <template #right>
                    <div class="icon" @click="onClickRight">
                        <van-icon name="wap-nav" size="25" />
                    </div>
                </template>
            </van-nav-bar>
        </div>
        <tabBar></tabBar>

    </div>
</template>

<script setup>
import tabBar from './cpns/tab-bar.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const onClickLeft = (() => {
    router.back();
})

</script>

<style lang="less" scoped></style>