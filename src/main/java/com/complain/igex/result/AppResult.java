package com.complain.igex.result;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.experimental.Accessors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Accessors(chain = true)
public class AppResult
{
    /**
     * 성공 결과
     */
    protected String success;

    /**
     * 메시지
     */
    protected String message;

    /**
     * 에러 코드
     */
    private String errCode;

    /**
     * 추가 데이터 1
     */
    private String addonData1;

    /**
     * 추가 데이터 2
     */
    private String addonData2;

    /**
     * 추가 데이터 3
     */
    private String addonData3;



    public AppResult ()
    {
        super ();
        success = "N";
        message = "";
        errCode = "";
    }

    public AppResult (String success, String message)
    {
        this.success = success;
        this.message = message;
    }

    public void success (String message)
    {
        success = "Y";
        this.message = message;
    }

    public void fail (String message, String errCode)
    {
        success = "N";
        this.message = message;
        this.errCode = errCode;
    }

    public void fail (String message)
    {
        success = "N";
        this.message = message;
        this.errCode = "";
    }

    public static AppResult createSuccess (String message)
    {
        AppResult r = new AppResult ();

        r.success (message);

        return r;
    }

    public static AppResult createSuccess ()
    {
        return createSuccess ("SUCCESS");
    }

    public static AppResult createFail (String message)
    {
        AppResult r = new AppResult ();

        r.fail (message);

        return r;
    }

    public static AppResult createFail (String message, String errCode)
    {
        AppResult r = new AppResult ();

        r.fail (message, errCode);

        return r;
    }
}