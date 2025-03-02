<template>
    <div class="message">
        <van-nav-bar title="消息中心" left-text="返回" @click-left="onClickLeft" left-arrow>
            <template #right>
                <div class="right">
                    <van-icon class="icon" name="friends-o" size="30" />
                </div>
            </template>
        </van-nav-bar>
    </div>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const onClickLeft = (() => {
    router.back();
})

</script>

<style lang="less" scoped>
.right {
    padding: 0;
    margin: 0;
    width: 30px;
    height: 30px;

    .icon {
        line-height: 0px;
    }

    span {
        line-height: 0px;
    }

}
</style>