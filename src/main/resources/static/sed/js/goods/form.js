"use strict";

function valicationCheck() {

    if ($("#goodsName").val() === "") {
        alert("상품명을 입력해주세요.");
        $("#goodsName").focus();
        return false;
    }

    if ($("#goodsPrice").val() === "") {
        alert("상품금액을 입력해주세요.");
        $("#goodsPrice").focus();
        return false;

    } else if($("#goodsPrice").val() > 10000000){
        alert("상품금액은 최대 10,000,000원까지 설정할 수 있습니다.");
        $("#goodsPrice").focus();
        return false;
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }

    if($("#mode").val() === "regist") {
        $("#id").remove();
    }

    requestAjaxForm("editForm", function (res) {
        alert(res.message);
        location.href = "/se/goods/list";
    });
}

function previewImage(input) {
    var file = input.files[0];

    imageFilePrint(file, document.getElementById('img'), function () {
        $("#imgName").text(file.name);
    })

}

/**
 * 상품이미지 삭제
 * @param id
 */
function deleteImg(id) {
    if(confirm("상품 이미지를 삭제하시겠습니까?")) {
        requestAjax("/se/goods/deleteImg", "post", {id: id}, function (res) {
            location.reload();
        });
    }
}