
// 단말기 정보 데이터
var terminal = {
    useType : 'SINGLE',
    useMembers : []
};

/**
 * 판매점 추가 팝업
 */
function sellerPop () {
    $("#sellerPop").load("/rs/terminal/sellerPop?useType="+terminal.useType, function () {
        fnShowPop("sellerPop");
    });
}

/**
 * 단말기 사용 회원 데이터 세팅
 * @param sellerList 세팅할 회원
 */
function setUseMembers(sellerList) {

    //단독 사용은 하나의 판매점만 등록되기 때문에, 기존의 판매점을 대체.
    if(terminal.useType === 'SINGLE') {
        terminal.useMembers = sellerList;

    //다중 사용은 여러개의 판매점이 등록되기 때문에, 기 등록된 판매점이 있는지 체크.
    } else {

        var existUseMemberCheck = function (checkSeller) {
            return terminal.useMembers.some(function (um) {
                return um.memberID === checkSeller.memberID;
            });
        };

        for(var i=0; i<sellerList.length; i++) {
            if(!existUseMemberCheck(sellerList[i])) {
                terminal.useMembers.push(sellerList[i]);
            }
        }
    }

    setUseMembersHtml();
}

/**
 * 사용 회원 삭제
 * @param index 리스트 인덱스
 */
function deleteUseMember(index) {
    terminal.useMembers.splice(index, 1);
    setUseMembersHtml();
}

/**
 * 단말기 사용 회원 리스트 html 생성해서 출력
 */
function setUseMembersHtml() {
    var innerHtmlStr = "";

    for(var i=0; i<terminal.useMembers.length; i++) {
        innerHtmlStr += '<tr>' +
            '<td class="cell-num">'+(i+1)+'</td>' +
            '<td>'+terminal.useMembers[i].memberName+'</td>' +
            '<td><div class="td-flex"><input type="text" id="useMember'+i+'" name="inputNameForTerminal" class="inp-box" value="'+(terminal.useMembers[i].nameForTerminal||terminal.useMembers[i].memberName)+'"></div></td>' +
            '<td>'+terminal.useMembers[i].memberID+'</td>' +
            '<td>'+terminal.useMembers[i].email+'</td>' +
            '<td>'+terminal.useMembers[i].mobile+'</td>' +
            '<td>'+(terminal.useMembers[i].businessType === 'COMPANY' ? '사업자' : '개인')+'</td>' +
            '<td class="cell-btn"><button type="button" class="btn btn-line-danger" onclick="deleteUseMember('+i+')">삭제</button></td>' +
            '</tr>';
    }

    $("#useMemberListTbody").html(innerHtmlStr);
}

/**
 * 판매점 정보 리스트의 단말기 표시명 데이터 체크
 */
function inputNameForTerminalCheck() {
    var inputs = $("input[name=inputNameForTerminal]");

    for(var i=0; i<inputs.length; i++) {
        if(inputs[i].value === "") {
            alert("단말기 표시명을 입력해주세요.");
            inputs[i].focus();
            return false;
        }

        terminal.useMembers[i].nameForTerminal = inputs[i].value;
    }

    return true;
}



