<template>
    <div class="info">
        <!-- 标题 -->
        <h2 class="title">{{ topInfos.houseName }}</h2>
        <!-- 标签 -->
        <div class="label">
            <template v-for="(item, index) in topInfos.houseTags" :key="index">
                <span class="item" v-if="item.tagText"
                    :style="{ color: item.tagText.color, backgroundColor: item.tagText.background.color }">
                    {{ item.tagText.text }}</span>
            </template>
        </div>
        <!-- 评价 -->
        <div class="comment">
            <div class="left">
                <span class="score">{{ topInfos.commentBrief.overall }}</span>
                <span class="title">{{ topInfos.commentBrief.scoreTitle }}</span>
                <span class="shortcmt">"{{ topInfos.commentBrief.commentBrief }}"</span>
            </div>
            <div class="right">
                <span class="count">{{ topInfos.commentBrief.totalCount }}</span>条评论
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- 地理位置 -->
        <div class="location">
            <div class="left">
                <span class="address">
                    {{ topInfos.nearByPosition.address }}
                </span>
            </div>
            <div class="right">
                <span>地图·周边</span>
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    topInfos: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.info {
    margin: 10px 18px;
    margin-bottom: 30px;

    .title {
        margin-bottom: 5px;
        margin-top: 13px;
        text-align: justify;
    }

    .label {
        margin: 10px 0 5px 0;

        .item {
            font-size: 13px;
            margin: 0 2px;
            padding: 2px 2px;
        }
    }

    .comment {
        display: flex;
        background-color: #dadfdf;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        border-radius: 15px;
        margin: 15px 0 10px 0;

        .left {
            flex: 1;

            .score {
                font-weight: 700;
                font-size: 20px;
            }

            .title {
                font-weight: 700;
                font-size: 14px;
            }

            .shortcmt {
                font-size: 12px;
            }

            span {
                margin-right: 5px;
            }
        }

        .right {
            color: var(--primary-color);
            font-size: 12px;
        }
    }

    .location {
        display: flex;
        background-color: #dadfdf;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        border-radius: 15px;
        margin: 10px 0;

        .left {
            flex: 1;
            font-weight: 700;
        }

        .right {
            color: var(--primary-color);
            font-size: 12px;
        }
    }
}
</style>