"use strict";

$(document).ready(function () {
    setDatepicker("startDate", "endDate");
});

/**
 * 날짜 세팅
 * @param 날짜
 * @param t 타입 (day, week, month)
 */
var setDate = function (d, t) {
    setDateRange("startDate", "endDate", d, t);
};

/**
 * 페이지 이동
 * @param page
 */
var onPage = function (page) {
    $("#page").val(page);
    $("#searchForm").submit();
};
