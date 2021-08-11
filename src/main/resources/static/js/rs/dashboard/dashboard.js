"use strict";

var addMonth = 0;
var selectDate = "";
var prevDate = "";
var loginMemberType = "";

$(document).ready(function () {
    loginMemberType = $("#loginMemberType").val();
    setDate(0);
});

/**
 * 월 변경 및 데이터 세팅
 * @param m
 */
var setDate = function (m) {

    addMonth += m;
    selectDate = getDateFormat(addMonth, "month", "YYYY-MM-DD");
    prevDate = getDateFormat(addMonth-1, "month", "YYYY-MM-DD");
    $("#date").text(getDateFormat(addMonth, "month", "YYYY년 MM월"));

    getData();

    setNextDateBtn();
};

function setNextDateBtn() {
    var today = moment().format("YYYY-MM-DD");
    if(selectDate === today) {
        $("#nextDateBtn").prop("href", "javascript:void(0)");
    } else {
        $("#nextDateBtn").prop("href", "javascript:setDate(1)");
    }
}

var getData = function () {

    //판매점 당월 가입수
    getLowMemberCount("SELLER");

    // TOP5 판매점 매출현황
    sellerSumPriceTop5Chart();

    /**
     * 로그인 한 회원이 리셀러 가 아닐 때(대리점, 총판)
     * 리셀러 관련 데이터 조회
     */
    if(loginMemberType !== "RESELLER") {
        if(loginMemberType === "MASTER") {
            //대리점 당월 가입수
            getLowMemberCount("AGENT");
        }

        //리셀러 당월 가입수
        getLowMemberCount("RESELLER");

        // TOP5 영업지점 하부 판매점 매출 합계
        lowMemberSumPriceTop5Chart();

        // TOP 5 리셀러 하부 판매점 수
        getSellerCntTop5();

        // TOP5 리셀러 영업현황 (전월 대비)
        getResellerSalesTop5();

    }
    
    getPaymentInfo("CIDER");
};


/**
 * 증감 텍스트 출력
 * @param element
 * @param value
 */
var setIncreaseText = function (element, value, isPercent) {
    if(value === "NaN")
        element.hide();
    else
        element.show();

    var valueStr = isPercent ? value+"%" : value;

    if(value < 0) {
        element.addClass("danger");
        element.text(valueStr)
    } else {
        element.removeClass("danger");
        element.text("+"+valueStr);
    }
};


/**
 * 하위 리셀러/판매점 가입 수
 * @param memberType
 */
var getLowMemberCount = function (memberType) {
    var param = {
        "memberType" : memberType,
        "selectDate" : selectDate,
        "prevDate" : prevDate
    };

    var successFunc = function(res) {
        var data = res.data;
        var elementId = "#"+memberType.toLowerCase()+"Cnt";

        //이번 달 하위 리셀러/판매점 가입 수
        $(elementId).children("b").text(data.currentMonthCount);

        //전 달 가입 수 증감 비교 표시
        var diffCnt = data.currentMonthCount - data.prevMonthCount;
        setIncreaseText($(elementId).children("span"), diffCnt);

    };

    requestAjax("/rs/dashboard/lowMemberCount", "get", param, successFunc);
};

/**
 * TOP5 판매점 매출현황
 */
var sellerSumPriceTop5Chart = function() {
    var param = { "memberType" : "SELLER" };

    salesTop5ChartTemplate("/rs/dashboard/sellerSumPriceTop5", param, function (labels, datas) {
        setBarChart("barSeller", labels, datas, '#ffc107', 'rgba(255,193,7,0.2)', '#ffe211', '#ffc107');
    })
};

/**
 * TOP5 각 하부 회원 별 소속 판매점들의 매출합계 현황
 */
var lowMemberSumPriceTop5Chart = function() {

    salesTop5ChartTemplate("/rs/dashboard/lowMemerSumPriceTop5", {}, function (labels, datas) {
        setBarChart("barReseller", labels, datas, '#3398DB', 'rgba(99,194,222,0.2)', '#9CE3F1', '#63C2DE');
    })
};

/**
 * Top5 매출현황 차트
 * @param memberType
 */
var salesTop5ChartTemplate = function (url, param, makeChartFunc) {
    param["state"] = "COMPLETE";
    param["selectDate"] = selectDate;

    var successFunc = function(res) {
        var labels = [];
        var datas = [];

        res.data.forEach(function (item, index) {
            labels.push(item.id);
            datas.push(item.price);
        });

        makeChartFunc(labels, datas);
    };

    requestAjax(url, "get", param, successFunc);
};

/**
 * 결제 건수/금액/수수료 합계
 * @param payOriginType 결제출처
 */
var getPaymentInfo = function (payOriginType) {
    var param = {
        "selectDate" : selectDate,
        "prevDate" : prevDate,
        "payOriginType" : payOriginType
    };

    var successFunc = function(res) {
        var currentMonthData = res.data.currentMonthData;
        var diffCount = res.data.diffCount;
        var pricePercent = res.data.pricePercent;
        var feePercent = res.data.feePercent;

        var elementId = "#cider";

        //결제 건 수 / 증감 출력
        $(elementId+"Cnt").children("b").text(currentMonthData.dataCnt.toLocaleString());
        setIncreaseText($(elementId + "Cnt").children("div"), diffCount, false);

        //결제 금액 합계 / 증감 출력
        $(elementId+"Price").children("b").text("￦"+currentMonthData.totalPrice.toLocaleString());
        setIncreaseText($(elementId + "Price").children("div"), pricePercent, true);

        //결제 수수료 합계 / 증감 출력
        $(elementId+"Fee").children("b").text("￦"+currentMonthData.totalFee.toLocaleString());
        setIncreaseText($(elementId + "Fee").children("div"), feePercent, true);
    };

    requestAjax("/rs/dashboard/paymentInfo", "get", param, successFunc);
};

/**
 * TOP 5 리셀러 하부 판매점 수
 */
var getSellerCntTop5 = function () {
    var successFunc = function(res) {
        $("#sellerCntTop5").html(getTop5ListUI(res.data, "id", "dataCnt"));
    };

    requestAjax("/rs/dashboard/sellerCntTop5", "get", null, successFunc);
};

/**
 * TOP 5 리셀러 영업현황
 */
var getResellerSalesTop5 = function () {
    var successFunc = function(res) {
        $("#resellerSalesTop5").html(getTop5ListUI(res.data, "resellerMemberName", "increaseCnt"));
    };

    requestAjax("/rs/dashboard/resellerSalesTop5", "get", {dateStr : selectDate.substring(0, 7)}, successFunc);
};

/**
 * TOP 5 리셀러 하부 판매점 / 영업 현황 UI 세팅
 * @param arrData
 * @param nameProperty
 * @param valueProperty
 * @returns {string}
 */
var getTop5ListUI = function (arrData, nameProperty, valueProperty) {
    var appendElements = "";
    var name = "";
    var value = "";
    var data = null;

    // TOP5 UI 만들기
    for(var i = 0; i < 5; i++) {
        data = arrData[i];
        if(data == null) {
            name = "";
            value = "";
        } else {
            name = data[nameProperty];
            value = data[valueProperty];
        }

        appendElements += "<li><span class='num'>"+(i+1)+"</span>"
            + "<p class='name'>"+name+"</p>"
            + "<span class='count'>"+value+"</span></li>";
    }

    return appendElements;

};




