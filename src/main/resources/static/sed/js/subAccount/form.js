"use strict";

$(document).ready(function () {

    mainAuthCheckEvent();

    /**
     * 공동권한이면 결제취소권한은 자동 활성화 되고,
     * 비활성으로 체크 불가능.
     */
    $("input[name='mainAuth']").change(function (event) {
        mainAuthCheckEvent();
    });
});

function mainAuthCheckEvent() {
    if($("input[name=mainAuth]:checked").val() === "true") {
        $("input[name='cancelAuth']").prop("disabled", true);
        $("#cancelAuthTrue").prop("checked", true);
    } else {
        $("input[name='cancelAuth']").prop("disabled", false);
    }
}


function valicationCheck() {

    if ($("#memberID").val() === "") {
        alert("휴대폰번호를 입력해주세요.");
        $("#memberID").focus();
        return false;

    } else if(!validate.isMobile($("#memberID").val())) {
        alert("휴대폰번호를 올바르게 입력해주세요.");
        $("#memberID").focus();
        return false;
    }

    if ($("#name").val() === "") {
        alert("이름을 입력해주세요.");
        $("#name").focus();
        return false;
    }

    if ($("#passwd").val() !== "" && $("#passwd").val() != null) {
        if (!validate.checkPasswd($("#passwd").val())) {
            alert("비밀번호는 영문자 + 숫자 조합으로 8자이상 입력해주세요.");
            $("#passwd").focus();
            return false;
        }

        if ($("#pwConfirm").val() === "") {
            alert("비밀번호 확인을 입력해주세요.");
            $("#pwConfirm").focus();
            return false;
        }

        if ($("#passwd").val() !== $("#pwConfirm").val()) {
            alert("비밀번호 확인이 틀립니다.");
            $("#pwConfirm").focus();
            return false;
        }
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }
    
    //값 등록 위해 disabled 해제
    $("input[name=cancelAuth]").prop("disabled", false);

    requestAjaxForm("editForm", function (res) {
        alert(res.message);
        location.href = "/se/subAccount/list";
    });
}