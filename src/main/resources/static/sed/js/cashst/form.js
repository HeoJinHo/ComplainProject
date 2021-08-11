"use strict";

$(document).ready(function () {
    
    // 발행용도 변경 시, 휴대폰번호 <-> 사업자등록번호 전환
    $("input[name='trCode']").click(function (event) {
        $("#idInfo").val("");
        if(event.target.value === "0") {
            $("#idInfoTitle").text("휴대폰번호");
            $("#idInfo").prop("placeholder", "- 없이 입력해 주세요.");
        } else {
            $("#idInfoTitle").text("사업자등록번호");
            $("#idInfo").prop("placeholder", "사업자등록번호를 입력해 주세요.");
        }
    });

    //상품금액 입력 시, 공급가액/부가세 계산
    $("#totalPrice").keyup(function (event) {
        calTaxAndSupplyPrice(event.target.value);
    });

    //
    $("input[name=corpTaxType]").change(function (event) {
        calTaxAndSupplyPrice($("#totalPrice").val());
    });
});

//공급가액, 부가세 계산
function calTaxAndSupplyPrice(totalPrice) {
    totalPrice = totalPrice | 0;

    //과세일 때
    if( $("input[name=corpTaxType]:checked").val() === 'TG01') {
        var supply = Math.ceil(totalPrice / 1.1);
        $("#tax").text(totalPrice - supply);
        $("#supply").text(supply);

    //면세일 때
    } else {
        $("#supply").text(totalPrice);
        $("#tax").text(0);
    }
}

function valicationCheck() {

    if ($("#goodName").val() === "") {
        alert("상품명을 입력해주세요.");
        $("#goodName").focus();
        return false;
    }

    if($("#idInfo").val() === "") {
        var trCodeText = $("input[name='trCode']:checked").val() === "1" ? "사업자등록번호" : "휴대폰번호";
        alert(trCodeText+"를 입력해주세요.");
        $("#idInfo").focus();
        return false;
    }

    if ($("#totalPrice").val() === "") {
        alert("상품금액을 입력해주세요.");
        $("#totalPrice").focus();
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
        location.href = "/se/cashst/list";
    });
}