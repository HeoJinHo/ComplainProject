package com.complain.igex.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@ToString
public class Complain
{

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



}
