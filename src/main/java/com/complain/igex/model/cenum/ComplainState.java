package com.complain.igex.model.cenum;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ComplainState {

    /**
     * 민원 요청
     * */
    REQUEST("요청"),

    /**
     * 민원 확인
     * */
    APPROVE("확인"),

    /**
     * 민원 반려
     * */
    REJECT("반려"),


    /**
     * 민원 완료
     * */
    COMPLETE("완료");


    @Getter private String value;


}
