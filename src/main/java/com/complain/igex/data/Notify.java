package com.complain.igex.data;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@Accessors(chain = true)
public class Notify
{

    @Id
    private String id;

    /**
     * 회원 아이디
     */
    private String memberID;

    /**
     * 확인 완료 여부
     */
    private boolean confirmOk;


    /**
     * EVENT 발생일
     */
    private Date eventDate;

    /**
     * 푸쉬 타이틀
     */
    private String title;

    /**
     * 푸시 바디
     */
    private String body;

    private String notiId;



    public Notify ()
    {
    }

    public Notify (String memberID)
    {
        this.memberID = memberID;

        this.confirmOk = false;
        this.eventDate = new Date ();
    }

}
