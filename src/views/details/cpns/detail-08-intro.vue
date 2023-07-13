<template>
    <div class="intro">
        <detailSection :title="intro.title" :is-foot="false">
            {{ intro.introduction }}
        </detailSection>

    </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';

defineProps({
    intro: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.intro {
    font-size: 12px;
    color: #666;

}
</style>