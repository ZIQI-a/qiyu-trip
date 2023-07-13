import { defineStore } from "pinia";
import { getFavorHistory, getFavorList } from '@/service'

const useFavorStore = defineStore("favor", {
    state: () => ({
        history: {},
        favorList: {}
    }),
    actions: {
        async fetchFavorHistory() {
            const res = await getFavorHistory();
            this.history = res.data.data.items;
        },
        async fetchFavorList() {
            const res = await getFavorList();
            this.favorList = res.data.data.items;
        }
    }
})

export default useFavorStore;