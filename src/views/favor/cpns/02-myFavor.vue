<template>
    <div class="myFavor">
        <van-tabs v-model:active="active">
            <van-tab title="房屋">
                <favor-house></favor-house>
            </van-tab>
            <van-tab title="房东">
                <favor-landlord />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script setup>
import favorHouse from './favor-house.vue';
import favorLandlord from './favor-landlord.vue';
</script>

<style lang="less" scoped></style>