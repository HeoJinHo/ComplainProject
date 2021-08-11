function retryErrorData (contID)
{
    $('#failpayConfirm').modal('hide');

    loaderShow();

    $.ajax ({
        type: "post",
        url: "/se/manualPayment/multiDoReqResult/" + contID + "/retry",
        dataType: 'json',
        success: function (data, textStatus) {
            if (data.success === "Y")
            {
                location.href = "/se/manualPayment/multiDoReqResult/" + data.addonData1;
            }
            else
            {
                alert (data.message);
                loaderHide();
            }

        }
    });
}
