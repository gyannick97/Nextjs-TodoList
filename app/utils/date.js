"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateStringToUnix = (date) => {
    const unixTimeStamp = (new Date(date).getTime() / 1000).toFixed(0);
    return unixTimeStamp;
};
const DAY = 86400;
const TWENTY_HOURS = 72000;
const FOUR_HOURS = 14400;
const TWO_HOURS = 7200;
const HOUR = 3600;
const HALF_HOUR = 1800;
const MINUTE = 60;
const ONE_YEAR = 31622400;
const ONE_DAY = 86400;
const TWO_DAYS = 172800;
const THREE_DAYS = 259200;
const FOUR_DAYS = 345600;
const ONE_HOUR = 3600;
const map = {
    oneDay: ONE_DAY,
    twoDays: TWO_DAYS,
    threeDays: THREE_DAYS,
    fourDays: FOUR_DAYS,
    fourHours: FOUR_HOURS,
    oneHour: ONE_HOUR,
};
const getUnixTime = () => {
    return Math.round(Date.now() / 1000);
};
const roundToHalfHour = (unixTime) => {
    const _ = unixTime - (unixTime % HALF_HOUR);
    return _ + HALF_HOUR;
};
const roundToHour = (unixTime) => {
    const _ = unixTime - (unixTime % HOUR);
    return _ + HOUR;
};
const getTimePlus24Hours = (unixTime) => {
    return roundToHalfHour(unixTime + DAY);
};
const getTimePlus4Hours = (unixTime) => {
    return roundToHalfHour(unixTime + FOUR_HOURS);
};
const getTimeMinus20Hours = (unixTime) => {
    return roundToHalfHour(unixTime - TWENTY_HOURS);
};
const getTimeMinus4Hours = (unixTime) => {
    return roundToHalfHour(unixTime - FOUR_HOURS);
};
const getTimeMinus2Hours = (unixTime) => {
    return roundToHalfHour(unixTime - TWO_HOURS);
};
const getTimePlus1Year = (unixTime) => {
    return roundToHalfHour(unixTime + ONE_YEAR);
};
const getNowPlus24Hours = () => {
    return getTimePlus24Hours(getUnixTime());
};
const getNowPlus1Year = () => {
    return getTimePlus1Year(getUnixTime());
};
const getNowPlus4Hours = () => {
    return getTimePlus4Hours(getUnixTime());
};
const getNowMinus20Hours = () => {
    return getTimeMinus20Hours(getUnixTime());
};
const getNowMinus4Hours = () => {
    return getTimeMinus4Hours(getUnixTime());
};
const getNowMinus2Hours = () => {
    return getTimeMinus2Hours(getUnixTime());
};
const getNowMinus = (unit) => {
    return roundToHalfHour(getUnixTime() - map[unit]);
};
const getNowPlus = (unit) => {
    return roundToHalfHour(getUnixTime() + map[unit]);
};
const formatStringFromSeconds = (secs) => {
    const d = new Date(secs * 1000);
    let time = "";
    if (d.getMinutes() !== 0) {
        time = `${d.getUTCHours()} hours ${d.getMinutes()} minutes`;
    }
    else {
        time = `${d.getUTCHours()} hours`;
    }
    return time;
};
exports.default = {
    DAY,
    TWENTY_HOURS,
    FOUR_HOURS,
    HOUR,
    MINUTE,
    getUnixTime,
    getTimePlus24Hours,
    getTimePlus4Hours,
    getNowPlus24Hours,
    getNowPlus4Hours,
    getTimeMinus20Hours,
    getTimeMinus4Hours,
    getTimeMinus2Hours,
    getNowMinus20Hours,
    getNowMinus4Hours,
    getNowMinus2Hours,
    dateStringToUnix,
    formatStringFromSeconds,
    getNowPlus1Year,
    getNowMinus,
    getNowPlus,
};
