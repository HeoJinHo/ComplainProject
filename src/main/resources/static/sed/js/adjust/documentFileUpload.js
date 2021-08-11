"use strict";

$(document).ready(function () {
    $("#file").change(function () {
        if(window.FileReader){ // modern browser
            var filename = $(this)[0].files[0].name;
        }
        else { // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
        }

        if(!/(gif|jpg|jpeg|png|bmp)$/i.test(filename.split(".")[1].toLowerCase())) {
            alert("이미지 파일만 가능합니다.");
            return;
        }

        upload();
    });
});

function fileSelect(documentType) {
    $("#documentType").val(documentType);
    $("#file").click();
}

function upload() {
    var successFunc = function(res) {
        alert(res.message);
        location.reload();
    };

    var errorFunc = function(request, status, error) {
        alert("업로드 실패했습니다.");
        console.log("에러코드 : " + request.status +"\n" + "메시지 :"+ request.responseText);
    };

    $("#documentForm").ajaxForm({
        enctype: "multipart/form-data",
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });

    $("#documentForm").submit();
}

/**
 * 추가 서류제출 팝업
 */
function addDocFilePopup() {
    $('#addDocUpload').load("/se/dialog/addDocFile/", function () {
        $('#addDocUpload').modal("show");
    });
}