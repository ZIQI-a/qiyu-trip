<template>
    <div class="house">

        <div class="header">
            <div class="position select">
                <van-cell is-link @click="isShowCity">全部城市</van-cell>
                <van-popup v-model:show="showCity" position="bottom" round :style="{ height: '30%' }">
                    <van-picker :columns="columns" @cancel="showCity = false" @confirm="onConfirm" />
                </van-popup>
            </div>
            <!-- <van-picker v-model:show="isShowCity" title="选择城市" :columns="columns" /> -->
            <div class="date select">
                <van-cell is-link @click="isShowDate">{{ SD }}-{{ ED }}</van-cell>
                <van-calendar v-model:show="showDate" type="range" @confirm="onDate" :show-confirm="false" />
            </div>
        </div>
        <!-- item页面 -->
        <div class="content">
            <houseItem />
        </div>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import houseItem from './house-item.vue'
import { storeToRefs } from 'pinia';
import { formatDate } from '@/utils/format_date';
import { computed } from '@vue/reactivity'
import { ref } from 'vue';

const showCity = ref(false);
const showDate = ref(false);

// 日期选择
const mainStore = useMainStore();
const { startD, endD } = storeToRefs(mainStore);

const startDate = computed(() => formatDate(startD.value, "MM.DD"));
const endDate = computed(() => formatDate(endD.value, "MM.DD"))
const SD = ref(startDate)
const ED = ref(endDate);

const onDate = ((value) => {
    const [start, end] = value;

    console.log(SD.value, end)
    showDate.value = false;
})

//城市弹出层
// const columns = new Array('杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华');
const onChange = ((value) => {
    console.log(value)
})
const columns = ref([
    { value: 0, text: '杭州' },
    { value: 1, text: '上海' },
    { value: 2, text: '北京' },
    { value: 3, text: '兰州' },
    { value: 4, text: '定西' }
])

//点击切换城市
const changeCity = ref('全部城市');
const onConfirm = ((value) => {
    console.log("点击了确定");
    showCity.value = false;
})

const show = ref(false);
const isShowCity = (() => {
    showCity.value = true;

})
const isShowDate = (() => {
    showDate.value = true;
})


</script>

<style lang="less" scoped>
.header {
    display: flex;
    background-color: #fff;
}
</style>