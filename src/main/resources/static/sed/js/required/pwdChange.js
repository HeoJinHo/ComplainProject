"use strict";
function pwdChangeSubmitCheck() {
    if ($("#passwd").val() === "") {
        alert("비밀번호를 입력해주세요.");
        $("#passwd").focus();
        return false;

    } else if (!validate.checkPasswd($("#passwd").val())) {
        alert("비밀번호는 영문자 + 숫자 조합으로 8자이상 입력해주세요.");
        $("#passwd").focus();
        return false;
    }

    if ($("#pwConfirm").val() === "") {
        alert("비밀번호 확인을 입력해주세요.");
        $("#pwConfirm").focus();
        return false;
    }

    if ($("#passwd").val() !== $("#pwConfirm").val()) {
        alert("비밀번호 확인이 틀립니다.");
        $("#pwConfirm").focus();
        return false;
    }

    return true;
}

function moveNext() {
    if(pwdChangeSubmitCheck()) {
        moveStep(2);
    }
}

function pwdChangeSubmit() {
    if(!pwdChangeSubmitCheck())
        return;

    requestAjaxForm("pwdForm", function (res) {
        alert("변경 되었습니다.");
        location.href = "/";
    });
}