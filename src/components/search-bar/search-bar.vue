<template>
    <div class="search-box">
        <div class="left">
            <div class="start item">
                <div class="name">住</div>
                <div class="date">{{ startDateStr }}</div>
            </div>
            <div class="end item">
                <div class="name">离</div>
                <div class="date">{{ endDateStr }}</div>
            </div>
        </div>
        <div class="mid">
            <div class="keyword">关键字/位置/民宿</div>
        </div>
        <div class="right">
            <i class="icon-search"></i>
        </div>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { formatDate } from '@/utils/format_date';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity'

const mainStore = useMainStore();
const { startD, endD } = storeToRefs(mainStore);
const startDateStr = computed(() => formatDate(startD.value, "MM.DD"));
const endDateStr = computed(() => formatDate(endD.value, "MM.DD"));
// defineProps({
//     startDate: {
//         type: String,
//         default: "08.24"
//     },
//     endDate: {
//         type: String,
//         default: "08.25"
//     }
// })

</script>

<style lang="less" scoped>
.search-box {
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 45px;
    line-height: 45px;

    padding: 0 10px;
    font-size: 14px;
    color: #999;

    border-radius: 6px;
    background: #f2f4f6;

    .left {
        display: flex;
        flex-direction: column;

        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            line-height: normal;
            font-size: 10px;

            .name {
                font-size: 10px;
            }

            .date {
                position: relative;
                color: #333;
                margin: 0 10px 0 3px;
                font-weight: 500;
            }
        }
    }

    .mid {
        position: relative;
        flex: 1;
        padding: 0 6px;
        text-align: left;
        border-left: 1px solid #fff;

        .keyword {
            max-width: 155px;
            font-size: 12px;
        }
    }

    .right {
        display: flex;
        align-items: center;

        .icon-search {
            width: 24px;
            height: 24px;
            display: inline-block;
            background-image: url(@/assets/img/home/home-sprite.png);
            background-position: -29px -151px;
            background-size: 207px 192px;
        }
    }
}
</style>