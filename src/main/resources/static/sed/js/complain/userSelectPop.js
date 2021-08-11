"use strict";



/**
 * 선택완료
 */
function selectOk(id, name) {
    //데이터 넘김 (modal 부모 창의 request.js 함수 호출)
    settingGoodsPopData(id, name);
}
function settingGoodsPopData(id, name) {
    $("#complainManageNm").val(name);
    $("#complainManageNm").prop('readonly', true);
    $("#complainManage").val(id);

    closeUsersPop();

}



/**
 * 선택완료
 */
function selectDept(id, name) {
    //데이터 넘김 (modal 부모 창의 request.js 함수 호출)
    settingDeptPopData(id, name);
}

function settingDeptPopData(id, name) {
    $("#member_deptNm").val(name);
    $("#member_dept").val(id);

    closeDeptPop();

}