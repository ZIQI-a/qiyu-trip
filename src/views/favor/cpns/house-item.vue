<template>
    <div class="houseItem">
        <template v-for="(item, index) in favorList" :key="index">
            <div class="item">
                <div class="pic">
                    <img :src="item.defaultPicture" alt="">
                </div>
                <div class="info">
                    <div class="text">
                        <template v-for="(it, index) in item.unitSummeries" :key="index">
                            <span>{{ it.text }}</span>
                        </template>
                    </div>
                    <div class="title">{{ item.unitName }}</div>
                    <div class="price">¥{{ item.finalPrice }}</div>
                </div>

                <div class="fixed">
                    <div class="headimg">
                        <img :src="item.logoUrl" alt="">
                    </div>
                    <div class="icon">
                        <van-icon name="like" color="red" size="30" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import useFavorStore from '@/stores/modules/favor.js';
import { storeToRefs } from 'pinia';

const favorStore = useFavorStore();
const { favorList } = storeToRefs(favorStore);
// defineProps({
//     favorList: {
//         type: Object,
//         default: () => ({})
//     }
// })
</script>

<style lang="less" scoped>
.houseItem {
    .item {
        position: relative;
        margin: 10px 20px;

        .pic {
            img {
                width: 100%;
                border-radius: 10px;
                overflow: hidden;
            }
        }

        .info {
            margin: 15px 5px 20px 5px;

            .text {
                color: #646464;
                font-size: 13px;
            }

            .title {
                font-size: 18px;
                margin: 7px 0;
            }

            .price {
                color: var(--primary-color);
                font-weight: 560;
                font-size: 18px;
            }

        }

        .fixed {
            position: absolute;
            right: 5px;
            top: 0;
            z-index: 1;

            .headimg {
                width: 50px;
                margin: 10px 10px;

                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }

            .icon {
                text-align: center;
            }
        }

    }
}
</style>