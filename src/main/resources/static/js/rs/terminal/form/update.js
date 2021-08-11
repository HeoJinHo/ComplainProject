/**
 * 수정 요청
 */
function update() {
    if(!valueCheck())
        return;

    // ./common.js에 정의
    terminal.desc = $("#desc").val();

    requestAjax("/rs/terminal/"+terminal.id, "put", JSON.stringify(terminal), function (res) {
        alert(res.message);

        //상세조회 페이지로 이동
        location.href = "/rs/terminal/"+terminal.id;
    }, null, null, "application/json");
}

/**
 * 값 체크
 * @returns {boolean}
 */
function valueCheck() {
    // ./common.js에 정의된 function
    return inputNameForTerminalCheck();
}

/**
 * 삭제 요청
 */
function deleteTerminal() {
    requestAjax("/rs/terminal/"+terminal.id, "delete", null, function (res) {
        alert(res.message);
        
        //리스트 페이지로 이동
        location.href = "/rs/terminal";
    });
}
