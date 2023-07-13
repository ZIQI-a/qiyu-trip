<template>
    <div class="city-group">
        <van-index-bar highlight-color="#ff9854" :index-list="indexList">
            <!-- 热门区域 -->
            <van-index-anchor index="热门" />
            <div class="hot">
                <template v-for="(city, index) in groupData.hotCities" :key="index0">
                    <div class="hot-list" @click="clickCity(city)">{{ city.cityName }}</div>
                </template>
            </div>

            <!-- 下面所有城市区域 -->
            <template v-for="(item, index1) in groupData.cities" :key="index1">
                <!-- <h2 class="title">{{ item.group }}</h2>
            <div class="list">
                <template v-for="(v1, index2) in item.cities" :key="key">
                    <div class="name">{{ v1.cityName }}</div>
                </template>
            </div> -->
                <van-index-anchor :index="item.group" />
                <template v-for="(v1, index2) in item.cities" :key="index2">
                    <van-cell :title="v1.cityName" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city.js';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';


const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

const indexList = computed(() => {
    const indexList = props.groupData.cities.map(item => item.group);
    indexList.unshift("#");
    return indexList;
})

const router = useRouter();
const cityStore = useCityStore();
const clickCity = (city) => {
    console.log("点击了", city.cityName);

    cityStore.currentCity = city;

    router.back();
}

</script>

<style lang="less" scoped>
.hot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .hot-list {
        width: 70px;
        height: 28px;
        background-color: #fff4ec;
        color: #000;
        border-radius: 14px;
        text-align: center;
        line-height: 28px;
        margin: 10px 5px;
    }
}
</style>