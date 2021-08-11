"use strict";

function valicationCheck() {

    if ($("#detailType").val() === null) {
        alert("구분을 선택해주세요.");
        $("#detailType").focus();
        return false;
    }

    if ($("#subject").val() === "") {
        alert("제목을 입력해주세요.");
        $("#subject").focus();
        return false;
    }

    if ($("#boardContent").val() === "") {
        alert("내용을 입력해주세요.");
        $("#boardContent").focus();
        return false;
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }

    if($("#mode").val() === "regist") {
        $("#articleNo").remove();
    }

    requestAjaxForm("editForm", function (res) {
        alert(res.message);
        location.href = "/se/help/qa";
    });
}