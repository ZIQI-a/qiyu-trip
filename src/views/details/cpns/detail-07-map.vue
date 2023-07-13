<template>
    <div class="map">
        <detailSection title="位置周边" moreText="查看更多周边信息">
            <div class="baidu" ref="mapRef">

            </div>
        </detailSection>
    </div>
</template>

<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';
import { onMounted, ref } from 'vue'

const mapRef = ref();

const props = defineProps({
    position: {
        type: Object,
        default: () => ({})
    }
})

onMounted(() => {
    var map = new BMapGL.Map(mapRef.value);
    var point = new BMapGL.Point(props.position.longitude, props.position.latitude);
    map.centerAndZoom(point, 17);
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // 添加地图中的标注
    var marker = new BMapGL.Marker(point);        // 创建标注 
    map.addOverlay(marker);
})

</script>

<style lang="less" scoped>
.baidu {
    height: 250px;
}
</style>