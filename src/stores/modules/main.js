import { defineStore } from "pinia";
//日期范围
const startD = new Date(); //今天的日期
const endD = new Date();
endD.setDate(startD.getDate() + 1);
const useMainStore = defineStore("main", {
    state: () => ({
        token: "",
        startD: startD,
        endD: endD,
        isLoading: false
    })
})

export default useMainStore