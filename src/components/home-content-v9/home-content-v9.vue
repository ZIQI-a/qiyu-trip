<template>
    <div class="v9">
        <div class="item-inner">
            <img :src="itemData.image.url" alt="">
            <div class="info">
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="title">{{ itemData.houseName }}</div>
                <div class="price">
                    <van-rate :model-value="Number(itemData.commentScore)" color="#fff" size="16" allow-half readonly />
                    <div>¥{{ itemData.finalPrice }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>


defineProps({
    itemData: {
        type: Object,
        default: () => { }
    }
})

</script>

<style lang="less" scoped>
.v9 {
    width: 48%;
    padding: 3px;

    .item-inner {
        position: relative;
        background-color: #fff;
        border-radius: 7px;
        overflow: hidden;

        img {
            width: 100%;
        }

        .info {
            position: absolute;
            bottom: 10px;
            color: white;
            padding: 0 8px;

            .summary {
                font-size: 12px;
            }

            .title {
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
        }
    }
}
</style>