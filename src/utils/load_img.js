//获取地址

export const getAssetURL = (image) => {
    return new URL(`../assets/img/tabbar/${image}`, import.meta.url).href
}