import HYRequest from '../request'

export function getFavorList() {
    return HYRequest.get({
        url: "/favor/list"
    })
}

export function getFavorHistory() {
    return HYRequest.get({
        url: "/favor/history"
    })
}