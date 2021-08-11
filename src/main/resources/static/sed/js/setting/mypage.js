"use strict";

var changeMobile = false;
var isMobileAuth = false;

$(document).ready(function () {
    
    //정산승인 상태일 때, 비활성화
    if($("#authState").val() === "ALLOW") {
        $("#companyName").prop("disabled", true);
        $("#ceoName").prop("disabled", true);
        $("#name").prop("disabled", true);
        $("#email").prop("disabled", true);
        $("#serviceType").prop("disabled", true);
        $("#detailAddr").prop("disabled", true);
        $("#addressBtnArea").hide();
    }

    // 휴대폰 번호 수정, 취소
    $("#mobileModifyBtn, #mobileModifyCancelBtn").click(function () {
        var id = $(this).prop("id");
        if(id === "mobileModifyBtn") {
            changeMobile = true;
            $("#newMobile").val("");
            $("#authCode").val("");
            $("#newMobileDiv").show();
            $("#mobileModifyCancelBtn").show();
            $("#mobileModifyBtn").hide();
        } else {
            changeMobile = false;
            $("#newMobileDiv").hide();
            $("#authDiv").hide();
            $("#mobileModifyCancelBtn").hide();
            $("#mobileModifyBtn").show();
        }
    });
});

function deleteSellerImg ()
{
    $.ajax({
        url : "/se/setting/mypage/sellerImg",
        type: "delete",
        dataType: "json",
        success: function (res) {
            if (res.success === "Y") {
                $(".up-img").prop("src", "/sed/images/img_upload.png");
                $(".delFile").remove();
            }
        },
        error: function (request) {
            alert("error : " + request.status);
            console.log("에러코드 : " + request.status + "\n" + "메시지 :" + request.responseText);
        }
    });
}

/**
 * 휴대폰 인증번호 요청
 */
function reqMobileAuth () {
    if(isMobileAuth) return;

    var mobile = $("#newMobile").val();

    if(mobile === "") {
        alert("('-')없이 휴대전화번호를 입력해주세요.");
        $("#newMobile").focus();
        return false;

    } else if(!validate.isMobile(mobile)) {
        alert("휴대폰번호가 유효하지 않습니다.");
        $("#newMobile").focus();
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

    var mobile = $("#newMobile").val();
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
        $("#mobileText").val(mobile);
        $("#checkAuthBtn").text("인증완료");
        $("#newMobileDiv").hide();
        $("#authDiv").hide();
        $("#mobileModifyCancelBtn").hide();
    };

    requestAjax("/se/setting/mypage/mobile/checkAuthCode", "get", {"mobile":mobile, "authCode":authCode}, successFunc);
}

function valicationCheck() {

    if ($("#passwd").val() !== "") {
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
        alert("이메일을 입력해주세요.");
        $("#email").focus();
        return false;

    } else if(!validate.isEmail($("#email").val())) {
        alert("이메일을 올바르게 입력해주세요.");
        $("#email").focus();
        return false;
    }

    //사업자
    if($("#businessType").val() === "COMPANY") {
        if($("#companyName").val() === "") {
            alert("상호명(법인명)을 입력해주세요.");
            $("#companyName").focus();
            return false;
        }

        if($("#ceoName").val() === "") {
            alert("대표자명을 입력해주세요.");
            $("#ceoName").focus();
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

    //개인
    } else {
        if($("#name").val() === "") {
            alert("이름을 입력해주세요.");
            $("#name").focus();
            return false;
        }
    }

    if($("#zipCode").val() === "") {
        alert("주소를 선택해주세요");
        return false;
    }

    if($("#detailAddr").val() === "") {
        $("#detailAddr").focus();
        alert("상세주소를 입력해주세요.");
        return false;
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }

    requestAjaxForm("editForm", function (res) {
        alert(res.message);
        location.reload();
    });
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
            $("#addressText").val(data.roadAddress);
            $("#roadAddr").val(data.roadAddress);
            $("#jibunAddr").val(data.jibunAddress);
        }
    }).open({left: 200, top: 200});
};

function previewImage(input) {
    var filename = input.files[0].name;

    // 확장자 체크
    if(!/\.(gif|jpg|jpeg|png)$/i.test(filename)) {
        alert('이미지 파일만 선택해 주세요.\n\n현재 파일 : ' + filename);
    }
    else {
        var reader = new FileReader();
        reader.onload = function(){
            var output = document.getElementById('img');
            output.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);

        $("#imgName").text(filename);
    }
}