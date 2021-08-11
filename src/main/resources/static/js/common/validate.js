"use strict";

var regMobile = /^01([0|1|6|7|8|9]?)\d{8,9}/;
var regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//var regMemberID = /^[a-zA-Z](?=.{0,28}[0-9])[0-9a-zA-Z]{3,}$/; //영문 + 숫자 조합 4자리 이상
var regMemberID = /^[0-9a-zA-Z]{4,}$/; //영문 또는 숫자 조합 4자리 이상
var regPasswd = /^[a-zA-Z0-9](?=.*[a-zA-Z0-9])(?=.*[0-9]).{7,}$/;
var regHttpUrl = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi

var validate = {

    isMobile: function (str) {
        return regMobile.test(str);
    },
    isNotEmpty: function (str) {
        if(str == null || str === "") {
            return false;
        }
        return true;
    },
    isEmail: function (str) {
        return regEmail.test(str);
    },
    checkMemberID: function (str) {
        return regMemberID.test(str);
    },
    checkPasswd: function (str) {
        return regPasswd.test(str);
    },

    checkHttpUrl: function (str) {
        return regHttpUrl.test(str);
    },

    /**
     * 아이디 중복체크
     * @param memberID
     * @param successFunc
     * @returns {boolean}
     */
    checkDupMemberID: function (memberID, successFunc, failFunc) {

        if(memberID === "") {
            alert("아이디를 입력해주세요.");
            return;

        } else if(!regMemberID.test(memberID)) {
            alert("아이디는 영문자 또는 숫자 4자 이상 입력해주세요.");
            return false;
        }

        var url = "/rs/member/existID?memberID="+memberID;
        var type = "get";

        requestAjax(url, type, null, successFunc, failFunc);
    },

    isStrEmpty: function (str) {
        return (str === null || str === undefined || str === "");
    }

};