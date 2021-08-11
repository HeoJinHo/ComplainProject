$(document).ready(function () {
    $("[name='remotePayName']").change (function () {
        if ($(this).val() === "DIRECT")
            $("#directInputForm").show();
        else
            $("#directInputForm").hide();
    });

    // 결제토큰 보임여부
    $("[name='payTokenYn']").change (function () {
        if ($(this).val() === 'true')
            $("#payTokenInfo").show();
        else
            $("#payTokenInfo").hide();
    });

    $("#directName").keyup (function () {
        $("#directInputStr").text ($(this).val() || "직접입력한 값");
    });

    // 봉사료 퍼센트 설정 보임여부
    $("[name='serviceChargeUse']").change (function (e) {
        $("#serviceChargePercentArea").css('display', e.target.value === 'true' ? 'block' : 'none');
    });

    len_chk();

    // 기본 상품명 없을시 기본값 넣어주기 
    if($("#baseGoodName").val() == '') {
        $("#baseGoodName").val('대면결제상품')
    }

});

function valicationCheck() {

    if ($("[name='remotePayName']:checked").val() === "DIRECT") {
        if ($("#directName").val() === "") {
            alert("발송자 표시를 입력해주세요.");
            $("#directName").focus();
            return false;
        }
    }

    if($("[name=remotePayLogo]:checked").val() === 'UPLOAD_IMAGE') {
        if($("#img").css('display') === 'none') {
            alert("업로드할 이미지를 선택해주세요.");
            return false;
        }
    }

    return true;
}

function submit() {
    if(!valicationCheck()) {
        return;
    }

    requestAjaxForm("updateForm", function (res) {
        alert(res.message);
        location.reload();
    });
}

function previewImage(input) {
    var file = input.files[0];
    var imgElement = document.getElementById('img');

    imageFilePrint(file, imgElement, function () {
        if(imgElement.style.display === 'none')
            imgElement.style.display = 'block';
    });
}

//글자수 제한 체크
function len_chk(){
    var goodname = document.getElementById("baseGoodName");
    var goodsNameCount = document.getElementById("defaultGoodsNameCount");
    goodsNameCount.innerText = goodname.value.length;
}

