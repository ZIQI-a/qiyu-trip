import { defineStore } from "pinia";
import { getOrderAll, getOrderPend, getOrderRecent } from "@/service"

const useOrderStore = defineStore("order", {
    state: () => ({
        orderAll: {},
        orderPend: {},
        orderRecent: {}
    }),
    actions: {
        async fetchOrderALLData() {
            const res = await getOrderAll();
            this.orderAll = res.data.data.orders;
        },
        async fetchOrderPendData() {
            const res = await getOrderPend();
            this.orderPend = res.data.data.orders;
        },
        async fetchOrderRecentData() {
            const res = await getOrderRecent();
            this.orderRecent = res.data.data.orders;
        }
    }
})

export default useOrderStore;