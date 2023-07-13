import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

export default function onScroll(elRef) {
    const isReachBottom = ref(false);
    let el = window

    const scrollTop = ref(0);
    const scrollHeight = ref(0);
    const clientHeight = ref(0);
    //监听窗口滚动
    const reachBottom = throttle(() => {
        if (el === window) {
            // 窗口上方倒顶部的长度
            scrollTop.value = document.documentElement.scrollTop;
            // 页面总高度
            scrollHeight.value = document.documentElement.scrollHeight;
            // 屏幕高度
            clientHeight.value = document.documentElement.clientHeight;
        } else {
            scrollTop.value = el.scrollTop;
            scrollHeight.value = el.scrollHeight;
            clientHeight.value = el.clientHeight;
            // console.log(scrollTop.value, clientHeight.value)
        }

        // console.log("监听到滚动")
        if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
            console.log("滚动到底部")
            isReachBottom.value = true;
        }
    }, 300);
    // 进入时开启，退出时关闭监听
    onMounted(() => {
        if (elRef) el = elRef.value;
        el.addEventListener("scroll", reachBottom);
    })
    onUnmounted(() => {
        el.removeEventListener("scroll", reachBottom);
    })

    return { scrollTop, scrollHeight, clientHeight, isReachBottom };
}
