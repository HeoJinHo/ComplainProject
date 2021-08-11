"use strict";

$(document).ready(function () {

    /**
     * 리셀러, 대리점 등록은 개인 가입 가능하도록 변경.
     */
    const memberType = document.querySelector("input[name=memberType]").value;
    const button = document.querySelector("#personalApplyButton");
    button.setAttribute("href", "javascript:clickBusinessType(2)");
    /*if(memberType !== 'SELLER') {
        button.setAttribute("href", "javascript:clickBusinessType(2)");
    } else {
        button.setAttribute("href", "javascript:void(alert('개인은 현재 가입이 불가능합니다'))");
    }*/

    /**
     * 사업자/개인 세팅
     */
    if($("#businessType").val() === "COMPANY") {
        clickBusinessType(1);
    } else {
        clickBusinessType(2);
    }

    /**
     * 이메일 주소 선택 이벤트
     */
    $("#emailAddress").change(function () {
        if($(this).val() === "write") {
            $("#emailWrite").show();
        } else {
            $("#emailWrite").hide();
        }
    });

    // 계좌정보 은행 선택 이벤트
    $("button[bankSelectBtn]").click(function (e) {
        var el = e.target;

        while(el.type !== 'button')
            el = el.parentNode;

        $("#bankBtn").text(el.getAttribute('bankName'));
        $("#bankName").val(el.value);
        $("#bankList").hide();

    });

    //서비스 구분 "직접입력" 선택 시, 입력란 출력
    $("#serviceType").change(function (e) {
         $("#inputServiceDiv").css("display", e.target.value === "직접입력" ? "block" : "none");
    });

});

/**
 * 사업자/개인 선택
 * @param type (1 : 사업자, 2 : 개인)
 */
var clickBusinessType = function (type) {
    if(type === 1) {
        $("tr[id='companyInput']").show();
        $("tr[id='personalInput']").hide();
        $("#businessType").val("COMPANY");
        $("#companyType").addClass("active");
        $("#personalType").removeClass("active");
    } else if(type === 2) {
        $("tr[id='personalInput']").show();
        $("tr[id='companyInput']").hide();
        $("#businessType").val("PERSONAL");
        $("#companyType").removeClass("active");
        $("#personalType").addClass("active");
    }
};

/**
 * 주소검색
 */
var searchAddr = function() {
    new daum.Postcode({
        oncomplete: function (data) {
            console.log(data);
            $("#addressText").val(data.roadAddress);
            $("#zipCode").val(data.zonecode);
            $("#roadAddr").val(data.roadAddress);
            $("#jibunAddr").val(data.jibunAddress);
        }
    }).open({left: 200, top: 200});
};

/**
 * 필수값 체크
 * @returns {boolean}
 */
var basicInfoFormCheck = function () {

    //사업자
    if($("#businessType").val() === "COMPANY") {
        if($("#companyName").val() === "") {
            alert("상호명(법인명)을 입력해주세요.");
            $("#companyName").focus();
            return false;
        }

        if($("#classType").val() === "") {
            alert("사업자구분을 선택해주세요.");
            return false;
        }

        if($("#companyNo").val() === "") {
            alert("사업자등록번호를 입력해주세요.");
            $("#companyNo").focus();
            return false;
        } else if($("#companyNo").val() != undefined && $("#companyNo").val().length !== 10) {
            alert("사업자번호를 10자로 입력해주세요.");
            $("#companyNo").focus();
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

    var serviceType = $("#serviceType").val();
    if(serviceType === "") {
        alert("서비스구분을 선택해주세요.");
        return false;
    
    } else if(serviceType === "직접입력" && $("#inputServiceType").val() === "") {
        alert("서비스구분을 입력해주세요.");
        return false;
    }

    if($("#mobile").val() === "") {
        alert("휴대폰번호를 입력해주세요.");
        $("#mobile").focus();
        return false;

    } else if(!validate.isMobile($("#mobile").val())) {
        alert("휴대폰번호를 올바르게 입력해주세요.");
        $("#mobile").focus();
        return false;
    }

    return true;
};

function checkCompanyNo () {

    var companyNo = $("#companyNo").val();

    if (companyNo.length != 10) {
        alert("사업자 번호를 - 제외 하고 입력해주세요");
        $("#companyNo").focus();
        return;
    }

    $("#checkPopup").load("/rs/seller/popup/checkCompany?companyNo="+$("#companyNo").val(), function () {
        fnShowPop("checkPopup");
    });
}

function checkCompanyScale () {

    var companyNo = $("#companyNo").val();

    if (companyNo.length != 10) {
        alert("사업자 번호를 - 제외 하고 입력해주세요");
        $("#companyNo").focus();
        return;
    }

    $("#checkPopup").load("/rs/seller/popup/checkScale?companyNo="+$("#companyNo").val(), function () {
        fnShowPop("checkPopup");
    });
}