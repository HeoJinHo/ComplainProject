"use strict";

function sendSmsPop(id, sellerName, url) {
    $("#smsContentSeller").text(sellerName);
    $("#smsContentLink").attr("href", url);
    $("#smsContentLink").text(url);
    $("#sendSmsLinkID").val(id);

    $("#smsBrower").modal("show");
}

/**
 * 단일 삭제
 * @param id
 */
function oneDeletePop(id) {
    $("#deleteIDs").val(id);
    $("#oneDeletePop").modal("show");
}

/**
 * 선택삭제
 */
function multiDeletePop() {
    var value = getChecksValue("itemChk", ",");
    if(value === "") {
        alert("선택된 링크가 없습니다.");
        return;
    }

    $("#deleteIDs").val(value);
    $("#selectDeleteCount").text(value.split(",").length);
    $("#multiDeletePop").modal("show");
}

/**
 * 삭제 팝업
 */
function deletelPop() {
    getCheckItem();
    if($("#deleteID").val() === "") {
        alert("항목을 선택해주세요.");
        return;
    }

    $("#deleteGoods").modal();
}

function saveExcel ()
{
    location.href = "/se/goods/excel?" + $('#searchForm').serialize ();
}

function blockPayPopup () {
    $('#blockPay').modal({backdrop : 'static', keyboard : false})
}