
$(document).ready(function () {
    $("input[name=useType]").click(function (e) {
        // terminal obj는 ./common.js에 정의 
        terminal.useType = e.target.value;
        
        //판매점 정보 리스트영역 초기화.
        $("#useMemberListTbody").children().remove();
    });
});

/**
 * 등록 요청
 */
function insert() {
    if(!valueCheck())
        return;

    terminal.id = $("#tid").val();
    terminal.useType = $("input[name=useType]:checked").val();
    terminal.desc = $("#desc").val();

    requestAjax("/rs/terminal", "post", JSON.stringify(terminal), function (res) {
        alert(res.message);

        //리스트 페이지로 이동
        location.href = "/rs/terminal";

    }, null, null, "application/json");
}

/**
 * 등록 요청 전 값 체크
 * @returns {boolean}
 */
function valueCheck() {
    if($("#tid").val() === "") {
        alert("단말기 번호를 입력해주세요.");
        $("#tid").focus();
        return false;
    }
    
    // ./common.js에 정의된 function
    return inputNameForTerminalCheck();
}
