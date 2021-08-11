"use strict";

/**
 * 상품 불러오기 팝업 오픈
 * @param memberID
 */
var openGoodsPop = function (param) {
    var url = "/se/paymentLink/goodsPop";
    if(param !== undefined)
        url += param;

    $("#goodsPop").load(url, function () {
        $("#goodsPop > .modal-backdrop").addClass("in");
        $("#goodsBrower").show();
    });
};

/**
 * 상품 불러오기 검색 및 페이지 이동
 * @param page
 */
var goodsSearch = function (page) {
    var param = "?page=" + page + "&goodsNameLike=" + $("#searchGoodsName").val();
    openGoodsPop(param);
};

/**
 * 상품 불러오기 팝업 닫기
 */
var closeGoodsPop = function () {
    $('#goodsPop').empty();
};

/**
 * 상품 불러오기 팝업에서 선택한 상품 세팅.
 * @param fileID
 * @param fileName
 * @param goodsName
 * @param goodsPrice
 * @param goodsUseTax
 */
var setGoodsInfo = function (fileID, fileName, goodsName, goodsPrice, goodsUseTax) {

    $("#goodsName").val(goodsName);
    $("#goodsPrice").val(goodsPrice).trigger("keyup");
    if(goodsUseTax)
        $("#useTaxTrue").prop('checked', true);
    else
        $("#useTaxFalse").prop('checked', true);

    closeGoodsPop();
}
