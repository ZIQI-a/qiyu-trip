<template>
    <!-- 顶部展示栏 -->
    <div class="nav-bar">
        <div class="title">奇遇旅途</div>
        <div class="banner">
          <img src="@/assets/img/home/banner.webp" alt="">
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.nav-bar {
    display: inline-block;
    justify-content: center;
    text-align: center;
    align-items: center;
    //height: 46px;
    border-bottom: 1px solid #f2f2f2;

    .title {
        color: #ff9854;
        font-size: 21px;
        line-height: 46px;
        font-weight: 700;
    }

  .banner {
    img {
      width: 100%;
    }
  }
}
</style>