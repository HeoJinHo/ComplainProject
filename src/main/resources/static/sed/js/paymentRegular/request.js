"use strict";

var week = ["월", "화", "수", "목", "금", "토", "일"];
var weekData = ["1", "2", "3", "4", "5", "6", "7"];
var monthData = ["1","2","3","4","5","6","7","8","9","10","11","12",]

$(document).ready(function () {
    setDatepicker2("limitDateStr");

    //예상 결제일 선택
    $("#periodDateType").on("change", function () {
        $("#periodDateVal").empty();
        $("#periodDateValSub").empty();
        $("#divExpectDay").show();
        if ($(this).val() == "MONTH") {
            for (var i = 1; i < 32; i++) {
                $("#periodDateVal").append("<option value='" + i + "'>" + i + "일</option>");
            }
        } else if ($(this).val() == "WEEK"){
            for (var w = 0; w < week.length; w++) {
                $("#periodDateVal").append("<option value='" + weekData[w] + "'>" + week[w] + "요일</option>");
            }
        } else if ($(this).val() == "YEAR"){
            $("#divExpectDaySub").show();
            $("#limitDateStr").val("");
            for (var h = 0; h < monthData.length; h++) {
                $("#periodDateVal").append("<option value='" + monthData[h] + "'>" + monthData[h] + "월</option>");
            }
            for (var k = 1; k < 32; k++) {
                $("#periodDateValSub").append("<option value='" + k + "'>" + k + "일</option>");
            }
        }
    });

    $("input:radio[name='firstBillingType']").on("change", function () {
        if($(this).val() === 'MUST_FIRST_PAYMENT'){
            $("#trFirstBilling").show();
        }else  if($(this).val() === 'NEXT_SCHEDULE'){
            $("#trFirstBilling").hide();
        }
    })
});

/**
 * submit
 */
function regularSubmit() {
    if(!regularValicationCheck()) {
        return;
    }

    if($("input:radio[name='firstBillingType']:checked").val() === "MUST_FIRST_PAYMENT" && (!$("#firstPrice").val() || parseInt($("#firstPrice").val()) < 1000)){
        alert("최소금액은 1,000원 이상부터 가능합니다.");
        $("#firstPrice").focus();
        return;
    }else if($("input:radio[name='firstBillingType']:checked").val() === "NEXT_SCHEDULE"){
        $("#firstPrice").val(0);
    }

    requestAjaxForm("regularForm", function (res) {
        console.log("res == ", res);
        alert(res.message);
        if(res.success === "Y"){
            location.href = "/se/regularPayment/conts?stateTypeStr=REQUEST";
        }
    })
}

/**
 * 값 유효성 체크
 * @returns {boolean}
 */
function regularValicationCheck() {
    var result = true;

    $("#regularForm").find("input, select, textarea").each(function () {
        if ($(this).prop("required")) {
            if ($(this).val() === null || !$(this).val().trim($(this).val())) {
                result = false;
                alert($("label[for='" + $(this).attr("id") + "']").text() + "을 입력해주세요.");
                $(this).focus();
                return false;
            }
        }
        if ($(this).attr("type") === "tel") {
            if ($(this).val() && !validate.isMobile($(this).val())) {
                result = false;
                alert("휴대전화번호를 올바르게 입력해주세요.");
                $(this).focus();
                return false;
            }
        } else if ($(this).attr("type") === "email") {
            if ($(this).val() && !validate.isEmail($(this).val())) {
                result = false;
                alert("이메일을 올바르게 입력해주세요.");
                $(this).focus();
                return false;
            }
        }
        if ($(this).data("count")) {
            if (parseInt($(this).val()) < parseInt($(this).data("count"))) {
                result = false;
                alert("결제 금액은 " + numberCommas(parseInt($(this).data("count"))) + "원 이상부터 가능합니다.");
                $(this).focus();
                return false;
            }
        }


    });

    return result;
}

function numberCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}