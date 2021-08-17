"use strict";



/**
 * 공통되는 checkBox의 값들을 구분자로 합쳐서 반환
 * @param name
 */
function getChecksValue(name, delimiter) {
    var idArr = [];

    $("input[name="+name+"]:checked").each(function() {
        idArr.push($(this).val());
    });

    return idArr.join(",");
}



/**
 * 글자수 체크
 * @param textLength
 * @param lengthDisplayID
 * @param limitCount
 */
function strLengthDisplay(textLength, lengthDisplayID, limitCount) {
    if(limitCount !== undefined && textLength > limitCount) {
        textLength = limitCount;
    }

    $("#"+lengthDisplayID).text(textLength);
}

/**
 * string null || "" 체크
 * @param str
 */
function isStrNull(str) {
    return str == null || str === "";
}

/**
 * 페이지 이동
 * @param page
 */
var onPage = function (page) {
    $("#page").val(page);
    $("#searchForm").submit();
};


$(document).ready(function () {
    // 검색 초기화
    $("#resetBtn").click(function () {
        var url = $("#searchForm").prop("action");
        console.log(url);
        location.href = url;
    });

    alarmTop5();
    existNotConfirmAlarm();

    // 1분 주기로 미확인 알람 유무 조회
    setInterval(existNotConfirmAlarm, 1000 * 60);

});


function alarmTop5() {
    requestAjax("/alarm/top5", "get", null, function (res) {
        var alarmContent = "";
        // 알람 데이터 없을때
        if(res.length < 1) {
            alarmContent = "<li>알림 내역이 없습니다.</li>";

            // 알람 데이터 있을때
        } else {
            $.each(res, function(index, item) {
                alarmContent += "<li>"
                    + "<div class='ttWrap clearfix'>"
                    + "<div class='tt'><a href = \"javascript:eventMove('" + item.notify.notiId + "')\">"+item.content+"</a></div>"
                    + "<div>"
                    + "<div class='date'>"+moment(item.notify.eventDate).format('YYYY-MM-DD')+"</div>"
                    + "</li>";
            });
        }

        $("#alarmTop5Content").html(alarmContent);
    }, null, true);
}

function eventMove(id){
    location.href = "/complain/complainDetail?id="+id;
}


function existNotConfirmAlarm() {
    var alarmIcon = $("#alarmIcon");

    requestAjax("/alarm/existNotConfirm", "get", null, function(res) {
        console.log(res)
        if(res) {
            alarmIcon.removeClass("i_alert");
            alarmIcon.addClass("i_alertOn");
        } else {
            alarmIcon.removeClass("i_alertOn");
            alarmIcon.addClass("i_alert");
        }
    });
}


/**
 * ajax 요청
 * @param url 요청 URL
 * @param type 요청 방법
 * @param param 파라미터
 * @param seccessFunc 성공했을때 콜백함수
 * @param failFunc 실패했을때 콜백함수
 */
var requestAjax = function (url, type, param, successFunc, failFunc, errorFunc, contentType) {

    $.ajax({
        url : url,
        type: type,
        dataType: "json",
        contentType: contentType != null ? contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data : param,
        success : function (response) {
            if(response.redirectUrl)
                location.href = response.redirectUrl;
            else if(response.success === "Y") {
                successFunc(response.data);
            } else {
                if(failFunc)
                    failFunc(response.message);
                else
                    return false;
            }
        },
        error:function(request,status,error){
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            if(errorFunc)
                errorFunc(request, status, error);
            else
                alert("ERROR : " + request.status);
        }
    })
};
