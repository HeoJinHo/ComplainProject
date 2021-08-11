"use strict";

var week = ["월", "화", "수", "목", "금", "토", "일"];
var weekData = ["2", "3", "4", "5", "6", "7", "1"];

$(document).ready(function () {

    numberOnlyOn();

    setDatepicker("startLimitDate");

    //글자수 제한
    $("#reason").keyup(function (e) {
        textCount(e, 'reasonCount', 500);
    });

    //예상 결제일 선택
    $("#expectDateType").on("change", function () {
        $("#expectDateVal").empty();
        $("#divExpectDay").show();
        if ($(this).val() == "MONTH") {
            for (var i = 1; i < 32; i++) {
                $("#expectDateVal").append("<option value='" + i + "'>" + i + "일</option>");
            }
        } else {
            for (var w = 0; w < week.length; w++) {
                $("#expectDateVal").append("<option value='" + weekData[w] + "'>" + week[w] + "요일</option>");
            }
        }
    });

    //숫자만 입력
    $("input[type=number]").on("keyup", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });
    
    //예상결제금액
    $("#useExprPrice").on("click", function () {
        if ($(this).is(":checked")) {
            $("#divUseExpectPrice").show();
            $("#pUseExpectPrice").show();
            $("#expectPrice").focus();
        }else{
            $("#divUseExpectPrice").hide();
            $("#pUseExpectPrice").hide();
        }
    });

    //결제만료일
    $("#useLimitDate").on("click", function () {
        if ($(this).is(":checked")) {
            $("#divUseLimitDate").show();
        }else{
            $("#divUseLimitDate").hide();
        }
    });

    //예상결제일
    $("#useExpectDate").on("click", function () {
        if ($(this).is(":checked")) {
            $("#divUseExpectDate").show();
        }else{
            $("#divUseExpectDate").hide();
        }
    });

    //구매자 확인여부
    $("#confirmSelectAuthType").on("change", function () {
        $("#selectAuthType").val($(this).val());
    });
    
    //바로결제 사용여부
    $("#directSelectAuthType").on("click", function () {
        if ($(this).is(":checked")) {
            $("#selectAuthType").val($(this).val());
        }else{
            $("#selectAuthType").val("SELECT");
        }
    });
    


});


/**
 * 글자수 체크
 * @param event
 * @param id
 * @param limitCount
 */
function textCount(event, textID, limitCount) {
    var textLength = event.target.value.length;

    if (limitCount !== undefined && textLength > limitCount) {
        textLength = limitCount;
    }

    $("#" + textID).text(textLength);

}

/**
 * 등록
 */
function submit() {

    if (!valicationCheck()) {
        return;
    }

    if ($("#startLimitDate").val()) {
        $("#manualForm").append("<input type='hidden' id='limitDate' name='limitDate'>")
        $("#limitDate").val(toDate($("#startLimitDate").val()));
    } else {
        $("#limitDate").remove();
    }

    $("#expectPrice").val(replaceAll($("#expectPrice").val(), ",", ""));
    $("#maxPaymentPrice").val(replaceAll($("#maxPaymentPrice").val(), ",", ""));

    requestAjaxForm("manualForm", function (res) {
        alert(res.message);
        if (res.success == "Y") {
            location.href = "/se/manualPayment/manualRequestList?stateTypeStr=REQUEST";
        }
    });
}

/**
 * 값 유효성 체크
 * @returns {boolean}
 */
function valicationCheck() {
    var result = true;

    $("#manualForm").find("input, select, textarea").each(function () {
        if ($(this).prop("required")) {
            if (!$(this).val().trim($(this).val())) {
                result = false;
                alert($("label[for='" + $(this).attr("id") + "']").text() + "을 입력해주세요.");
                $(this).focus();
                return false;
            }
        }
        if ($(this).attr("type") == "tel") {
            if ($(this).val() && !validate.isMobile($(this).val())) {
                result = false;
                alert("휴대전화번호를 올바르게 입력해주세요.");
                $(this).focus();
                return false;
            }
        } else if ($(this).attr("type") == "email") {
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
                alert("최소금액은 " + numberCommas($(this).data("count")) + "원 이상부터 가능합니다.");
                $(this).focus();
                return false;
            }
        }


    });

    return result;
}

/**
 * 숫자 콤마 찍기
 */
function numberCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * String to Date
 */
function toDate(dateStr) {
    var parts = dateStr.split("-")
    return new Date(parts[0], parts[1] - 1, parts[2])
}