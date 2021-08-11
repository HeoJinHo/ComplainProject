"use strict";

$(document).ready(function () {
    checkMoreFilter();
});

/**
 * 취소
 */
function cashstCancel() {
    var cancelID = $("#cancelID").val();

    requestAjax("/se/cashst/cancel", "post", {cancelID : cancelID}, function (res) {
        alert("취소 되었습니다.");
        location.reload();
    });
}

/**
 * 취소 팝업
 */
function cancelPop() {
    getCheckItem();
    if($("#cancelID").val() === "") {
        alert("항목을 선택해주세요.");
        return;
    }

    $("#payReceCanc").modal();
}

/**
 * 체크박스 체크 ID
 */
function getCheckItem() {
    var idArr = [];

    $("input[name='itemChk']:checked").each(function() {
        idArr.push($(this).val());
    });

    $("#cancelID").val(idArr);
}

function saveExcel ()
{
    location.href = "/se/cashst/excel?" + $('#searchForm').serialize ();
}

