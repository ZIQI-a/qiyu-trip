<template>
    <div class="home">
        <nav-bar />
        <div class="banner">
            <img src="../../assets/img/home/banner.webp" alt="">
        </div>
        <div class="location">
            <div class="city">上海</div>
            <div class="position">
                <div class="text">我的位置</div>
                <img src="../../assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import navBar from '@/views/home/cpns/nav-bar.vue'

</script>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}

.location {
    display: flex;
    height: 25px;
    color: #615f5f;
    font-size: 15px;
    border-bottom: 1px solid #8d8989;

    .city {
        flex: 1;
        line-height: 25px;
    }

    .position {
        display: flex;
        line-height: 25px;

        img {
            height: 20px;
            padding-top: 2px;
        }
    }
}
</style>