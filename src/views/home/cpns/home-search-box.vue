<template>
  <!-- 搜索模块-->
  <div class="search-box">
    <!-- 位置 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCityName }}</div>
      <div class="position" @click="positionClick">
        <div class="text">我的位置</div>
        <img src="@/assets/img/home/icon_location.png">
      </div>
    </div>
    <!-- 入住日期 -->
    <div class="section data-range bottom-gray-line" @click="showDate = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="data">{{ startDate }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayDays }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="data">{{ endDate }}</span>
        </div>
      </div>
    </div>
    <van-calendar v-model:show="showDate" type="range" @confirm="onConfirm" :round="false" color="#ff9854"/>
    <!-- 修改价格人数 -->
    <div class="section price-counter bottom-gray-line">
      <!-- 价格修改 -->
      <div class="start" @click="priceDrawer = true">
        {{ displayPrice[0] === 0 && displayPrice[1] === 0 ? '价格不限' : `¥ ${displayPrice[0]} - ¥ ${displayPrice[1]}` }}
      </div>
      <el-drawer
          v-model="priceDrawer"
          title="价格选择"
          direction="btt"
          :before-close="handleClose"
          style="border-top-left-radius: 30px; border-top-right-radius: 30px;"
      >
        <span>价格区间 ¥ {{ beginPrice }} - {{ endPrice }}</span>
        <el-slider v-model="priceRange" @input="handleSlider" :min="0" :max="maxPriceValue" range/>
        <div>
          <el-row :gutter="10">
            <el-col
                :xs="12"
                :sm="8"
                v-for="tag in priceTags"
                :key="tag.key"
                :span="8"
                style="margin-bottom: 8px;"
            >
              <el-check-tag
                  class="tag-item"
                  :checked="activeTag === tag.key"
                  @click="handleTagClick(tag)"
              >
                {{ tag.label }}
              </el-check-tag>
            </el-col>
          </el-row>
        </div>
        <el-space style="margin-top: 10px">
          <el-button class="clearBtn" @click="clearPrice">清空</el-button>
          <el-button class="okBtn" @click="onPriceChange">确认</el-button>
        </el-space>
      </el-drawer>
      <!-- 修改人数 -->
      <div class="end" @click="peopleDrawer = true">{{ displayPeople ? displayPeople : '人数不限'}}</div>
      <el-drawer
          v-model="peopleDrawer"
          title="人数选择"
          direction="btt"
          :before-close="handleClose"
          style="border-top-left-radius: 30px; border-top-right-radius: 30px;"
      >
        <div>
          <el-row :gutter="10">
            <el-col
                :xs="12"
                :sm="8"
                v-for="tag in peopleTags"
                :key="tag.key"
                :span="8"
                style="margin-bottom: 8px;"
            >
              <el-check-tag
                  class="tag-item"
                  :checked="activeTag === tag.key"
                  @click="handlePeopleTagClick(tag)"
              >
                {{ tag.label }}
              </el-check-tag>
            </el-col>
          </el-row>
        </div>
      </el-drawer>
    </div>

    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/名宿名</div>
    <!-- 热门建议 -->
    <div class="section hot-suggest section">
      <template v-for="(item, index) in hotSuggest" :key="index">
        <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">{{
            item.tagText.text
          }}
        </div>
      </template>
    </div>
    <!-- 开始搜索按钮 -->
    <div class="search-btn section">
      <div class="btn" @click="searchClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {diffDays, formatDate} from '@/utils/format_date.js'
import useHomeStore from '@/stores/modules/home.js';
import useMainStore from '@/stores/modules/main';
import {computed} from '@vue/reactivity'
import {ElMessage} from "element-plus";

const router = useRouter();
//切换城市
const cityClick = () => {
  router.push('/city');
}

/**
 * 地理位置获取方法
 */
const currentCityName = ref('北京');
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
        console.log("找到位置了：", res);
        reverseGeocode(res.coords.longitude, res.coords.latitude)
      },
      err => {
        console.log("莫找到位置");
      })
}

/**
 * 使用高德地图逆地理编码API
 * @param lng 经度
 * @param lat 纬度
 */
const reverseGeocode = (lng, lat) => {
  const apiKey = '600d59a9b2882c60585f4f9d07b2b2e7'; // 高德地图apiKey
  const url = `https://restapi.amap.com/v3/geocode/regeo?key=${apiKey}&location=${lng},${lat}`; // 拼接字符串
  //执行逆编辑
  fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === '1' && data.regeocode) {
          const city = data.regeocode.addressComponent.city;
          //直辖市默认返回null，所以加上省以防万一
          const provice = data.regeocode.addressComponent.province;
          if (city) currentCityName.value = city;
          else if (provice) currentCityName.value = provice;
          else currentCityName.value = '未知'
          ElMessage.success("已为您切换城市: " + (city || provice || "北京"))
        } else {
          ElMessage.success("获取城市失败: " + (data.info || "未知错误"))
        }
      })
      .catch(error => {
        alert("API请求失败: " + error.message);
      });
}


