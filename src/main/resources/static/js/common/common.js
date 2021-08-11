"use strict";



/**
 * 공통되는 checkBox의 값들을 구분자로 합쳐서 반환
 * @param name
 */
function getChecksValue(name, delimiter) {
    var idArr = [];

    $("input[name="+name+"]:checked").each(function() {
        idArr.push($(this).val());
    });

    return idArr.join(",");
}



/**
 * 글자수 체크
 * @param textLength
 * @param lengthDisplayID
 * @param limitCount
 */
function strLengthDisplay(textLength, lengthDisplayID, limitCount) {
    if(limitCount !== undefined && textLength > limitCount) {
        textLength = limitCount;
    }

    $("#"+lengthDisplayID).text(textLength);
}

/**
 * string null || "" 체크
 * @param str
 */
function isStrNull(str) {
    return str == null || str === "";
}

/**
 * 페이지 이동
 * @param page
 */
var onPage = function (page) {
    $("#page").val(page);
    $("#searchForm").submit();
};


$(document).ready(function () {
    // 검색 초기화
    $("#resetBtn").click(function () {
        var url = $("#searchForm").prop("action");
        console.log(url);
        location.href = url;
    });

});