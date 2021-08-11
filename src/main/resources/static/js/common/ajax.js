"use strict";

/**
 * ajax 요청
 * @param url 요청 URL
 * @param type 요청 방법
 * @param param 파라미터
 * @param seccessFunc 성공했을때 콜백함수
 * @param failFunc 실패했을때 콜백함수
 * @param notErrorAlert 에러시 alert 창 출력 여부
 */
var requestAjax = function (url, type, param, successFunc, failFunc, notErrorAlert, contentType) {
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
        url : url,
        type: type,
        dataType: "json",
        contentType: contentType != null ? contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data : param,
        beforeSend : function(xhr)
        {   /*데이터를 전송하기 전에 헤더에 csrf값을 설정한다*/
            xhr.setRequestHeader(header, token);
        },
        success : function (response) {
            if (response.success === "Y") {
                successFunc(response);
            } else {
                if (failFunc != null)
                    failFunc(response.message);
                else
                    alert(response.message);
            }

        },
        error:function(request,status,error) {
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

            if(request.status === 403 && request.responseText.indexOf("Session Expired!") > -1) {
                location.href = "/login";

            } else if(!notErrorAlert) {
                alert("ERROR : " + request.status);
            }
        }
    })
};

/**
 * ajaxForm 요청
 * @param formID
 * @param type
 * @param successFunc
 * @param failFunc
 */
function requestAjaxForm(formID, successFunc, failFunc) {
    var form = $("#"+formID);

    form.ajaxForm({
        dataType: "json",
        success: function (res) {
            console.log(res);
            if(res.success === "Y")
                successFunc(res);
            else{
                if(failFunc != null)
                    failFunc(res);
                else
                    alert(res.message);
            }
        },
        error: function(request) {
            alert("error : "+request.status);
            console.log("에러코드 : " + request.status +"\n" + "메시지 :"+ request.responseText);
        }
    });

    form.submit();
}

function requestAjaxForm2(formID, successFunc, failFunc) {
    var form = $("#"+formID);

    form.ajaxSubmit({
        dataType: "json",
        success: function (res) {
            if(res.success === "Y")
                successFunc(res);
            else{
                if(failFunc != null)
                    failFunc(res);
                else
                    alert(res.message);
            }
        },
        error: function(request) {
            alert("error : "+request.status);
            console.log("에러코드 : " + request.status +"\n" + "메시지 :"+ request.responseText);
        }
    });
}
