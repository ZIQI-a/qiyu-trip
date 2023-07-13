<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </template>
            <!-- 插槽，改变轮播标记 -->
            <template #indicator="{ active, total }">
                <div class="indivator">
                    <template v-for="(value, key, index) in swipeGroup" :key="key">
                        <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            {{ setName(value[0].title) }}
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swipeData[active]) }} / {{ value.length }}
                            </span>
                        </span>
                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>

<script setup>

const props = defineProps({
    swipeData: {
        type: Array,
        default: () => { }
    }
})

//对数据进行转换
const swipeGroup = {}

for (const item of props.swipeData) {
    let valueArray = swipeGroup[item.enumPictureCategory];
    if (!valueArray) {
        valueArray = [];
        swipeGroup[item.enumPictureCategory] = valueArray;
    }
    valueArray.push(item);
}

//定义转换数据的方法
const nameReg = /【(.*?)】/i //正则表达式
const setName = (name) => {
    const results = nameReg.exec(name);
    return results[1];
}

const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory];
    return valueArray.findIndex(data => data === item) + 1;
}

</script>

<style lang="less" scoped>
.swipe {
    .swipe-list {
        .item {
            img {
                width: 100%;
            }
        }

        .indivator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
            border-radius: 5px;
            background: rgba(0, 0, 0, 0.7);

            .item {
                margin: 0 2px;

                &.active {
                    background-color: #fff;
                    color: #000;
                    border-radius: 5px;
                    padding: 0 4px;
                }
            }
        }
    }

}
</style>