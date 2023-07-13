<template>
    <div class="cate">
        <template v-for="(item, index) in categories" :key="item.id">
            <div class="catelist">
                <img :src="item.pictureUrl" alt="">
                <span>{{ item.title }}</span>
            </div>
        </template>
    </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();

const { categories } = storeToRefs(homeStore);

</script>

<style lang="less" scoped>
.cate {
    display: flex;
    height: 80px;
    overflow-x: auto;
    margin-top: 8px;
    padding: 0 8px;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    .catelist {
        width: 70px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;

        img {
            width: 40px;
            height: 40px;
        }

        span {
            color: #615f5f;
        }
    }
}
</style>