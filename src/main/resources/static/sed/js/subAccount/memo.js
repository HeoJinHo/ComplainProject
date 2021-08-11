/**
 * 메모 팝업
 * @param memberID
 */
function openMemo(memberID)
{
    $('#commonDialog').load("/se/subAccount/memo?memberID=" + memberID, function () {
        $('#commonDialog').modal("show");
    });
}

/**
 * 메모 저장
 * @param id
 */
function updateMemo ()
{
    requestAjaxForm("memoForm", function (res) {
        $('#commonDialog').modal("hide");
    });
}
