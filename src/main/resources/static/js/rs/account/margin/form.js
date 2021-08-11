"use strict";

function submit() {
    var ok = true;

    $("#editForm input").each(function () {

        if ($(this).val() == "")
        {
            alert ($(this).attr("data-title") + "을 입력해주세요.");
            $(this).focus();
            ok = false;
            return;
        }
    });

    if (!ok)
        return;

    requestAjax("/rs/member/updateMyMargin", "put", $("#editForm").serialize(), function (res) {
        alert(res.message);
        location.reload();
    });
}
