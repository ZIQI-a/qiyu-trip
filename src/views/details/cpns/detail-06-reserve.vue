<template>
    <div class="reserve">
        <detailSection title="预订须知" :is-foot="false">
            <div class="rules">
                <template v-for="(item, index) in rules.orderRules" :key="index">
                    <div class="text">
                        <div class="title">{{ item.title }}</div>
                        <div class="discribe">{{ item.introduction }}</div>
                        <div class="tip" v-if="item.tips">查看说明</div>
                    </div>
                </template>
            </div>
        </detailSection>
    </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    rules: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.rules {
    .text {
        display: flex;
        font-size: 12px;
        margin: 20px 2px;

        .title {
            color: #666;
            margin-right: 10px;
            width: 64px;
        }

        .discribe {
            flex: 1;
            color: #333;
        }

        .tip {
            color: #000;
        }
    }
}
</style>