//切换城市

const mainStore = useMainStore();
const {startD, endD} = storeToRefs(mainStore);

const startDate = computed(() => formatDate(startD.value));
const endDate = computed(() => formatDate(endD.value))

const stayDays = ref(diffDays(startD.value, endD.value));

const showDate = ref(false);

const onConfirm = (value) => {
  //更新日期
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  mainStore.startD = selectStartDate;
  mainStore.endD = selectEndDate;
  stayDays.value = diffDays(selectStartDate, selectEndDate);

  //关闭窗口
  showDate.value = false;
}


const homeStore = useHomeStore();
const {hotSuggest} = storeToRefs(homeStore);

// 开始搜索按钮
const searchClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCityName
    }
  })
}

/**
 * 价格弹出框
 */
// 默认在外部展示的价格
const displayPrice = ref([0, 0])
// 定义用到的变量
const priceDrawer = ref(false);
const beginPrice = ref(0);
const endPrice = ref('不限');

const maxPriceValue = 2000
const priceRange = ref([0, maxPriceValue])
const activeTag = ref(null)

const priceTags = [
  {key: 'hundred', label: '￥100以下', range: [0, 100]},
  {key: 'twoHundred', label: '￥100-200', range: [100, 200]},
  {key: 'threeHundred', label: '￥200-300', range: [200, 300]},
  {key: 'fourHundred', label: '￥300-400', range: [300, 400]},
  {key: 'sixHundred', label: '￥400-600', range: [400, 600]},
  {key: 'thousand', label: '￥600-1000', range: [600, 1000]},
  {key: 'twoThousand', label: '￥1000-2000', range: [1000, 2000]},
  {key: 'maxPrice', label: '￥2000以上', range: [2000, maxPriceValue]}
]

const handleTagClick = (tag) => {
  // 切换选中状态
  activeTag.value = activeTag.value === tag.key ? null : tag.key
  // 更新滑块值
  priceRange.value = tag.range
  updatePriceDisplay(tag.range)
}

const handleSlider = (value) => {
  // 滑块变化时清除标签选中
  activeTag.value = null
  updatePriceDisplay(value)
}

const updatePriceDisplay = (range) => {
  beginPrice.value = range[0]
  endPrice.value = range[1] === maxPriceValue ? '不限' : range[1]
}
/** 清楚按钮 */
const clearPrice = () => {
  // 改变范围
  updatePriceDisplay([0, 2000])
  // 不选中价格标签
  activeTag.value = null
  priceRange.value = [0, 2000]
}
/** 确认价格按钮 */
const onPriceChange = () => {
  if (activeTag.value) {
    const currentTag = priceTags.find(tag => tag.key === activeTag.value);
    displayPrice.value = [...currentTag.range];
  }
  // 如果手动调整滑块
  else {
    // 处理"不限"的特殊情况
    const endValue = endPrice.value === '不限'
        ? maxPriceValue
        : priceRange.value[1]
    displayPrice.value = [priceRange.value[0], endValue]
  }

  // 关闭抽屉（保持原有逻辑）
  priceDrawer.value = false
}

/**
 * 人数选择弹出框
 */

// 定义用到的变量
const peopleDrawer = ref(false);
// 显示人数
const displayPeople = ref();

const peopleTags = [
  {key: '1', label: '1人'},
  {key: '2', label: '2人'},
  {key: '3', label: '3人'},
  {key: '4', label: '4人'},
  {key: '5', label: '5人'},
  {key: '6', label: '6人'},
  {key: '7', label: '7人'},
  {key: '8', label: '7人以上'}
]

// 修改人数选择
const handlePeopleTagClick = (tag) => {
  displayPeople.value = tag.label;
  peopleDrawer.value = false;
}


</script>

<style lang="less" scoped>

.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 2px;
      color: #666;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .data {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.data-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggest {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

// 开始搜索按钮
.search-box {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

:deep(.el-drawer) {
  height: 50% !important;
}

.el-check-tag {
  border-radius: 30px;
}

.el-check-tag.el-check-tag--primary.is-checked {
  color: #ff9645;
  background-color: #fff7f0;
  border: 1px #ff9645 solid;
}

:deep(.el-slider__button) {
  border: 0.53333vw solid #ff9645 !important;
}

:deep(.el-slider__bar) {
  background-color: #ff9645;
}

:deep(.el-drawer__body) {
  padding: 5px 30px;
}

.tag-item {
  width: 100%;
  text-align: center;
  padding: 8px 0;
}

.okBtn {
  background-color: #ff9645;
  color: white;
  border-radius: 20px;
  width: 200px;
}

.clearBtn {
  border-radius: 20px;
  width: 100px;
}
</style>