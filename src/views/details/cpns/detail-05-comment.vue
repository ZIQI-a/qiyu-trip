<template>
    <div class="comment">
        <detailSection title="热门评论" :moreText="`查看全部${comments.totalCount}条评论`">
            <!-- 顶部大评分 -->
            <div class="summary">
                <div class="left">
                    <div class="bigscore">
                        <span>{{ comments.overall }}</span>
                        <div class="line"></div>
                    </div>
                    <div class="score">
                        <div class="title">{{ comments.scoreTitle }}</div>
                        <div class="sumcmt">{{ comments.totalCount }}条评论</div>
                        <van-rate :model-value="Number(comments.overall)" color="#ff9645" size="12" allow-half readonly />
                    </div>
                </div>
                <div class="right">
                    <template v-for="(item, index) in comments.subScores" :key="index">
                        <div class="item">{{ item }}</div>
                    </template>
                </div>
            </div>
            <!-- 中间标签 -->
            <div class="label">
                <template v-for="(item, index) in comments.commentTagVo" :key="index">
                    <div class="tags" :style="{ color: item.color, backgroundColor: item.backgroundColor }">
                        {{ item.text }}
                    </div>
                </template>
            </div>
            <!-- 展示部分评论 -->
            <div class="cmt">
                <div class="userinfo">
                    <div class="headimg">
                        <img :src="comments.comment.userAvatars" alt="">
                    </div>
                    <div class="text">
                        <div class="name">{{ comments.comment.userName }}</div>
                        <div class="date">{{ comments.comment.checkInDate }}</div>
                    </div>
                </div>
                <div class="content">
                    {{ comments.comment.commentDetail }}
                </div>
            </div>
        </detailSection>
    </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    comments: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.summary {
    display: flex;

    .left {
        width: 100%;
        display: flex;
        align-items: center;

        .bigscore {
            font-size: 48px;
            font-weight: 700;
            position: relative;

            span {
                position: relative;
                z-index: 9;
            }

            .line {
                width: 66px;
                height: 8px;
                background: linear-gradient(90deg, #fa8e1f 0%, #fcae3e 100%);
                border-radius: 5px;
                position: absolute;
                bottom: 1px;
                // border-image: linear-gradient(90deg, #fa8e1f 0%, #fcae3e 100%) 2 2 2 2;
            }
        }

        .score {
            margin-left: 10px;
            font-size: 12px;

            .title {
                color: #333;
            }

            .sumcmt {
                color: #999;
                padding: 3px 0;
            }
        }
    }

    .right {
        display: flex;
        flex-wrap: wrap;
        justify-content: end;

        .item {
            font-size: 12px;
            color: #666;
            margin-left: 3px;
        }
    }
}

.label {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;

    .tags {
        font-size: 12px;
        padding: 3px 5px;
        margin-right: 10px;
        margin-top: 5px;
        border-radius: 8px;
    }
}

.cmt {
    background-color: #e7eef5;
    padding: 10px 10px;
    border-radius: 5px;

    .userinfo {
        display: flex;

        .headimg {
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 32px;
                height: 32px;
            }
        }

        .text {
            margin-left: 10px;

            .name {
                font-size: 14px;
                color: #333;
                font-weight: 700;
            }

            .date {
                font-size: 12px;
                color: #666;
            }
        }
    }

    .content {
        font-size: 12px;
        color: #333;
        margin-top: 15px;
    }
}
</style>