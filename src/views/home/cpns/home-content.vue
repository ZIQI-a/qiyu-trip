<template>
    <div class="content">
        <h2>热门精选</h2>
        <div class="list">
            <template v-for="(item, index) in houselist" :key="item.data.houseId">
                <homeContentV9 v-if="item.discoveryContentType === 9" :item-data="item.data"
                    @click="itemClick(item.data)" />
                <homeContentV3 v-else-if="item.discoveryContentType === 3" :item-data="item.data"
                    @click="itemClick(item.data)" />
            </template>
        </div>
    </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import homeContentV9 from '@/components/home-content-v9/home-content-v9.vue'
import homeContentV3 from '@/components/home-content-v3/home-content-v3.vue'
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();

const { houselist } = storeToRefs(homeStore);

const router = useRouter();

const itemClick = (data) => {
    router.push("/detail/" + data.houseId);
}

</script>

<style lang="less" scoped>
.content {
    padding: 0 8px;

    h2 {
        font-size: 22px;
        margin: 8px 0;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>