"use strict";

$(document).ready(function () {

});

/**
 * 알림타입 탭 클릭
 * @param type
 */
function searchEventType(type) {
    $("#wideEventType").val(type);
    onPage();
}

function alarmAction(action) {

    var idArr = getCheckItem();

    if(idArr.length === 0) {
        alert("항목을 선택해주세요.");
        return;
    }

    requestAjax("/se/setting/alarm/"+action, "post", {idArr : idArr}, function (res) {
        if(action === "delete")
            alert(res.message);
        location.reload();
    });
}

function getCheckItem() {
    var idArr = [];

    $("input[name='itemChk']:checked").each(function() {
        idArr.push($(this).val());
    });

    return idArr;
}
