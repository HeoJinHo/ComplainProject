"use strict";

$(document).ready(function () {
    newFileSelectEventBind($(".upload-hidden"));
});

//파일 선택 이벤트 바인딩
function newFileSelectEventBind(target) {
    target.on('change', function(){ // 값이 변경되면
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

        // 추출한 파일명 삽입
        $(this).parent().siblings('.inp-box.files').val(filename);
        // 파일첨부 시 버튼 변경
        $(this).parent('.btn').addClass('btn-line-secondary');
        $(this).parent().children('span').text('수정');
    });
}

/**
 * 파일 업로드 추가
 * @type {number}
 */
var newFileCnt = 0;
function addFile(id) {
    newFileCnt++;
    $(id).remove();

    var append =
    '<tr>' +
        '<th>새파일</th>' +
        '<td>' +
            '<div class="td-flex">' +
                '<input class="inp-box files" value="선택된 파일 없음" disabled="disabled">' +
                '<label for="newFile'+newFileCnt+'" class="btn btn-line-primary filebox">' +
                    '<input type="file" id="newFile'+newFileCnt+'" name="file[]" class="upload-hidden" >' +
                    '<span>파일 선택</span>' +
                '</label>' +

                '<button type="button" class="btn btn-primary btn_moreAttch" onclick="addFile(this)">' +
                    '<i class="fa fa-plus" aria-hidden="true"></i>' +
                    '<span class="sr_only">서류제출 추가</span>' +
                '</button>' +
            '</div>' +
        '</td>' +
    '</tr>';

    $("#table").append(append);
    newFileSelectEventBind($("#newFile"+newFileCnt));
}

/**
 * 파일 업로드
 */
var documentFileUpload = function () {
    var successFunc = function(res) {
        alert(res.message);
        
        //화면 새로고침
        $("#searchForm").submit();
    };

    requestAjaxForm("documentForm", successFunc);

};

/**
 * 추가 서류 수정
 */
function updateAddDocFile(fileIndex) {
    $("#fileIndex").val(fileIndex);
    $("#updateAddDocFile").click();
}