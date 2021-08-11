"use strict";

/**
 * 삭제
 * @param articleNo
 */
var deleteBoard = function (articleNo) {
    if(confirm("삭제하시겠습니까?")) {
        var successFunc = function (res) {
            alert(res.message);
            location.href = "/rs/board?boardID="+$("#boardID").val();
        };

        requestAjax("/rs/board/"+articleNo, "delete", null, successFunc);
    }
};

/**
 * 댓글 등록
 */
var replyRegist = function (articleNo) {
    var successFunc = function (res) {
        alert(res.message);
        location.reload();
    };

    requestAjax("/rs/board/reply", "post", {"boardNo":articleNo, "content":$("#replyContent").val()}, successFunc);

};

/**
 * 파일 다운
 * @param attachNo
 */
var fileDown = function (attachNo) {
    $("#attachNo").val(attachNo);
    $("#fileDownForm").submit();
};