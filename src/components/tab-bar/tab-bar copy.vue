<template>
    <div class="tab-bar">

        <!-- 第一种做法，未绑定 -->
        <!-- <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/tab_home.png" alt="">
            <span>首页</span>
        </div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/tab_favor.png" alt="">
            <span>收藏</span>
        </div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/tab_order.png" alt="">
            <span>订单</span>
        </div>
        <div class="tab-bar-item">
            <img src="../../assets/img/tabbar/tab_message.png" alt="">
            <span>消息</span>
        </div> -->

        <!-- 第二种做法 -->
        <!-- <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(index, item)">
                <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template> -->

        <!-- 使用组件来做 -->
        <van-tabbar v-model="currentIndex">
            <van-tabbar-item icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item icon="search">收藏</van-tabbar-item>
            <van-tabbar-item icon="friends-o">订单</van-tabbar-item>
            <van-tabbar-item icon="setting-o">消息</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import tabbarData from "../../assets/Data/tabbar.js"
import { getAssetURL } from "../../utils/load_img.js"
import { useRouter } from "vue-router";

const router = useRouter();

const currentIndex = ref(0);

const itemClick = (index, item) => {
    currentIndex.value = index;
    router.push(item.path);
}
// ------------------------------------------


</script>

<style lang="less" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;

    border-top: 1px solid #736e6e;

    .tab-bar-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.active {
            color: #ff9854;
        }

        span {
            font-size: 12px;
        }

        img {
            width: 32px;
        }


    }
}
</style>