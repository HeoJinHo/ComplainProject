package com.complain.igex.model;

import com.complain.igex.model.cenum.UseYn;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 민원종류 정보
 */
@Getter
@Setter
@Document
public class CommonCode
{
    @Id
    String id;

    String codeName;

    String userID;

    String userName;

    UseYn useYn;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    Date reg_date;

}
