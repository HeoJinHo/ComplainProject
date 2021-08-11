"use strict";

function deleteGoods() {
    requestAjax("/se/goods/delete", "post", {deleteID : $("#deleteID").val()}, function (res) {
        alert("삭제 되었습니다.");
        location.reload();
    });
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

function getCheckItem() {
    var idArr = [];

    $("input[name='itemChk']:checked").each(function() {
        idArr.push($(this).val());
    });

    $("#deleteID").val(idArr);
}

function saveExcel ()
{
    location.href = "/se/goods/excel?" + $('#searchForm').serialize ();
}