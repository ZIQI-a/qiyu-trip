<template>
    <div class="city">
        <!-- 搜索和tabbar -->
        <!-- 顶部搜索                          -->
        <div class="top">
            <form action="/">
                <van-search v-model="searchValue" shape="round" placeholder="城市/区域/位置" show-action @search="onSearch"
                    @cancel="onCancel" />
            </form>
            <!-- tab切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCities" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <!-- 内容区域 -->
        <div class="content">

            <template v-for="(value, key, index) in allCities">
                <city-group v-show="tabActive == key" :group-data="value" />
            </template>

            <!-- 未抽取之前的代码
                            <template v-for="(item, index1) in allCities[tabActive]?.cities" :key="key">
                <h2 class="title">{{ item.group }}</h2>
                <div class="list">
                    <template v-for="(v1, index2) in item.cities" :key="key">
                        <div class="name">{{ v1.cityName }}</div>
                    </template>
                </div>
            </template> -->
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { getCityAll } from '@/service'
import useCityStore from '@/stores/modules/city.js'
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';
import cityGroup from './cpns/city-group.vue';

const searchValue = ref("");

const onCancel = () => {
    router.back();
}

const tabActive = ref();
// const allcity = ref({})
// getCityAll().then(res => {
//     allcity.value = res.data
// })
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCities } = storeToRefs(cityStore);

const currentGroup = computed(() => allCities.value[tabActive.value]);

</script>

<style lang="less" scoped>
.city {
    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    // }

    // .content {
    //     margin-top: 98px;
    // }

    .top {
        position: relative;
        z-index: 9;
    }

    // 布局滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>