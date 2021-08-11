function eventMove(id, eventType, val1, val2) {
    if (eventType.indexOf("OFFLINE_PAY_COMPLETE") >= 0 ||
        eventType.indexOf("OFFLINE_PAY_CANCEL") >= 0 ||
        eventType.indexOf("REMOTE_PAY_COMPLETE") >= 0 ||
        eventType.indexOf("REMOTE_PAY_CANCEL") >= 0
        )
    {
        requestAjax("/se/setting/alarm/confirm", "post", {idArr : [id]}, function () {});
        location.href = "/se/payment/view/" + val2;
    } else {
        requestAjax("/se/setting/alarm/confirm", "post", {idArr : [id]}, function () {
            location.reload();
        });
    }
}
