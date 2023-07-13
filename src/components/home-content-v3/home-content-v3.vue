<template>
    <div class="v3">
        <div class="item-inner">
            <img :src="itemData.image.url" alt="">
            <div class="location">
                <img src="@/assets/img/home/location.png" alt="">
                <span>{{ itemData.location }}</span>
            </div>
            <div class="info">

                <div class="title">{{ itemData.houseName }}</div>
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="price">
                    <div class="final">¥{{ itemData.finalPrice }}</div>
                    <div class="product">¥{{ itemData.productPrice }}</div>
                    <div class="cha">已减¥{{ itemData.productPrice - itemData.finalPrice }}</div>
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
.v3 {
    width: 48%;
    padding: 3px;


    .item-inner {
        background-color: #fff;
        border-radius: 7px;
        overflow: hidden;

        img {
            width: 100%;
        }

        .location {
            display: flex;
            align-items: center;
            padding-top: 5px;

            img {
                width: 12px;
                height: 12px;
            }

            span {
                margin-left: 2px;
                font-size: 12px;
                color: #666;
            }
        }

        .info {
            padding: 5px 8px;
            color: #666;
            font-size: 12px;

            .title {
                margin: 5px 0;
                font-size: 14px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .summary {
                font-size: 12px;
                color: #615f5f;
            }

            .price {
                display: flex;
                align-items: flex-start;
                margin: 8px 0;

                .final {
                    color: var(--primary-color);
                    line-height: 20px;
                }

                .product {
                    font-size: 12px;
                    color: #615f5f;
                    padding: 0 4px;
                    text-decoration: line-through;
                    line-height: 20px;
                }

                .cha {
                    font-size: 12px;
                    color: white;
                    padding: 1px 8px;
                    background-color: #f55c5c;
                    border-radius: 13px;
                    line-height: 18px;
                }
            }
        }
    }
}
</style>