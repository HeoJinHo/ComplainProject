"use strict";

$(document).ready(function () {

});

function valicationCheck() {


    if($("#cnt").val() === "") {
        alert("수량을 입력해주세요.");
        $("#cnt").focus();
        return false;
    }

    if($("#depositName").val() === "") {
        alert("입금자명을 입력해주세요.");
        $("#depositName").focus();
        return false;
    }

    if($("#zipCode").val() === "") {
        alert("주소를 선택해주세요");
        return false;
    }

    if($("#detailAddr").val() === "") {
        $("#detailAddr").focus();
        alert("상세주소를 입력해주세요.");
        return false;
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }

    requestAjaxForm("editForm", function (res) {
        alert(res.message);
        location.reload();
    });
}

/**
 * 주소검색
 */
var searchAddr = function() {
    new daum.Postcode({
        oncomplete: function (data) {
            console.log(data);
            $("#zipCodeText").val(data.zonecode);
            $("#zipCode").val(data.zonecode);
            $("#addressText").val(data.roadAddress);
            $("#roadAddr").val(data.roadAddress);
            $("#jibunAddr").val(data.jibunAddress);
        }
    }).open({left: 200, top: 200});
};