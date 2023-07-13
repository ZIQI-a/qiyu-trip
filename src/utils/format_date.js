import dayjs from 'dayjs'

export function formatDate(date, formatStr = "MM月DD日") {
    return dayjs(date).format(formatStr);
}

export function diffDays(startDay, endDay) {
    return dayjs(endDay).diff(startDay, "day");
}