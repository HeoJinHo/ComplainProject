$(document).ready(function () {
    numberOnlyOn();
});

//개별 결제 요청
function reqManualAct(id) {
    if (!valicationCheck('popForm')) {
        return;
    }

    var date = new Date();
    date.setDate(date.getDate() + Number($("#payDeadDate").val()));

    $("#payLimitDate").val(date);
    $("#popForm").attr("action", "/se/manualPayment/requestPaymentAct/" + id);

    $("#price").val(replaceAll($("#price").val(), ",", ""));

    setLoaderText("결제 요청중");
    loaderShow();

    requestAjaxForm("popForm", function (res) {
            alert(res.message);
            location.href = "/se/manualPayment/manualRequestList";
        }, function (res) {
            alert(res.message);
            loaderHide();
        }
    );

}

//여러개 결제 요청
function reqMultieManualAct(){
    if (!valicationCheck('multiPopForm')) {
        return;
    }
    $("#divChk").html("");
    $("input[name='chk']:checked").each(function () {
        if($(this).val()){
            $("#divChk").append("<input type='hidden' name='contIdList' value='"+ $(this).val() +"'>");
        }
    });

    var date = new Date();
    date.setDate(date.getDate() + Number($("#payDeadDate").val()));

    $("#payLimitDate").val(date);
    $("#multiPopForm").attr("action", "/se/manualPayment/multiRequestPaymentAct");

    setLoaderText("결제 요청중");
    loaderShow();

    requestAjaxForm("multiPopForm", function (res) {
            alert(res.message);
            location.href = "/se/manualPayment/manualRequestList";
        }, function (res) {
            alert(res.message);
            loaderHide();
        }
    );
}

//필수값 체크
function valicationCheck(formID) {
    var result = true;

    $("#" + formID).find("input").each(function () {
        if ($(this).prop("required")) {
            if (!$(this).val().trim($(this).val())) {
                result = false;
                alert($("label[for='" + $(this).attr("id") + "']").text() + "을 입력해주세요.");
                $(this).focus();
                return false;
            }
        }
        if ($(this).data("count")) {
            if (parseInt($(this).val()) < parseInt($(this).data("count"))) {
                alert("최소금액은 " + numberCommas($(this).data("count")) + "원 이상부터 가능합니다.");
                $(this).focus();
                return false;
            }
        }
    });

    return result;
}