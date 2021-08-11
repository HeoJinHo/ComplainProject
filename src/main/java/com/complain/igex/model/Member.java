package com.complain.igex.model;

import com.complain.igex.model.cenum.MemberState;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Document
public class Member {

    @Id
    private String member_id;

    private String member_pwd;

    @Transient
    private String modifiy_pwd;

    private String member_name;

    private String member_phone;

    private String member_zip_code;

    private String member_address;

    private String member_address_detail;

    private String member_type;

    private MemberState state;

    private String auth;

    private List<Map> top_menu;

    private List<Map> sub_menu;

    private String deptID;
    private String deptNm;

    private Date reg_date;

    String member_dept;
    String member_deptNm;


}