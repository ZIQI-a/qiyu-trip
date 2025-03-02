<template>
  <div class="search">

    <!-- 顶部导航栏 -->
    <div class="nav-header">
      <div class="nav-left" @click="goBack">
        <van-icon name="arrow-left" size="18" />
        <span class="back-text">返回</span>

      </div>
      <h2 class="title">搜索结果</h2>
    </div>

    <!-- 搜索条件展示 -->
    <div class="search-header">
      <div class="search-conditions">
        <span class="city">北京</span>
        <span class="date">3月15日 - 3月20日</span>
        <span class="guest">2位房客</span>
      </div>
      <button class="filter-btn" @click="showFilter">筛选</button>
    </div>

    <!-- 结果列表 -->
    <div class="content">
      <h2 class="result-count">找到{{ houselist.length }}个房源</h2>
      <div class="list">
        <template v-for="(item, index) in houselist" :key="item.data.houseId">
          <homeContentV9
              v-if="item.discoveryContentType === 9"
              :item-data="item.data"
              @click="itemClick(item.data)"
              class="result-item" />
          <homeContentV3
              v-else-if="item.discoveryContentType === 3"
              :item-data="item.data"
              @click="itemClick(item.data)"
              class="result-item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia'
import useHomeStore from '@/stores/modules/home'
import homeContentV9 from '@/components/home-content-v9/home-content-v9.vue'
import homeContentV3 from '@/components/home-content-v3/home-content-v3.vue'

const router = useRouter()
const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

// 返回逻辑
const goBack = () => {
  router.go(-1)
}

// 房屋点击事件
const itemClick = (data) => {
  router.push("/detail/" + data.houseId)
}

// 筛选按钮点击
const showFilter = () => {
  console.log('打开筛选面板')
}
</script>

<style lang="less" scoped>
.search-result {
  padding-top: 116px; /* 导航栏60px + 搜索条件56px */
  min-height: 100vh;
  background: #f5f5f5;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 100;

  .nav-left {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #007AFF;
    padding: 12px 0;
    transition: opacity 0.3s;

    &:active {
      opacity: 0.6;
    }

    .back-text {
      font-size: 16px;
    }
  }

  .title {
    margin-left: 80px;
    font-size: 18px;
    color: #333;
  }
}

.search-header {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  z-index: 90;

  .search-conditions {
    flex: 1;
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

    span {
      padding: 6px 12px;
      background: #f5f5f5;
      border-radius: 20px;
      font-size: 14px;
      white-space: nowrap;
      color: #666;
    }
  }

  .filter-btn {
    margin-left: 12px;
    padding: 8px 16px;
    background: #007AFF;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    flex-shrink: 0;
  }
}

.content {
  padding-top: 116px;

  .result-count {
    font-size: 14px;
    color: #999;
    margin: 12px 0;
    font-weight: normal;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }

  .result-item {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    background: #fff;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>