import { getCityAll } from "@/service";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
    state: () => ({
        allCities: {},
        currentCity: { cityName: "北京" }
    }),
    actions: {
        // 获取所有城市列表
        async fetchAllCitiesData() {
            const res = await getCityAll();
            this.allCities = res.data;
        }
    }
})

export default useCityStore