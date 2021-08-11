$(function(){

//gnb
  $(".gnb .depth1-li").mouseenter(function(){
    $(this).addClass("active").children(".depth2").stop(true, true).slideDown(100);
  });
  $(".gnb .depth1-li").mouseleave(function(){
    $(this).removeClass("active").children(".depth2").stop(true, true).slideUp(100);
  });

// //gnb tablet
  $(".btn-m-gnb").click(function(){
    $(this).siblings(".con-bound").animate({left:"0"},350);
    $(this).siblings(".bg-dim").addClass("on");
  });
  $(".btn-m-close, .bg-dim").click(function(){
    $(".m-gnb .con-bound").animate({left:"-420px"},350);
    $(".bg-dim").removeClass("on");
  });
  $(".m-gnb .depth1-li").click(function(){
    $(this).toggleClass("active").children(".depth2").slideToggle(200);
  });

  //gnb 개수에 따른 너비값
  var menuLength = $(".gnb .depth1").children("li").length;
  $('.gnb .depth1').each(function(){
    if(menuLength == 5){
      $(this).children().css("width","20%");
    } else if (menuLength == 7){
      $(this).children().css("width","14.28%");
    } else if (menuLength == 8){
      $(this).children().css("width","12.5%");
    }
  });

//파일 업로드
  var fileTarget = $('.filebox .upload-hidden');

  fileTarget.on('change', function(){ // 값이 변경되면
    if(window.FileReader){ // modern browser
      var filename = $(this)[0].files[0].name;
    }
    else { // old IE
      var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
    }

    // 추출한 파일명 삽입
    $(this).parent().siblings('.inp-box.files').val(filename);
    // 파일첨부 시 버튼 변경
    $(this).parent('.btn').addClass('btn-line-secondary');
    $(this).parent().children('span').text('수정');
  });

//상세-서류정보 펼침
  $(".a-toggle").click(function(){
    $(this).toggleClass("active").next(".con-formbox").slideToggle(200);
    $(this).children().find(".fa-chevron-down").toggleClass("fa-chevron-up");
  });

  //문자팝업-문자영역 토글
  $(".pop-txt .btn-collapse").click(function(){
    $(this).children('i').toggleClass("fa-chevron-up");
    $(this).next(".wrap-sms").slideToggle(200);
    $(this).children('span').text( $(this).text().indexOf("문자내용 닫기") > -1 ? "문자내용 보기" : "문자내용 닫기");
  });

  //floating select -등록 및 수정에서 은행 선택 박스
    $(".select-relate").find(".select-button").click(function(){
      $(this).next(".select-layer").fadeToggle(200);
      return false;
    })
});
$(document).mouseup(function (e){
  var stlayer = $(".select-layer");
  if( stlayer.has(e.target).length === 0)
      stlayer.fadeOut(200);
});

//레이어팝업
function fnShowPop(sGetName){
  var $layer = $("#"+ sGetName);
  $layer.addClass("on");
    if($(window).width() <768) {
      $("html, body").css("overflow","hidden").css("height","100%");
    }
}
function fnHidePop(sGetName){
  $("#"+ sGetName).removeClass("on");
    if($(window).width() <768) {
      $("html, body").css("overflow","auto").css("height","auto");
    }
}
