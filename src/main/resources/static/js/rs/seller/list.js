"use strict";

$(document).ready(function () {
    setDatepicker("startDate", "endDate");

});

/**
 * 날짜 세팅
 * @param d
 * @param t
 */
var setDate = function (d, t) {
    setDateRange("startDate", "endDate", d, t);
};

/**
 * 페이지 이동
 * @param page
 */
var onPage = function (page) {
    $("#page").val(page);
    $("#searchForm").submit();
};

/**
 * 결제현황 팝업 오픈
 * @param memberID
 */
var paymentPopup = function (memberID) {
    $("#paymentPopup").load("/rs/seller/popup/payment?memberID="+memberID, function () {
        fnShowPop("paymentPopup");
    });
};

function openPayLimit (memberID) {
    $("#popPayLimit").load("/rs/seller/popup/payLimit?memberID="+memberID, function () {
        fnShowPop("popPayLimit");
    });
}

function openPaymentSetting (memberID) {
    $("#paymentSettingPop").load("/rs/seller/paySetting?memberID="+memberID, function () {
        fnShowPop("paymentSettingPop");
    });
}

function openLinkage (memberID) {
    $("#popPayLimit").load("/rs/seller/popup/linkage?memberID="+memberID, function () {
        fnShowPop("popPayLimit");
    });
}

/**
 * 결제현황 검색 및 페이지 이동
 * @param page
 */
var paymentSearch = function (page) {
    var param = "?page=" + page +
                "&memberID=" + $("#paymentMemberID").val() +
                "&startDate=" + $("#paymentStartDate").val() +
                "&endDate=" + $("#paymentEndDate").val();

    var url = "/rs/seller/popup/payment" + param;
    $("#paymentPopup").load(url);

};

/**
 * 납부/수금 완료, 취소 요청
 * @param sellerID
 * @param isSendOk
 * @param isComplete
 */
var msPriceReq = function (sellerID, isSendOk, isComplete) {
    if(!isComplete) {
        if(confirm("취소처리 하시겠습니까?") === false) {
            return;
        }
    }

    var successFunc = function(res) {
        alert(res.message);
        location.reload();
    };

    var param = "sellerID="+sellerID+"&isSendOk="+isSendOk+"&isComplete="+isComplete;

    requestAjax("/rs/seller/popup/msPrice", "put", param, successFunc, function (msg) {
        alert(msg);
    });
};

/**
 * 필수 서류 제출 팝업
 */
var documentPop = function (memberID, docType) {
    $("#documentPopupDiv").load("/rs/member/documentFile?memberID="+memberID+"&docType="+docType, function () {
        fnShowPop("documentPop");
    });
};

/**
 * 마진 설정 팝업
 */
var marginSettingPop = function (memberID) {
    $("#marginSettingPopupDiv").load("/rs/seller/popup/marginSetting?targetMemberID="+memberID, function () {
        fnShowPop("popSetMarginSeller");
    });
};


/**
 * 보증보험 요청 팝업
 */
var reqSuretyInsMemberID = "";
function reqSuretyInsPop (memberID) {
    fnShowPop("popInsuRequest");
    reqSuretyInsMemberID = memberID;
};

/**
 * 보증보험 필요여부 수정
 */
function reqSuretyIns() {
    requestAjax("/rs/seller/requireSuretyIns/"+reqSuretyInsMemberID+"/Y", "put", null, function (res) {
        alert(res.message);
        location.reload();
    });
}

/**
 * 익일 정산 신청 팝업
 */
function requestNextDayAdjustPop (memberID) {
    $("#requestNextDayAdjustPopDiv").load("/rs/seller/popup/requestNextDayAdjust?targetMemberID="+memberID, function () {
        fnShowPop("popNextCalcApply");
    });
}

/**
 * 부가세 신고자료 조회 팝업
 */
function taxDocPop (memberID) {
    $("#taxDocPopupDiv").load("/rs/seller/popup/taxDoc?memberID="+memberID, function () {
        fnShowPop("popTaxDoc");
    });
}

/**
 * 부가세 신고자료 검색
 */
var searchTaxDoc = function () {
    //부가세 신고자료 팝업에서 입력한 이메일의 입력상태 유지하기 위해
    const inputEmail = document.querySelector("#inputEmail").value;
    const param = $("#taxDocSearchForm").serialize() + "&inputEmail=" + inputEmail;

    $("#taxDocPopupDiv").load("/rs/seller/popup/taxDoc?" + param, function () {
        fnShowPop("popTaxDoc");
    });
};

function submitPayLimitForm ()
{
    if ($("#payLimitForm #useLimit").prop("checked"))
    {
        var types = ["oneTime", "oneDay", "oneMonth", "oneYear"];

        for (var i = 0; i < types.length; i++) {
            var t = types[i];

            if ($("#payLimitForm #" + t).val() && parseInt($("#payLimitForm #" + t).val()) < 1000 && parseInt($("#payLimitForm #" + t).val()) > 0) {
                alert("최소 금액은 1,000원입니다");
                $("#payLimitForm #" + t).focus();
                return false;
            } else if ($("#payLimitForm #" + t).val() == "")
                $("#payLimitForm #" + t).val("0");
        }
    }

    requestAjaxForm2("payLimitForm", function (res) {
        alert(res.message);
        fnHidePop('popPayLimit');
    });

    return false;
}

function submitPaySettingForm ()
{
    requestAjaxForm2("paySettingForm", function (res) {
        alert(res.message);
        fnHidePop('paymentSettingPop');
    });

    return false;
}

function submitLinkageForm ()
{
    requestAjaxForm2("linkageForm", function (res) {
        alert(res.message);
        fnHidePop('popPayLimit');
    });

    return false;
}

/**
 * 정산 수수료 노출 여부 업데이트
 * @param event changeEvent 객체
 * @param memberID 회원아이디
 */
function updateNoShowAdInfos(event, memberID) {
    requestAjax("/rs/seller/noShow/sellerAdInfos", "post", {memberID : memberID, value : !event.target.checked}, function () {});
}

/**
 * 판매점 추가 정보 입력 팝업
 * @param memberID 추가 정보 입력할 회원 ID
 */
function sellerAddInfoPop (memberID) {
    $("#sellerAddInfoPopupDiv").load("/rs/seller/popup/sellerAddInfo?memberID="+memberID, function () {
        fnShowPop("sellerAddInfoPopup");
    });
}