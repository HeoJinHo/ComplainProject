"use strict";

/**
 * 페이지 이동
 * @param page
 */
var onPage = function (page) {
    $("#page").val(page);
    $("#searchForm").submit();
};