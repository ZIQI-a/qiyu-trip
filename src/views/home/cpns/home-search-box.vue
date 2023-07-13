<template>
    <div class="search-box">
        <!-- 位置 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <div class="text">我的位置</div>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
        <!-- 入住日期 -->
        <div class="section data-range bottom-gray-line" @click="showDate = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="data">{{ startDate }}</span>
                </div>

            </div>
            <div class="stay">共{{ stayDays }}晚</div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="data">{{ endDate }}</span>
                </div>

            </div>
        </div>
        <van-calendar v-model:show="showDate" type="range" @confirm="onConfirm" :round="false" color="#ff9854" />
        <!-- 修改价格人数 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/名宿名</div>
        <!-- 热门建议 -->
        <div class="section hot-suggest section">
            <template v-for="(item, index) in hotSuggest" :key="index">
                <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">{{
                    item.tagText.text }}</div>
            </template>
        </div>
        <!-- 开始搜索按钮 -->
        <div class="search-btn section">
            <div class="btn" @click="searchClick">开始搜索</div>
        </div>
    </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate, diffDays } from '@/utils/format_date.js'
import common from '@/assets/css/common.css'
import useHomeStore from '@/stores/modules/home.js';
import useMainStore from '@/stores/modules/main';
import { computed } from '@vue/reactivity'



// defineProps({
//     hotSuggests: {
//         type: Array,
//         default: () => []
//     }
// })


const router = useRouter();
//切换城市
const cityClick = () => {
    router.push('/city');
}


const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("找到位置了：", res);
    },
        err => {
            console.log("莫找到位置");
        })
}

//切换城市
const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// //日期范围
// const nowDate = new Date(); //今天的日期
// const newDate = new Date();
// newDate.setDate(nowDate.getDate() + 1);
const mainStore = useMainStore();
const { startD, endD } = storeToRefs(mainStore);

const startDate = computed(() => formatDate(startD.value));
const endDate = computed(() => formatDate(endD.value))

const stayDays = ref(diffDays(startD.value, endD.value));

const showDate = ref(false);

const onConfirm = (value) => {
    //更新日期
    const selectStartDate = value[0];
    const selectEndDate = value[1];
    mainStore.startD = selectStartDate;
    mainStore.endD = selectEndDate;
    stayDays.value = diffDays(selectStartDate, selectEndDate);

    //关闭窗口
    showDate.value = false;
}


const homeStore = useHomeStore();
const { hotSuggest } = storeToRefs(homeStore);

// 开始搜索按钮
const searchClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName
        }
    })
}

</script>

<style lang="less" scoped>
.search-box {
    --van-calendar-popup-height: 100%;
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            position: relative;
            top: 2px;
            color: #666;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}

.section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;
    height: 44px;

    .start {
        flex: 1;
        display: flex;
        height: 44px;
        align-items: center;
    }

    .end {
        min-width: 30%;
        padding-left: 20px;
    }

    .date {
        display: flex;
        flex-direction: column;

        .tip {
            font-size: 12px;
            color: #999;
        }

        .data {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
    }
}

.data-range {
    height: 44px;

    .stay {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #666;
    }
}

.price-counter {
    .start {
        border-right: 1px solid var(--line-color);
    }
}

.hot-suggest {
    margin: 10px 0;
    height: auto;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

// 开始搜索按钮
.search-box {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}
</style>