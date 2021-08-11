"use strict";

var mobile = "";
var goodsName = "";
var goodsPrice = 0;
var taxType = "";
var goodsInfos = [];

/**
 * 값 유효성 체크
 * @returns {boolean}
 */
function valicationCheck() {
    mobile = $("#mobile").val();

    if (mobile === "") {
        alert("휴대폰번호를 입력해주세요.");
        $("#mobile").focus();
        return false;
    } else if(!validate.isMobile(mobile)) {
        alert("휴대폰번호를 올바르게 입력해주세요.");
        $("#mobile").focus();
        return false;
    }

    goodsName = $("#goodsName").val();

    if (goodsName === "") {
        alert("상품명을 입력해주세요.");
        $("#goodsName").focus();
        return false;
    }

    goodsPrice = replaceAll($("#goodsPrice").val(), ",", "");

    if (goodsPrice === "") {
        alert("결제요청 금액 입력해주세요.");
        $("#goodsPrice").focus();
        return false;

    } else if(goodsPrice < 1000 || goodsPrice > 99999999) {
        alert("결제요청 금액을 1,000 ~ 99,999,999원 사이로 입력해 주세요.");
        $("#goodsPrice").focus();
        return false;
    }

    if ($("input:radio[name='taxType']").length > 0)
        taxType = $("input:radio[name='taxType']:checked").val();
    else
        taxType = $("input[name='taxType']").val();

    return true;
}

/**
 * submit
 */
function submit() {
    if(!valicationCheck()) {
        return;
    }

    requestAjax("/se/onePayment", "post" , JSON.stringify(makeRequestData()), function (res) {
        alert(res.message);
        location.reload();
    }, null, null, "application/json; charset=utf-8");
}

/**
 * 요청 파라미터
 * @returns {{mobile: string, goodsName: string, goodsPrice: number, taxType: string}}
 */
function makeRequestData() {
    var param = {
        mobile : mobile,
        goodsName : goodsName,
        goodsPrice : goodsPrice,
        goodsDescription : $("#goodsDescription").val(),
        goodsUrl : $("#goodsUrl").val(),
        taxType : taxType,
        sellerMemo: $("#sellerMemo").val(),
        customName: $("#customName").val(),
        customNo: $("#customNo").val()
    };

    if(taxType === 'TAX' && $("[name=serviceChargeUse]:checked").val() === 'true') {
        param.serviceCharge = {
            useYn: true
        };

        var percent = $("#serviceChargePercent").val();
        if(percent !== '직접입력')
            param.serviceCharge.percent = percent;
        else
            param.serviceCharge.price = $("#serviceChargePrice").val();
    }

    if(goodsInfos.length > 1 || goodsInfos.length === 1 && goodsInfos[0].cnt > 1) {
        param.goodsInfos = goodsInfos;
    }

    return param;
}

/**
 * 상품 불러오기 팝업 오픈
 * @param memberID
 */
var openGoodsPop = function (param) {
    var url = "/se/onePayment/goodsPop";
    if(param !== undefined)
        url += param;

    $("#goodsPop").load(url, function () {
        $("#goodsPop > .modal-backdrop").addClass("in");
        $("#goodsBrower").show();
    });
};

/**
 * 상품 불러오기 검색 및 페이지 이동
 * @param page
 */
var goodsSearch = function (page) {
    var param = "?&goodsNameLike=" + $("#searchGoodsName").val();
    openGoodsPop(param);
};

/**
 * 상품 불러오기 팝업 닫기
 */
var closeGoodsPop = function () {
    $('#goodsPop').empty();
};



$(document).ready(function () {
    numberOnlyOn();

    // 봉사료 퍼센트 직접입력 선택 시, 입력란 활성화
    $("#serviceChargePercent").change(function (e) {
        if(e.target.value === '직접입력') {
            $("#serviceChargePriceArea").show();
        } else {
            $("#serviceChargePriceArea").hide();
            $("#serviceChargePrice").val('');
        }
    });

    //봉사료 설정란 보임 여부
    $("[name='serviceChargeUse']").change (function (e) {
        $("#serviceChargeSettingArea").css('display', e.target.value === 'true' ? 'block' : 'none');
    });

    //과세,면세 선택에 따라 봉사료 출력 여부 적용
    $("[name='taxType']").change (function (e) {
        serviceChargeAreaPrint(e.target.value);
    });

    //상품 설명 글자수
    $("#goodsDescription").keyup(function (e) {
        strLengthDisplay(e.target.value.length, "goodsDescriptionCount", 500);
    });

});

//봉사료 영역 출력 여부 적용
function serviceChargeAreaPrint(taxType) {
    if(taxType === 'TAX')
        $("#serviceChargeArea").show();
    else
        $("#serviceChargeArea").hide();
}



