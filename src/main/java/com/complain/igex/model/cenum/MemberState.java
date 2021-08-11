package com.complain.igex.model.cenum;

import lombok.Getter;

@Getter
public enum MemberState {

    /**
     * 회원가입 요청
     * */
    REQUEST,

    /**
     * 회원가입 승인
     * */
    APPROVE,

    /**
     * 회원가입 거철
     * */
    REJECT,

}
