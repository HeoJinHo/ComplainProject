"use strict";

var week = ["월", "화", "수", "목", "금", "토", "일"];
var weekData = ["2", "3", "4", "5", "6", "7", "1"];

$(document).ready(function () {

    setDatepicker("dateInfoDate", "startDate", "endDate");

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

    //검색창 여닫기
    //checkMoreFilter();

    //카운터 클릭
    $("#allState, #completeState, #requestState, #rejectState, #releaseState, #cancelState, #pauseState").on("click", function () {
        $("#allState, #completeState, #requestState, #rejectState, #releaseState, #cancelState, #pauseState").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");
        switch ($(this).attr("id")) {
            case "allState" :
                $("#stateTypeStr").val("ALL");
                break;
            case "completeState" :
                $("#stateTypeStr").val("COMPLETE");
                break;
            case "requestState" :
                $("#stateTypeStr").val("REQUEST");
                break;
            case "rejectState" :
                $("#stateTypeStr").val("REJECT");
                break;
            case "pauseState" :
                $("#stateTypeStr").val("PAUSE");
                break;
            case "releaseState" :
                $("#stateTypeStr").val("RELEASE");
                break;
            case "cancelState" :
                $("#stateTypeStr").val("CANCEL");
                break;
        }
        $("#searchForm").submit();
    });
    //전체 체크박스 체크 & 해제
    $("#allListchk").on("click", function () {
        if ($(this).is(":checked")) {
            $("input[name='chk']").prop("checked", true);
        } else {
            $("input[name='chk']").prop("checked", false);
        }
    });
});

//엑셀 다운로드
function saveExcel() {
    var stateType = "";
    if($("#stateTypeStr").val() != "ALL"){
        stateType = "&stateType=" + $("#stateTypeStr").val();
    }
    location.href = "/se/manualPayment/manualRequestList/excel?" + $('#searchForm').serialize() + stateType;
}

//결제요청 팝업 호출
function manualRequestPop(requestID) {
    $('#requestByManualPay').load("/se/manualPayment/dialog/manualRequestPop/" + requestID, function () {
        $('#requestByManualPay').modal("show");
    });
}



//일괄요청 팝업 호출
function multiManualRequestPop(){
    var chkLength = $("input[name='chk']:checked").length;
    if(chkLength > 0){
        var cnt = 0;
        $("input[name='chk']:checked").each(function () {
            if($(this).val()){
                $("#ulCustomer").append("<li><span>" + $(this).data("text") + "</span></li>");
                cnt ++;
            }
        });
        $("#divTitlaCustomerCnt").text("총 " + cnt +"명 선택");
        $("#requestByManyManualPay").modal("show");
    }else{
        alert("요청 항목을 선택해주세요.");
    }

}
