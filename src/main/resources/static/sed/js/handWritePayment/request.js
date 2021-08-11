"use strict";


var moveType = false;

$(document).ready(function () {
    numberOnlyOn();

    $("input[type=number]").on("keyup", function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });

    $("[name='classType']").change(function () {

        var placeholder = "생년월일 6자리를 입력해주세요.";
        var maxlength = 6;

        if ($(this).val() === "CORPORATE") {
            placeholder = "사업자번호 10자리를 입력해주세요";
            maxlength = 10;
        }

        $("#buyerAuthNum").prop("placeholder", placeholder);
        $("#buyerAuthNum").prop("maxlength", maxlength);
        $("#buyerAuthNum").val("");
    });

    $("input[maxlength]").bind("keyup input", function (e) {
        var f = $(this).get(0);

        if (f.value.length >= f.maxLength) {
            var nextID = $(this).attr("nextID");
            if (nextID)
                $("#" + nextID).focus();
        }

        if (f.value.length > f.maxLength)
            f.value = f.value.slice(0, f.maxLength)
    });

    $("#goodsPrice").on("keyup", function () {
        $("#cardQuota").empty();
        if($(this).val()){
            if(parseInt(replaceAll($(this).val(), ",", "")) >= 50000){
                $("#cardQuota").append("<option value=''>일시불</option>");
                $("#cardQuota").append("<option value='1'>1</option>");
                $("#cardQuota").append("<option value='2'>2</option>");
                $("#cardQuota").append("<option value='3'>3</option>");
                $("#cardQuota").append("<option value='4'>4</option>");
                $("#cardQuota").append("<option value='5'>5</option>");
                $("#cardQuota").append("<option value='6'>6</option>");
                $("#cardQuota").append("<option value='7'>7</option>");
                $("#cardQuota").append("<option value='8'>8</option>");
                $("#cardQuota").append("<option value='9'>9</option>");
                $("#cardQuota").append("<option value='10'>10</option>");
                $("#cardQuota").append("<option value='11'>11</option>");
                $("#cardQuota").append("<option value='12'>12</option>");
            }else{
                $("#cardQuota").append("<option value=''>일시불</option>");
            }
        }else{
            $("#cardQuota").append("<option value=''>일시불</option>");
        }
    });


});

function makeAuth(pl) {
    var iv = "6aaa0692ada8744ec711940aa1d6ea86";
    var salt = "555f7e094872c827997c38aa66615196";
    var keySize = 128;
    var iterationCount = 10000;
    var passPhrase = "7522115";

    // PBKDF2 키 생성
    var key128Bits100Iterations =
        CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt),
            {keySize: keySize / 32, iterations: iterationCount});

    return CryptoJS.AES.encrypt(
        pl,
        key128Bits100Iterations,
        {iv: CryptoJS.enc.Hex.parse(iv)}).toString();
}

function freePopup(baseUrl) {//무이자할부안내 팝업
    window.open(baseUrl + '/cardInfo', "cst", "width=400,height=690");
}

function requestAct() {

    if($("#goodsName").val().length == 0){
        alert("상품명을 입력해주세요.");
        $("#goodsName").focus();
        return;
    }

    if($("#goodsPrice").val().length == 0){
        alert("가격을 입력해주세요.");
        $("#goodsPrice").focus();
        return;
    }

    var goodPrice = parseInt($("#goodsPrice").val());

    if (goodPrice < 1000) {
        alert("최소 결제 금액은 1,000원 입니다.");
        $("#goodsPrice").focus();
        return;
    }

    var cardError = "카드번호를 입력해주세요";

    for (var i = 1; i <= 3; i++) {
        if ($("#reqForm [name='cardNum" + i + "']").val().length !== 4) {
            alert(cardError);
            $("#reqForm [name='cardNum" + i + "']").focus();
            return;
        }
    }

    if ($("#reqForm [name='cardNum4']").val().length !== 4 && $("#reqForm [name='cardNum4']").val().length !== 3) {
        alert(cardError);
        $("#reqForm [name='cardNum4']").focus();
        return;
    }

    if ($("#reqForm [name='expMM']").val().length !== 2) {
        alert("유효기간 월을 입력해주세요");
        $("#reqForm [name='expMM']").focus();
        return;
    }

    if (parseInt($("#reqForm [name='expMM']").val()) > 12) {
        alert("유효기간 월을 입력해주세요");
        $("#reqForm [name='expMM']").focus();
        return;
    }

    if ($("#reqForm [name='expYY']").val().length !== 2) {
        alert("유효기간 년을 입력해주세요");
        $("#reqForm [name='expYY']").focus();
        return;
    }

    if ($("[name='classType']:checked").val() === "CORPORATE")
    {
        if ($("#reqForm [name='buyerAuthNum']").val().length !== 10) {
            alert("본인 확인 정보 (사업자 번호)를 입력해주세요");
            $("#reqForm [name='buyerAuthNum']").focus();
            return;
        }
    }
    else {
        if ($("#reqForm [name='buyerAuthNum']").val().length !== 6) {
            alert("본인 확인 정보 (생년월일)를 입력해주세요");
            $("#reqForm [name='buyerAuthNum']").focus();
            return;
        }
    }

    if ($("#reqForm [name='cardPwd']").val().length !== 2) {
        alert("카드 비밀번호 앞 2자리를 입력해주세요");
        $("#reqForm [name='cardPwd']").focus();
        return;
    }

    if (goodPrice >= 100000 && $("#mobile").val().length < 10) {
        alert("10만원 이상 결제시 구매자 휴대폰번호가 필수 입니다");
        $("#mobile").focus();
        return;
    }

    var keyin = {};

    var cardNum = "";

    for (var i = 1; i <= 4; i++) {
        cardNum += $("#reqForm [name='cardNum" + i + "']").val();
    }

    keyin["goodName"] = $("#goodsName").val();
    keyin["totalPrice"] = replaceAll($("#goodsPrice").val(), ",", "");
    if($(":input:radio[name=useTax]:checked").val() == 'true'){
        keyin["taxPrice"] = replaceAll($("#goodsPrice").val(), ",", "");
    }else{
        keyin["taxFreePrice"] = replaceAll($("#goodsPrice").val(), ",", "");
    }
    keyin["cardNum"] = makeAuth(cardNum);
    keyin["cardExp"] = makeAuth($("#reqForm [name='expYY']").val() + $("#reqForm [name='expMM']").val());
    keyin["buyerAuthNum"] = makeAuth($("#reqForm [name='buyerAuthNum']").val());
    keyin["cardPwd"] = makeAuth($("#reqForm [name='cardPwd']").val());
    keyin["cardQuota"] = $("#reqForm [name='cardQuota']").val();
    keyin["mobile"] = $("#reqForm [name='mobile']").val();

    setLoaderText("결제 요청중");
    loaderShow();

    $.ajax({
        url: "/se/handWritePayment/requestAct",
        type: "post",
        dataType: "json",
        data: keyin,
        success: function (response) {
            loaderHide();
            $("#divhancMsg").empty();
            var handMsg = "<h4>결제가 ";
            if (response.success === "Y") {
                handMsg += "성공";
                moveType = true;
            }else{
                handMsg += "실패";
                moveType = false;
            }
            handMsg += "했습니다.</h4><p>" + response.message + "</p>";
            $("#divhancMsg").html(handMsg);
            $("#handPayCallPop").modal("show");
        },
        error: function (request, status, error) {
            loaderHide();
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    })

}

function btnHandPayConfirmPop() {
    if(moveType){
        location.href = "/se/payment/complete";
    }else{
        location.reload();
    }
}