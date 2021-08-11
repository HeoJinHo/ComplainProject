package com.complain.igex.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document
public class ComplainMoveHis
{

    @Id
    String id;

    //변경 전 담당자 아이디
    String bfMemberID;
    //변경 전 담당자 명
    String bfMemberNm;

    //변경 후 담당자 아이디
    String afMemberID;
    //변경 후 담당자 명
    String afMemberNm;

    //변경 날짜
    Date moveDate;

    // 변경한 사용자 아이디
    String moveMemeberID;

    // 민원 아이디
    String complainID;

}
