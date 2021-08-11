"use strict";

/**
 * 로그인 submit
 */
var submit = function () {

    if(!beforeSubmit()) {
        return false;
    }

    $("form[name='loginForm']").ajaxSubmit({
        type: "post",
        url : "/login",
        dataType: "json",
        success: function (res) {
            if(res.success === "Y") {
                location.href = res.data;
            }
            else{
                console.log(res);
                alert(decodeURI(res.message.replace(/\+/g, " ")));
                document.loginForm.user_pass.value = "";
            }
        },
        error: function(request) {
            alert("error : "+request.status);
            console.log("에러코드 : " + request.status +"\n" + "메시지 :"+ request.responseText);
        }
    });

    return false;
};


$(document).ready(function () {
    // 저장된 쿠키값을 가져와서 ID 칸에 넣어준다. 없으면 공백으로 들어감.
    var userInputId = getCookie("userInputId");
    $("input[name='user_id']").val(userInputId);

    if($("input[name='user_id']").val() != ""){ // 그 전에 ID를 저장해서 처음 페이지 로딩 시, 입력 칸에 저장된 ID가 표시된 상태라면,
        $("#saveId").attr("checked", true); // ID 저장하기를 체크 상태로 두기.
    }

    $("#saveId").change(function(){ // 체크박스에 변화가 있다면,
        if($("#saveId").is(":checked")){ // ID 저장하기 체크했을 때,
            var userInputId = $("input[name='user_id']").val();
            setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
        }else{ // ID 저장하기 체크 해제 시,
            deleteCookie("userInputId");
        }
    });

    // ID 저장하기를 체크한 상태에서 ID를 입력하는 경우, 이럴 때도 쿠키 저장.
    $("input[name='user_id']").keyup(function(){ // ID 입력 칸에 ID를 입력할 때,
        if($("#saveId").is(":checked")){ // ID 저장하기를 체크한 상태라면,
            var userInputId = $("input[name='user_id']").val();
            setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
        }
    });

    //엔터 입력 시, 로그인 submit
    /*$("input[name='user_id'], input[name='user_pass']").keypress(function (e) {
       if(e.keyCode === 13) {
           submit();
       }
    });*/

    $("form[name='loginForm']").submit (function () {
        submit();
        return false;
    });
});

var setCookie = function(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
};

var deleteCookie = function(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
};

var getCookie = function(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
};


/**
 * submit check
 * @returns {boolean}
 */
var beforeSubmit = function () {
    if(document.loginForm.user_id.value == "") {
        alert("아이디를 입력해주세요.");
        document.loginForm.user_id.focus();
        return false;
    }

    if(document.loginForm.user_pass.value == "") {
        alert("비밀번호를 입력해주세요.");
        document.loginForm.user_pass.focus();
        return false;
    }

    return true;
};

