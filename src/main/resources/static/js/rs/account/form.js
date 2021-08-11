"use strict";

$(document).ready(function () {
});

var submit = function () {
    if(!validationCheck()) {
        return;
    }

    var successFunc = function(res) {
        alert(res.message);
        location.href = "/rs/account";
    };

    var failFunc = function(msg) {
        alert(msg);
    };

    requestAjax("/rs/account", "put", $("#editForm").serialize(), successFunc, failFunc);
};

var validationCheck = function () {

    if($("#passwd").val() !== "") {

        if (!validate.checkPasswd($("#passwd").val())) {
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
    }

    if($("#email").val() === "") {
        alert("이메일주소를 입력해주세요.");
        $("#email").focus();
        return false;

    } else if(!validate.isEmail($("#email").val())) {
        alert("이메일을 올바르게 입력해주세요.");
        $("#email").focus();
        return false;
    }

    return basicInfoFormCheck();
};
