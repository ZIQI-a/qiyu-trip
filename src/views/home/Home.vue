<template>
    <div class="home" ref="homeRef">
        <nav-bar />
        <div class="banner">
            <img src="../../assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <div class="searchBar" v-if="isShowSearchBar">
            <search-bar :start-date="'01.12'" :end-date="'01.13'" />
        </div>
        <home-cate />
        <home-content />
    </div>
</template>

<script>
export default { name: "home" }

</script>
<script setup>
//导入其他vue的模块时必须有vue的后缀，否则没有样式
import navBar from '@/views/home/cpns/nav-bar.vue'
import homeSearchBox from '@/views/home/cpns/home-search-box.vue'
// import hyRequest from "@/service/request/index.js"
import useHomeStore from '@/stores/modules/home.js';
import homeCate from '@/views/home/cpns/home-cate.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';
import onScroll from '@/hooks/onScroll'
import { ref, watch } from 'vue';

// const hotSuggest = ref([]);
// hyRequest.get({
//     url: "/home/hotSuggests"
// }).then(res => {
//     hotSuggest.value = res.data
// })

const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();

// const btnClick = (currentPage) => {
//     console.log("加载更多数据")
//     homeStore.fetchHouselistData();
// }

// onScroll(() => {
//     homeStore.fetchHouselistData();
// });

const homeRef = ref();

const { isReachBottom, scrollTop } = onScroll(homeRef);
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false
        })
    }
})

const isShowSearchBar = ref(false);

watch(scrollTop, (newTop) => {
    isShowSearchBar.value = newTop > 100;
})

</script>


<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 60px;
}

.banner {
    img {
        width: 100%;
    }
}

.searchBar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>