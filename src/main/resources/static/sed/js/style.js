/* ----------------------------------------------------------------
 use bootstrap tooltip
 -----------------------------------------------------------------*/
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()
});

function openMoreFilter (open)
{
    if (open)
    {
        $(".detail").css("display","none");
        $(".basic").css("display","block");
        $(".more_filter").addClass("show");
    }
    else {
        $(".detail").css("display","block");
        $(".basic").css("display","none");
        $(".more_filter").removeClass("show");
    }
}


$(document).ready(function(){
    // gnb for pc
    $(".gnbWrap ul li").mouseenter(function(){
        $(" > ul", this).stop().show();
    });

    $(".gnbWrap ul li").mouseleave(function(){
        $(" > ul", this).stop().hide();
    });


    // gnb for tablet
    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    // gnb for tablet
    $(".sidebar-depth3 > a").click(function() {
        $(".depth3").slideUp(200);
        if (
            $(this)
                .parent()
                .hasClass("active")
        ) {
            $(".sidebar-depth3").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-depth3").removeClass("active");
            $(this)
                .next(".depth3")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar, .bg-dim").click(function() {
        $(".m_gnbWrap").removeClass("toggled");
        $(".bg-dim").removeClass("on");
    });
    $(".btn_menuOpen").click(function() {
        $(".m_gnbWrap").addClass("toggled");
        $(".bg-dim").addClass("on");
    });

    //search_filter expand
    $(".detail button").click(function(){
        openMoreFilter(true);
    });
    $(".basic button").click(function(){
        openMoreFilter(false);
    });

    $("#allListchk").click(function () {
        var checked = $(this).is(":checked");
        if(checked) {
            $("input:checkbox[name='itemChk']").prop("checked", true);
        } else {
            $("input:checkbox[name='itemChk']").prop("checked", false);
        }
    });


    //popover
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    $('#testPopover').popover({
        html : true,
        content: function() {
            return $("#popText").html();
        }
    });


    // 결제기능제한 안내 팝오버 이벤트
    $(".with-popover .open-popover").click(function(){
        $(this).siblings(".popover.reject-popover").show();
        return false;
    });

    $(".popover.reject-popover .popover-close").click(function(){
        $(this).parents(".popover.reject-popover").hide();
        return false;
    });






});


/* ----------------------------------------------------------------
 file
 -----------------------------------------------------------------*/

$(document).ready(function() {
    var fileTarget = $('.filebox .upload-hidden');
    fileTarget.on('change', function() {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename);
    });
});


