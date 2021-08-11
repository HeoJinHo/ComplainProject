"use strict";

var isMobileAuth = false;

//휴대폰번호 관련 체크
var mobileChkFunc = function (id) {
    if(!validate.isMobile($(id).val())) {
        alert("휴대폰번호가 유효하지 않습니다.");
        $(id).focus();
        return false;
    }

    if(!isMobileAuth) {
        alert("휴대폰번호를 인증해주세요.");
        return false;
    }
    return true;
};

//이메일관련 체크
var emailChkFunc = function (id) {
    if(!validate.isEmail($(id).val())) {
        alert("이메일을 올바르게 입력해주세요.");
        $(id).focus();
        return false;
    }
    return true;
};

//매장전화번호 관련 체크
var companyTelChkFunc = function (id) {
    if($(id).val().length < 8 || $(id).val().length > 11) {
        alert("매장전화번호를 8 ~ 11자 사이로 입력해주세요.");
        $(id).focus();
        return false;
    }
    return true;
};

//사업자번호 관련 체크
var companyNoChkFunc = function (id) {
    if($(id).val().length !== 10) {
        alert("사업자번호를 10자로 입력해주세요.");
        $(id).focus();
        return false;
    }
    return true;
};

var chkArr = [
    {id : "#companyName", msg:"상호명을 입력해주세요.", func:null},
    {id : "#companyNo", msg:"사업자번호를 입력해주세요.", func:companyNoChkFunc},
    {id : "#companyTel", msg:"매장전화번호를 입력해주세요.", func:companyTelChkFunc},
    {id : "#ceoName", msg:"대표자명을 입력해주세요.", func:null},
    {id : "#name", msg:"이름을 입력해주세요.", func:null},
    {id : "#serviceType", msg:"서비스 구분을 선택해주세요.", func:null},
    {id : "#email", msg:"이메일을 입력해주세요.", func:emailChkFunc},
    {id : "#mobileText", msg:"휴대폰번호를 입력해주세요.", func:mobileChkFunc},
    {id : "#zipCode", msg:"주소를 입력해주세요.", func:null}
];

/**
 *  필수값 체크
 */
function basicInfoSubmitCheck() {
    //각 입력항목 체크
    for(var i = 0; i < chkArr.length; i++) {
        var element = $(chkArr[i].id);
        if(element.val() !== undefined) {
            if (element.val() == null || element.val() === "" ) {
                alert(chkArr[i].msg);
                element.focus();
                return false;
            }

            if (chkArr[i].func != null) {
                if(!chkArr[i].func(chkArr[i].id)) {
                    return false;
                }
            }
        }
    }

    return true;
}

/**
 * 주소검색
 */
var searchAddr = function() {
    new daum.Postcode({
        oncomplete: function (data) {
            console.log(data);
            $("#zipCodeText").val(data.zonecode);
            $("#zipCode").val(data.zonecode);
            $("#roadAddr").val(data.roadAddress);
            $("#jibunAddr").val(data.jibunAddress);
        }
    }).open({left: 200, top: 200});
};

/**
 * 휴대폰 인증번호 요청
 */
function reqMobileAuth () {
    if(isMobileAuth) return;

    var mobile = $("#mobileText").val();

    if(mobile === "") {
        alert("('-')없이 휴대전화번호를 입력해주세요.");
        $("mobileText").focus();
        return false;

    } else if(!validate.isMobile(mobile)) {
        alert("휴대폰번호가 유효하지 않습니다.");
        $("mobileText").focus();
        return false;
    }

    var successFunc = function(res) {
        alert(res.message);
        $("#authDiv").show();
    };

    requestAjax("/se/setting/mypage/mobile/reqMobileAuth", "post", {"mobile":mobile}, successFunc);
}

/**
 * 인증하기
 */
function checkAuthCode() {
    if(isMobileAuth) return;

    var mobile = $("#mobileText").val();
    var authCode = $("#authCode").val();

    if(authCode === "") {
        alert("인증번호를 입력해주세요.");
        $("#authCode").focus();
        return;
    }

    var successFunc = function(res) {
        alert(res.message);
        isMobileAuth = true;
        $("#mobile").val(mobile);
        $("#checkAuthBtn").text("인증완료");
        $("#mobileModifyCancelBtn").hide();
    };

    requestAjax("/se/setting/mypage/mobile/checkAuthCode", "get", {"mobile":mobile, "authCode":authCode}, successFunc);
}


function basicInfoSubmit() {
    if(!basicInfoSubmitCheck())
        return;

    requestAjaxForm("basicForm", function (res) {
        alert("등록 되었습니다.");
        location.href = "/";
    });
}