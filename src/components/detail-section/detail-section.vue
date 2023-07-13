<template>
    <div class="section">
        <div class="header">
            <h2 class="title">{{ title }}</h2>
        </div>
        <div class="content">
            <slot>
                <h3>默认内容</h3>
            </slot>
        </div>
        <div class="footer" v-if="isFoot">
            <span>{{ moreText }}</span>
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<script setup>

defineProps({
    title: {
        type: String,
        default: "默认标题"
    },
    moreText: {
        type: String,
        default: ""
    },
    isFoot: {
        type: Boolean,
        default: true
    }
})

</script>

<style lang="less" scoped>
.section {
    padding: 0 18px;
    border-top: #e1e4e4 solid 5px;
    margin-bottom: 10px;

    .header {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #d3d6d6;
        margin-bottom: 10px;
    }

    .footer {
        color: #ff9854;
        text-align: end;
        height: 55px;
        line-height: 55px;
        font-size: 13px;
        font-weight: 700;
    }
}
</style>