<template>
    <div class="tabbar">
        <van-tabs v-model:active="active">
            <template v-for="(item, index) in array" :key="index">
                <van-tab :title="item">
                    <template :v-if="index === 0 || index === 1">
                        <template v-for="(it1, in1) in orderAll" :key="in1">
                            <div class="up">{{ it1 }}</div>
                        </template>
                    </template>
                </van-tab>
            </template>
        </van-tabs>
    </div>
</template>

<script setup>
import useOrderStore from "@/stores/modules/order.js";
import { storeToRefs } from "pinia";
import { ref } from 'vue';
// 解构出需要的页面
const orderStore = useOrderStore();
const { orderAll, orderPend, orderRecent } = storeToRefs(orderStore);
console.log(orderAll.tnsSkin)

const array = ['全部订单', '近期订单', '待支付', '待确认', '待入住'];

const active = ref(1);
</script>

<style lang="less" scoped></style>