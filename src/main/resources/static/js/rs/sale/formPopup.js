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
 * 중복체크
 */
var existID = function () {
    if ($("#cTel").val() === "") {
        alert("매장 번화 번호를 입력해주세요.");
        $("#cTel").focus();
        return false;

    } else if ($("#cTel").val().length < 8 || $("#cTel").val().length > 11) {
        alert("매장 전화 번호를 8 ~ 11자 사이로 입력해주세요.");
        $("#cTel").focus();
        return false;
    }

    var tel = $("#cTel").val();
    requestAjax("/rs/sale/common/existTelCheck?tel="+tel, "get", null, function () {
        alert("등록가능합니다.");
        existCheckID = tel;
    }, function () {
        alert("이미 등록된 상점입니다.");
    });

};

/**
 * 주소검색
 */
var searchAddr = function() {
    new daum.Postcode({
        oncomplete: function (data) {
            $("#address").val(data.roadAddress);
        }
    }).open({left: 200, top: 200});
};

var submit = function () {
    if(!validCheck())
        return;

    requestAjaxForm("editForm", function (res) {
        location.reload();
    });

};

function validCheck() {
    if($("#cName").val() === "") {
        alert("상호명을 입력해주세요.");
        $("#cName").focus();
        return false;
    }

    if(mode === 'regist') {
        if ($("#cTel").val() === "") {
            alert("매장 번화 번호를 입력해주세요.");
            $("#cTel").focus();
            return false;
        } else if(existCheckID === "" || existCheckID !== $("#cTel").val()) {
            alert("매장 번화 번호 중복확인을 해주세요.");
        }

        if ($("#cno").val() === "") {
            alert("사업자 등록 번호를 입력해주세요.");
            $("#cno").focus();
            return false;

        } else if ($("#cno").val().length !== 10) {
            alert("사업자 등록 번호를 10자로 입력해주세요.");
            $("#cno").focus();
            return false;
        }
    }

    if($("#cMobile").val() === "") {
        alert("휴대폰 번호를 입력해주세요.");
        $("#cMobile").focus();
        return false;

    } else if(!validate.isMobile($("#cMobile").val())) {
        alert("휴대폰번호를 올바르게 입력해주세요.");
        $("#cMobile").focus();
        return false;
    }

    /*if($("#roadAddr").val() === "") {
        alert("주소를 입력해주세요.");
        return false;
    }*/

    return true;
}
