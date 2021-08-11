function submitFormAfter (data)
{
    if (data.success == "Y") {
        if (data.message == "") {
            if (data.procAfterSuccess == "RELOAD")
                ajaxSubmit.reload();
            else if (data.procAfterSuccess == "MOVEURL")
                location.href = data.moveUrl;
        }
        else {
            alert (data.message);

            if (data.procAfterSuccess == "RELOAD")
                location.reload ();
            else if (data.procAfterSuccess == "MOVEURL") {
                location.href = data.moveUrl;
            }
        }
    }
    else
        alert (data.message);
}

function callRestfulMes (url, method)
{
    if (!confirm ("정말로 실행시키시겠습니까?"))
        return;

    return callRestful(url, method);
}

function openAlert(message, func, val)
{
    $('#commonDialog').load("/se/dialog/confirm?message=" +  encodeURIComponent(message) + "&func=" + func + "&val=" + encodeURIComponent(val), function () {
        $('#commonDialog').modal("show");
    });
}

function callRestful (url, method, data)
{
    if (method === "DELETE")
    {
        if (!confirm ("정말로 실행시키시겠습니까?"))
            return;
    }

    $.ajax ({
        type: method,
        url: url,
        data: data,
        dataType: 'json',
        success: function (data, textStatus)
        {
            if (data.success === "Y") {
                if (data.message === "") {
                    if (data.procAfterSuccess === "RELOAD")
                        ajaxSubmit.reload();
                    else if (data.procAfterSuccess === "MOVEURL") {
                        console.log (data.moveUrl);
                        location.href = data.moveUrl;
                    }
                }
                else {

                    alert (data.message);

                    if (data.procAfterSuccess === "RELOAD")
                        location.reload ();
                    else if (data.procAfterSuccess === "MOVEURL") {
                        location.href = data.moveUrl;
                    }
                }
            }
            else
                alert (data.message);

        },
        error: function (xhr, textStatus)
        {
            alert ("[ERR] : " + xhr.status);
        }
    });
}

function moneyFormat(str)
{
    var re="";
    str = str + "";
    str=str.replace(/-/gi,"");
    str=str.replace(/ /gi,"");

    str2=str.replace(/-/gi,"");
    str2=str2.replace(/,/gi,"");
    str2=str2.replace(/\./gi,"");

    if(isNaN(str2) && str!="-") return "";
    try
    {
        for(var i=0;i<str2.length;i++)
        {
            var c = str2.substring(str2.length-1-i,str2.length-i);
            re = c + re;
            if(i%3==2 && i<str2.length-1) re = "," + re;
        }

    }catch(e)
    {
        re="";
    }

    if(str.indexOf("-")==0)
    {
        re = "-" + re;
    }

    return re;
}

function checkMoreFilter ()
{
    var openMore = false;

    $(".more_filter input").each (function () {
        if ($(this).val().length > 0)
            openMore = true;
    });

    $(".more_filter select").each (function () {
        if ($(this).val().length > 0)
            openMore = true;
    });

    if (openMore)
        openMoreFilter(openMore)
}

function openCst(cstUrl)
{
    window.open(cstUrl, "cst", "width=400,height=690");
}


function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}