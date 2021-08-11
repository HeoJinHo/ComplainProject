"use strict";

$(document).ready(function () {
    setDatepicker("startDate", "endDate");
});

/**
 * 날짜 세팅
 * @param d
 * @param t
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

/**
 * 필수 서류 제출 팝업
 */
var documentPop = function (memberID, docType) {
    $("#documentPopupDiv").load("/rs/member/documentFile?memberID="+memberID+"&docType="+docType, function () {
        fnShowPop("documentPop");
    });
};

/**
 * 마진 설정 팝업
 */
var marginSettingPop = function (memberID) {
    $("#marginSettingPopupDiv").load("/rs/member/marginSettingPopup?targetMemberID="+memberID, function () {
        fnShowPop("popSetMargin");
    });
};

