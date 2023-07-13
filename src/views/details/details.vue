<template>
    <div class="detail top-page" ref="detailRef">
        <tab-control v-if="showTabControl" class="tabs" :titles="names" @tabItemClick="tabClick" ref="tabControlRef" />
        <!-- <van-tabs v-if="showTabControl" v-model:active="active" class="tabs" @click-tab="onClickTab">
            <template v-for="(item, index) in names">
                <van-tab :title="item" :name="index" ref="tabsRef"></van-tab>
            </template>
        </van-tabs> -->

        <van-nav-bar title="房屋详情" left-text="主页" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart">
            <DetailSwipe :swipeData="mainPart.topModule.housePicture.housePics" />
            <DetailInfos name="描述" :ref="getSectionRef" :topInfos="mainPart.topModule" />
            <DetailFacility name="设施" :ref="getSectionRef"
                :house-facility="mainPart.dynamicModule.facilityModule.houseFacility" />
            <DetailLandlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
            <DetailComment name="评论" :ref="getSectionRef" :comments="mainPart.dynamicModule.commentModule" />
            <DetailReverse name="须知" :ref="getSectionRef" :rules="mainPart.dynamicModule.rulesModule" />
            <DetailMap name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule" />
            <DetailIntro :intro="mainPart.introductionModule" />
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">奇遇旅途，奇妙旅程</div>
        </div>

    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { getDetailInfos } from '@/service'

import DetailSwipe from './cpns/detail-01-swipe.vue'
import DetailInfos from './cpns/detail-02-infos.vue'
import DetailFacility from './cpns/detail-03-facility.vue'
import DetailLandlord from './cpns/detail-04-landlord.vue'
import DetailComment from './cpns/detail-05-comment.vue'
import DetailReverse from './cpns/detail-06-reserve.vue'
import DetailMap from './cpns/detail-07-map.vue'
import DetailIntro from './cpns/detail-08-intro.vue'
import tabControl from '@/components/tab-control/tab-control.vue'
import onScroll from '@/hooks/onScroll'

const router = useRouter();
const route = useRoute();
const houseId = route.params.id

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart);
getDetailInfos(houseId).then(res => {
    // console.log(res)
    detailInfos.value = res.data
})

const onClickLeft = () => {
    router.back();
}

//顶部导航栏的显示与隐藏
const detailRef = ref()
const { scrollTop } = onScroll(detailRef);
const showTabControl = computed(() => {
    return scrollTop.value >= 300
})
//-------------------------------------------------------
const sectionEls = ref({})
const names = computed(() => {
    return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
    if (!value) return;//判断是否为空，如果为空则直接退出，否则返回会出问题
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
    const key = Object.keys(sectionEls.value)[index]
    const el = sectionEls.value[key]
    let distance = el.offsetTop
    if (index !== 0) {
        distance = distance - 44
    }

    isClick = true
    currentDistance = distance

    detailRef.value.scrollTo({
        top: distance,
        behavior: "smooth"
    })
}


// 页面滚动, 滚动时匹配对应的tabControll的index
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
    if (newValue === currentDistance) {
        isClick = false
    }
    if (isClick) return

    // 1.获取所有的区域的offsetTops
    const els = Object.values(sectionEls.value)
    const values = els.map(el => el.offsetTop)

    // 2.根据newValue去匹配想要索引
    let index = values.length - 1
    for (let i = 0; i < values.length; i++) {
        if (values[i] > newValue + 44) {
            index = i - 1
            break
        }
    }
    // console.log(index)
    tabControlRef.value?.setCurrentIndex(index)
    // console.log(tabControlRef.value)
})

// //页面滚动监听，和tab联
// watch(scrollTop, (newValue) => {
//     if (newValue === currentDistance) isClick = false;
//     if (isClick) return;

//     // 1.获取所有的区域的offsetTops
//     const els = Object.values(sectionEls.value)
//     const values = els.map(el => el.offsetTop)

//     let index = values.length - 1;
//     for (let i = 0; i < values.length; i++) {
//         if (values[i] > newValue + 44) {
//             index = i - 1;
//             break;
//         }
//     }
//     console.log(tabsRef.value);
//     tabsRef.value?.setCurrentIndex(index);
// })

</script>

<style lang="less" scoped>
.tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
}

.footer {
    text-align: center;
    margin-top: 70px;
    margin: 40px 0;

    img {
        width: 40%;
    }

    .text {
        font-size: 14px;
        color: #7688a7;
        margin-top: 10px;
    }
}
</style>