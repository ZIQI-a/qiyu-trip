import { defineStore } from "pinia";
// import hyRequest from "@/service/request/index.js"
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/service";

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggest: [],
        categories: [],
        currentPage: 1,
        houselist: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggest = res.data;
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories();
            this.categories = res.data;
        },
        async fetchHouselistData() {
            const res = await getHomeHouselist(this.currentPage);
            this.houselist.push(...res.data);
            this.currentPage++
            console.log(res)
        }
    }
})

export default useHomeStore