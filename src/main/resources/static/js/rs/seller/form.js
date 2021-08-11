"use strict";

/**
 * 중복체크 통과한 아이디
 * @type {boolean}
 */
var existCheckID = "";

/**
 * 등록(regist) or 수정(modify)
 * @type {string}
 */
var mode = "";

$(document).ready(function () {

    mode = $("#mode").val();
});

/**
 * ID 중복체크
 */
var existID = function () {

    var memberID = $("#memberID").val();
    var successFunc = function(data) {
        alert(data.message);
        existCheckID = memberID;
    };

    validate.checkDupMemberID(memberID, successFunc);
};

var submit = function () {
    if(!validationCheck()) {
        return;
    }

    var successFunc = function(res) {
        alert(res.message);
        location.href = "/rs/seller";
    };

    var failFunc = function(msg) {
        alert(msg);
    };

    var type = "";
    if(mode === "regist")
        type = "post";
    else
        type = "put";

    requestAjax("/rs/seller", type, $("#editForm").serialize(), successFunc, failFunc);
};

var validationCheck = function () {
    if(mode === "regist") {
        if ($("#memberID").val() === "") {
            alert("판매자 ID를 입력해주세요.");
            $("#memberID").focus();
            return false;

        } else if ($("#memberID").val() !== existCheckID) {
            alert("아이디 중복확인 해주세요.");
            return false;
        }

        if($("#passwd").val() === "") {
            alert("비밀번호를 입력해주세요.");
            $("#passwd").focus();
            return false;
        }
    }

    if($("#passwd").val() !== "" ) {
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

        if($("#passwd").val() !== $("#pwConfirm").val()) {
            alert("비밀번호 확인이 틀립니다.");
            $("#pwConfirm").focus();
            return false;
        }
    }


    if($("#email").val() === "") {
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return false;

    } else if(!validate.isEmail($("#email").val())) {
        alert("이메일을 올바르게 입력해주세요.");
        $("#email").focus();
        return false;
    }

    return basicInfoFormCheck();
};
