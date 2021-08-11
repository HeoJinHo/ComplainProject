"use strict";

var submit = function () {
    if(!validationCheck()) {
        return;
    }

    var boardID, type, url, errorMsg;

    boardID = $("#boardID").val();
    if($("#mode").val() === "regist") {
        type = "POST";
        url = "/rs/board/regist";
        errorMsg = "등록 실패했습니다.";
    } else {
        type = "PUT";
        url = "/rs/board/modify/"+$("#articleNo").val();
        errorMsg = "수정 실패했습니다.";
    }

    var successFunc = function(res) {
        alert(res.message);
        location.href = "/rs/board?boardID="+boardID;
    };

    var errorFunc = function(request, status, error) {
        alert(errorMsg);
        console.log("에러코드 : " + request.status +"\n" + "메시지 :"+ request.responseText);
    };

    $("#editForm").ajaxForm({
        type: type,
        url : url,
        enctype: "multipart/form-data",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    $("#editForm").submit();
};

var validationCheck = function () {
    if ($("#detailType option:selected").val() === "") {
        alert("유형을 선택해주세요.");
        return false;
    }

    if ($("#subject").val() === "") {
        alert("제목을 입력해주세요.");
        $("#subject").focus();
        return false;
    }

    oEditors.getById["content"].exec("UPDATE_CONTENTS_FIELD", []);

    if ($("#content").val() === "" || $("#content").val() === "<br>") {
        alert("내용을 입력해주세요.");
        return false;
    }

    return true;
};
