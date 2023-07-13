<template>
    <div class="favor">
        <!-- 顶部导航栏 -->
        <div class="topbar">
            <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
                <template #right>
                    <div class="icon" @click="onClickRight">
                        <van-icon name="wap-nav" size="25" />
                    </div>
                </template>
                <template #title>
                    <van-tabs v-model:active="active" type="card" animated @click-tab="onClickTab">
                        <van-tab title="我的收藏"></van-tab>
                        <van-tab title="浏览历史"></van-tab>
                    </van-tabs>
                </template>
            </van-nav-bar>
        </div>
        <!-- 下面的内容 -->
        <div class="content">
            <my-favor v-if="showPage" />
            <history-list v-else="showPage" />
        </div>
    </div>
</template>

<script setup>
import myFavor from './cpns/02-myFavor.vue'
import useFavorStore from '@/stores/modules/favor.js';
import historyList from './cpns/03-history-list.vue';
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';


const favorStore = useFavorStore();
favorStore.fetchFavorHistory();
favorStore.fetchFavorList();

const showPage = ref(true);

const onClickTab = ((title) => {
    console.log(title.name)
    if (title.name == 1) showPage.value = false;
    else showPage.value = true;
})

const router = useRouter();

const onClickLeft = (() => {
    router.back();
})


</script>

<style lang="less" scoped></style>