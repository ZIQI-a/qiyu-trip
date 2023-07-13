<template>
    <div class="history">
        <template v-for="(item, index) in  history " :key="index">
            <div class="item">
                <div class="pic">
                    <img :src="item.defaultPicture" alt="">
                </div>
                <div class="info">
                    <div class="text">
                        <template v-for="(it, textindex) in item.unitSummeries" :key="textindex">
                            <span>{{ it.text }}</span>
                            <span v-if="textindex < 2"> · </span>
                        </template>
                    </div>
                    <div class="title">{{ item.unitName }}</div>
                    <div class="onsale">
                        <template v-for="(sale, id) in  item.houseTags " :key="id">
                            <span>{{ sale.text }}</span>
                        </template>
                    </div>
                    <div class="price">
                        <span class="curprice">¥{{ item.finalPrice }}</span>
                        <span class="proprice">¥{{ item.productPrice }}</span>
                    </div>
                </div>
                <!-- 图片右上角的头像收藏评论按钮 -->
                <div class="fixed">
                    <div class="headimg">
                        <img :src="item.logoUrl" alt="">
                    </div>
                    <div class="icon">
                        <van-icon name="like" color="red" size="30" />
                    </div>
                    <div class="comment">
                        <van-icon name="comment" color="white" size="30" />
                    </div>
                </div>
                <!-- 左下角的评分 -->
                <div class="score">
                    <span class="num">{{ item.commentBrief.overall }}分</span>
                    <span class="text">{{ item.commentBrief.scoreTitle }}</span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import useFavorStore from '@/stores/modules/favor';
import { storeToRefs } from 'pinia';

const favorStore = useFavorStore();

const { history } = storeToRefs(favorStore);


</script>

<style lang="less" scoped>
.history {
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

            .onsale {
                margin: 8px 0;

                span {
                    padding: 0 2px;
                    margin-right: 3px;
                    font-size: 13px;
                    color: #FF6666;
                    background: rgba(255, 102, 102, 0.10);
                }
            }

            .price {
                span {
                    margin-right: 5px;
                }

                .curprice {
                    color: var(--primary-color);
                    font-weight: 560;
                    font-size: 20px;
                }

                .proprice {
                    color: #646464;
                    font-size: 12px;
                    text-decoration: line-through;
                }
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

            .comment {
                text-align: center;
                margin-top: 10px;
            }
        }

        .score {
            position: absolute;
            display: flex;
            left: 10px;
            top: 190px;
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 3px 10px;
            border-radius: 10px;
            height: 15px;
            line-height: 15px;

            span {
                padding: 0 5px;
            }

            .num {
                flex: 1;
                font-weight: 700;
            }

            .text {
                color: #646464;
                font-size: 12px;
                border-left: 1px solid #646464;
            }
        }

    }
}
</style>