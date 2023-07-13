<template>
    <div class="landlord">
        <detailSection title="房东介绍" moreText="查看房东主页">
            <div class="topimg">
                <img :src="landlord.topScroll" alt="">
            </div>
            <!-- 房东的名字 -->
            <div class="detail">
                <div class="logo">
                    <img :src="landlord.hotelLogo" alt="">
                </div>
                <div class="sign">
                    <div class="name">{{ landlord.hotelName }}</div>
                    <div class="label">
                        <template v-for="(item, index) in landlord.hotelTags" :key="index">
                            <span>{{ item.tagText.text }}</span>
                            <template v-if="index < 2">&nbsp;|&nbsp;</template>
                        </template>
                    </div>
                </div>
                <div class="contact">联系房东</div>
            </div>
            <div class="data">
                <template v-for="(item, key) in landlord.hotelSummary">
                    <div class="summary">
                        <div class="headtext">{{ item.title }}</div>
                        <div class="percent">{{ item.introduction }}</div>
                        <div class="tip">{{ item.tip }}</div>
                    </div>
                </template>
            </div>
        </detailSection>
    </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    landlord: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.landlord {
    .topimg {
        border-radius: 5px;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    .detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;

        .logo {
            overflow: hidden;
            border-radius: 50%;

            img {
                width: 54px;
                height: 54px;
            }
        }

        .sign {
            padding-right: 30px;

            .name {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
            }

            .label {
                font-size: 12px;
                color: #9b9b9b;

                span {}
            }
        }

        .contact {
            font-size: 12px;
            background-color: #fb9a2b;
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            justify-content: center;
            text-align: center;
        }
    }

    .data {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 15px 0;
        padding-left: 10px;

        .summary {
            flex: 1;

            .headtext {
                color: #999;
                font-size: 12px;
            }

            .percent {
                color: #333;
                font-size: 18px;
                font-weight: 700;
                padding: 8px 0;
            }

            .tip {
                color: #666;
                font-size: 12px;
            }
        }
    }
}
</style>