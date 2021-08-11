var week = ["월", "화", "수", "목", "금", "토", "일"];
var weekData = ["2", "3", "4", "5", "6", "7", "1"];

$(document).ready(function () {
    numberOnlyOn();

    $("#downloadWork").click (function () {
        $("#searchForm").submit();
    });

    $("#executeManyPayment").click (function () {

        var checkError = false;

        var requestData = [];

        $("#manyRequestTbl tbody tr").each (function () {
            if (checkError)
                return;

            if ($(this).find("input[name='goodsName']").val() == "")
            {
                alert ("상품명을 입력해주세요");
                $(this).find("input[name='goodsName']").focus();
                checkError = true;
                return;
            }

            if ($(this).find("input[name='goodsPrice']").val() == "")
            {
                alert ("결제 금액을 입력해주세요");
                $(this).find("input[name='goodsPrice']").focus();
                checkError = true;
                return;
            }

            if ($(this).find("input[name='reqReason']").val() == "")
            {
                alert ("요청사유를 입력해주세요");
                $(this).find("input[name='reqReason']").focus();
                checkError = true;
                return;
            }

            var price = $(this).find("input[name='goodsPrice']").val();

            price = replaceAll(price, ",", "");

            requestData.push({mpToken: $(this).data("mpToken"), goodName:$(this).find("input[name='goodsName']").val()
                , price:parseInt(price), content:$(this).find("input[name='reqReason']").val()})
        });

        if (checkError)
            return;

        loaderShow();

        $.ajax ({
            type: "post",
            url: "/se/manualPayment/multiDoRequestAct",
            contentType: "application/json",
            data: JSON.stringify(requestData),
            dataType: 'json',
            success: function (data, textStatus) {
                if (data.success === "Y")
                {
                    location.href = "/se/manualPayment/multiDoReqResult/" + data.addonData1;
                }
                else
                {
                    loaderHide();
                    alert (data.message);
                }

            }
        });
    });

    $("#allListchk").click(function () {
        $("#manyRequestTbl tbody tr input[name='reqPayChk']").prop("checked", $(this).prop("checked"));
    });

    $("#deleteManyPayment").click(function () {
        var $checkList = $("#manyRequestTbl tbody tr input[name='reqPayChk']:checked");

        var $parentTr = $checkList.closest ("tr");

        $parentTr.each((function () {
            $(this).remove();
        }));

        $("#totalCnt").html ($("#manyRequestTbl tbody tr").length.toString());

    });

    //예상 결제일 선택
    $("#expectDateType").on("change", function () {
        $("#expectDateVal").empty();
        $("#divExpectDay").show();
        if ($(this).val() == "MONTH") {
            for (var i = 1; i < 32; i++) {
                $("#expectDateVal").append("<option value='" + i + "'>" + i + "일</option>");
            }
        } else if ($(this).val() == "WEEK") {
            for (var w = 0; w < week.length; w++) {
                $("#expectDateVal").append("<option value='" + weekData[w] + "'>" + week[w] + "요일</option>");
            }
        } else {
            $("#divExpectDay").hide();
        }
    });
});

function changeReqType(val)
{
    if (val === "DOWNLOAD")
    {
        $("#searchForm").prop('action', "/se/manualPayment/cont/excel");
        $("#uploadForm").show();
        $("#mainSearchBtn").hide();
        $("#manualPaymentForm").hide();
        $("#tabMenuSearch").removeClass("active");
        $("#tabMenuDownload").addClass("active");
    }
    else{
        $("#searchForm").prop('action', "");
        $("#uploadForm").hide();
        $("#mainSearchBtn").show();
        $("#manualPaymentForm").show();
        $("#tabMenuSearch").addClass("active");
        $("#tabMenuDownload").removeClass("active");
    }
}

function paymentRequestExcelUpload() {
    var fileName = $("#file").val();
    if(fileName === "") {
        alert("파일을 업로드해주세요.");
        return;
    } else if(!fileName.includes(".xlsx") && !fileName.includes(".xls") && !fileName.includes(".csv")) {
        alert("엑셀파일이나 csv파일만 가능합니다.");
        return;
    }

    loaderShow();

    requestAjaxForm("uploadForm", function (data) {
        alert(data.message);
        location.href = "/se/manualPayment/multiDoReqResult/" + data.addonData1;
    }, function (data) {

        console.log(data);
        loaderHide();
        alert(data.message);
    });
}