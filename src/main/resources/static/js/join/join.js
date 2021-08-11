'use strict';

// 중복체크 통과 아이디
var existCheckID = "";

// 휴대폰 인증 여부
var isMobileAuth = false;

$(document).ready(function () {

    /**
     * 사업자/개인 세팅
     */
    $("input[name=businessType]").change(function (e) {
        /*if(e.target.value === 'PERSONAL') {
            alert("개인은 현재 가입이 불가능합니다.");
            $("#businessTypeCompany").prop('checked', true);
        }*/
        changeBusinessType(e.target.value);
    });

    //서비스 구분 "직접입력" 선택 시, 입력란 출력
    $("#serviceType").change(function (e) {
        $("#inputServiceDiv").css("display", e.target.value === "직접입력" ? "block" : "none");
    });

    //약관 전체 체크
    $("#agreeAll").change(function (e) {
        $("input[name=agree]").prop('checked', e.target.checked);
    })

});

/**
 * 사업자/개인 선택
 * @param type (COMPANY : 사업자, PERSONAL : 개인)
 */
function changeBusinessType (type) {
    if(type === 'COMPANY') {
        $("#companyInputGroup").show();
        $("#personalInputGroup").hide();
    } else if(type === 'PERSONAL') {
        $("#personalInputGroup").show();
        $("#companyInputGroup").hide();
    }
}

/**
 * ID 중복체크
 */
function existID() {
    var memberID = $("#memberID").val();

    validate.checkDupMemberID(memberID, function(res) {
        existCheckID = memberID;
        alert(res.message);
        $("#memberIdInputGroup").removeClass("alert");
        $("#memberCheckFailMsg").hide();
    }, function (message) {
        alert(message);
        $("#memberIdInputGroup").addClass("alert");
        $("#memberCheckFailMsg").show();
    });
}

/**
 * 주소검색
 */
function searchAddr() {
    new daum.Postcode({
        oncomplete: function (data) {
            $("#zipCode").val(data.zonecode);
            $("#roadAddr").val(data.roadAddress);
            $("#jibunAddr").val(data.jibunAddress);
        }
    }).open({left: 200, top: 200});
}

/**
 * 휴대폰 인증번호 요청
 */
function reqMobileAuth () {
    if(isMobileAuth) return;

    var mobile = $("#mobile").val();

    if(mobile === "") {
        alert("('-')없이 휴대전화번호를 입력해주세요.");
        $("#mobile").focus();
        return false;

    } else if(!validate.isMobile(mobile)) {
        alert("휴대전화번호를 올바르게 입력해주세요.");
        $("#mobile").focus();
        return false;
    }

    requestAjax("/j/mobileAuth/request", "post", {"mobile":mobile}, function (res) {
        alert(res.message);
        $("#checkAuthGroup").show();
    });
}

/**
 * 인증하기
 */
function checkAuthCode () {
    if(isMobileAuth) return;

    var mobile = $("#mobile").val();
    var authCode = $("#authCode").val();

    if(authCode === "") {
        alert("인증번호를 입력해주세요.");
        $("#authCode").focus();
        return false;
    }

    requestAjax("/j/mobileAuth/check", "post", {mobile:mobile, authCode:authCode}, function (res) {
        alert(res.message);
        isMobileAuth = true;
        $("#mobile").prop("readonly", true);
        $("#authCode").prop("readonly", true);
        $("#checkAuthBtn").text("인증완료");
    });
}

function requestJoin () {
    if(!validationCheck())
        return;

    requestAjax("/rs/seller/join", "post", $("#editForm").serialize(), function () {
        location.href = "/j/fin";
    });
}

function validationCheck () {

    if ($("#memberID").val() === "") {
        alert("아이디를 입력해주세요.");
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

    if($("#passwd").val() !== "" ) {
        if (!validate.checkPasswd($("#passwd").val())) {
            alert("비밀번호는 영문자 + 숫자 조합으로 8자이상 입력해주세요.");
            $("#passwd").focus();
            return false;
        }

        if ($("#passwdCheck").val() === "") {
            alert("비밀번호 확인을 입력해주세요.");
            $("#passwdCheck").focus();
            return false;
        }

        if($("#passwd").val() !== $("#passwdCheck").val()) {
            alert("비밀번호 확인이 일치하지 않습니다.");
            $("#passwdCheck").focus();
            return false;
        }
    }

    if($("#mobile").val() === "") {
        alert("휴대폰번호를 입력해주세요.");
        $("#mobile").focus();
        return false;
    }

    if(!isMobileAuth) {
        alert("휴대폰 인증을 해주세요.");
        return false;
    }

    //사업자
    if($("input[name=businessType]:checked").val() === "COMPANY") {
        if($("#companyNo").val() === "") {
            alert("사업자등록번호를 입력해주세요.");
            $("#companyNo").focus();
            return false;
        } else if($("#companyNo").val() !== "" && $("#companyNo").val().length !== 10) {
            alert("사업자번호를 10자로 입력해주세요.");
            $("#companyNo").focus();
            return false;
        }

        if($("#companyName").val() === "") {
            alert("상호명(법인명)을 입력해주세요.");
            $("#companyName").focus();
            return false;
        }

        if($("#companyTel").val() === "") {
            alert("매장전화번호를 입력해주세요.");
            $("#companyTel").focus();
            return false;
        } else if($("#companyTel").val().length < 8 || $("#companyTel").val().length > 11) {
            alert("매장전화번호를 8 ~ 11자 사이로 입력해주세요.");
            $("#companyTel").focus();
            return false;
        }

        if($("#ceoName").val() === "") {
            alert("대표자명을 입력해주세요.");
            $("#ceoName").focus();
            return false;
        }

    //개인
    } else {
        if($("#name").val() === "") {
            alert("이름을 입력해주세요.");
            $("#name").focus();
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

    var serviceType = $("#serviceType").val();
    if(serviceType === "") {
        alert("서비스구분을 선택해주세요.");
        return false;

    } else if(serviceType === "직접입력" && $("#inputServiceType").val() === "") {
        $("#inputServiceType").focus()
        alert("서비스구분을 입력해주세요.");
        return false;
    }

    if(!$("#agree1").is(":checked") || !$("#agree2").is(":checked") || !$("#agree3").is(":checked")) {
        alert("이용약관에 동의해주세요.");
        return false;
    }

    return true;
}

