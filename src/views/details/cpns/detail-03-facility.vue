<template>
    <div class="facility">
        <detail-section title="房屋设施" more-text="查看全部设施">
            <div class="facility-inner">
                <template v-for="(item, index) in houseFacility.houseFacilitys" :key="index">
                    <div class="item" v-if="houseFacility.facilitySort?.includes(index)">
                        <!-- 左边大的总结标题 -->
                        <div class="bighead">
                            <img :src="item.icon" alt="">
                            <div class="text">{{ item.groupName }}</div>
                        </div>
                        <!-- 右边的小项目 -->
                        <div class="list">
                            <template v-for="(it, key) in item.facilitys.slice(0, 4)" :key="key">
                                <div class="littleItem">
                                    <i class="icon_check icon"></i>
                                    <span>{{ it.name }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </detail-section>
    </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    houseFacility: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.facility-inner {
    padding: 5px 0;
    border-radius: 6px;
    font-size: 12px;
    background-color: #eaf2f3;

    .item {
        display: flex;
        padding: 15px 15px;

        .bighead {
            width: 90px;
            text-align: center;

            img {
                width: 20px;
                height: 20px;
            }

            .text {
                margin-top: 5px;
                color: #000;
            }
        }

        .list {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .littleItem {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 50%;
                margin: 4px 0;

                .icon {
                    margin: 0 6px;
                }

                span {
                    color: #333;
                }
            }
        }
    }
}
</style>