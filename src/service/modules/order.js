import HYRequest from "../request"

export function getOrderPend() {
    return HYRequest.get({ url: "/order/list?type=pend" })
}

export function getOrderRecent() {
    return HYRequest.get({ url: "/order/list?type=recent" })
}

export function getOrderAll() {
    return HYRequest.get({ url: "/order/list?type=all" })
}