function openCancel(id)
{
    $('#commonDialog').load("/se/payment/dialog/cancel/" + id, function () {
        $('#commonDialog').modal("show");
    });
}

function openPartCancel(id)
{
    $('#commonDialog').load("/se/payment/dialog/partCancel/" + id, function () {
        $('#commonDialog').modal("show");
    });
}


function openCancelRequestCancel(requestID)
{
    $('#commonDialog').load("/se/payment/dialog/cancelRequestCancel/" + requestID, function () {
        $('#commonDialog').modal("show");
    });
}

function openCancelRequest(id)
{
    $('#commonDialog').load("/se/payment/dialog/cancelRequest/" + id, function () {
        $('#commonDialog').modal("show");
    });
}

//부분취소요청 Dialog
function openCancelPartRequest(id)
{
    $('#commonDialog').load("/se/payment/dialog/cancelPartRequest/" + id, function (){
       $('#commonDialog').modal("show");
    });
}

function executeCancelRequest (requestID)
{
    $('#commonDialog').modal("hide");

    callRestful("/se/payment/cancelRequest/" + requestID + "/cancel", "POST", {});
}

function executeCancel (id)
{
    $('#commonDialog').modal("hide");

    callRestful("/se/payment/cancel/" + id, "POST", {});
}

function executePartCancel (id, partPrice)
{

    //취소가능 금액
    var totalCancelPrice = $('input[name=totalCancelPrice]').val();
    //부분취소 금액
    var partCancelPrice =  $('input[name=cancelPrice]').val();

    if(partCancelPrice == "" || partCancelPrice == 0)
    {
        alert("부분취소 금액을 입력해주세요.");
        return false;
    }


    if(Number(partCancelPrice) >= Number(totalCancelPrice))
    {
        openCancel(id);
        return false;
    }

    $('#commonDialog').modal("hide");

    callRestful("/se/payment/partCancel/" + id, "POST", {partPrice: partPrice});


}

