function openCancelRemoteRequest(id)
{
    openAlert("결제 요청을 취소하시겠습니까", "executeCancelRemoteRequest", id);
}

function executeCancelRemoteRequest (id)
{
    $('#commonDialog').modal("hide");

    callRestful("/se/payment/request/" + id + "/cancel", "POST", {});
}

