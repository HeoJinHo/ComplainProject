package com.complain.igex.model;

import com.complain.igex.model.cenum.ComplainState;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class Complain
{
    /*
     * 민원 등록
     * */
    @Id
    String id;

    String com_name;

    String com_phone;

    String com_email;

    String com_zip_code;

    String com_address;

    String com_address_detail;

    String com_title;

    String com_content;

    ComplainState com_state;

    String manageID;
    String manageName;

    Member memberInfo;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    Date reg_date;


    String complainComment;


    List<MainMonitor> monitors;
}
