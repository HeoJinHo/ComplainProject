package com.complain.igex.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * 부서
 */
@Getter
@Setter
@Document
public class Dept
{

    @Id
    String id;

    // 부서명
    String deptNm;

    // 생성일자
    Date reg_date;


}