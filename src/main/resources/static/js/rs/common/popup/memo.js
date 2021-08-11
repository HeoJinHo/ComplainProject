"use strict";

$(document).ready(function () {

});

var memoPopup = function (memberID) {
    //메모팝업 오픈
    fnShowPop("memoPop");

    //회원ID 데이터 세팅
    $("#memoMemberID").val(memberID);

    //회원의 메모 데이터 조회
    var url = "/rs/member/memo?memberID="+memberID;
    var successFunc = function(res) {
        $("#memoContent").val(res.data);
    };
    
    // 메모 조회
    requestAjax(url, "get", null, successFunc);
};

// 메모 수정
var memoUpdate = function () {
    if($("#memoContent").val() === "") {
        alert("메모를 입력해주세요.");
        return;
    }

    requestAjaxForm("memoForm", function (res) {
        alert(res.message);
        $("#searchForm").submit();
    });
};

function memoDelete() {
    if($("#memoContent").val() === "") {
        alert("삭제할 내용이 없습니다.");
        return;
    }
    
    requestAjax("/rs/member/memo/"+$("#memoMemberID").val(), "delete", null, function (res) {
        alert(res.message);
        $("#searchForm").submit();
    });
}