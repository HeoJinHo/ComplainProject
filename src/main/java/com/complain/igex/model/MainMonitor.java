package com.complain.igex.model;

import com.complain.igex.model.cenum.UseYn;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document
public class MainMonitor
{

    @Id
    String id;

    String title;

    String content;

    UseYn useYn;

    Date reg_date;

    String survey;


}
