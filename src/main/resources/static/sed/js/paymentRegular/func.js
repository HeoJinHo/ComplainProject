function openRegularFunc (layer, id)
{
    $("#regularCommonLayer").load("/se/regularPayment/layer/"+layer+"?id="+id, function () {
        $("#regularCommonLayer").modal("show");
    });
}

function openChangePrice (id)
{
    $("#regularCommonLayer").load("/se/regularPayment/layer/modifyPrice?contID="+id, function () {
        $("#regularCommonLayer").modal("show");
    });
}


//요청 취소
function requestCancelPaymentAct() {
    var targetID = $("#popFormID #popTargetID").val();

    requestAjax("/se/regularPayment/requestCancelAct", "post", {id: targetID}, function (res) {
        if (res.success) {
            alert(res.message);
        }
        location.reload();
    });
}

//해지
function releaseAct() {
    var targetID = $("#popFormID #popTargetID").val();

    requestAjax("/se/regularPayment/releaseAct", "post", {id: targetID}, function (res) {
        if (res.success) {
            alert(res.message);
        }
        location.reload();
    });
}

// 일시 정지
function pauseAct() {
    var targetID = $("#popFormID #popTargetID").val();

    requestAjax("/se/regularPayment/pauseAct", "post", {id: targetID}, function (res) {
        if (res.success) {
            alert(res.message);
        }
        location.reload();
    });
}

function unpauseAct() {
    var targetID = $("#popFormID #popTargetID").val();

    requestAjax("/se/regularPayment/unpauseAct", "post", {id: targetID}, function (res) {
        if (res.success) {
            alert(res.message);
        }
        location.reload();
    });
}

//재신청
function requestResendAct() {
    var targetID = $("#popFormID #popTargetID").val();

    requestAjax("/se/regularPayment/resendAct", "post", {id: targetID}, function (res) {
        alert(res.message);
        location.reload();
    });
}