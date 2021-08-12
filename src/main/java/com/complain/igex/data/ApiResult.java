package com.complain.igex.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class ApiResult
{

    private boolean success;

    private String errorType;

    private String message;

    private String val1;

    private String vla2;

    public ApiResult(){}


    public ApiResult(boolean success, String message) {
        this.success = success;
        this.message = message;
    }


    public ApiResult(boolean success, String message, String val1) {
        this.success = success;
        this.message = message;
        this.val1 = val1;
    }

    public ApiResult(boolean success, String message, String val1, String vla2) {
        this.success = success;
        this.message = message;
        this.val1 = val1;
        this.vla2 = vla2;
    }

    public ApiResult(boolean success, String errorType, String message, String val1, String vla2) {
        this.success = success;
        this.errorType = errorType;
        this.message = message;
        this.val1 = val1;
        this.vla2 = vla2;
    }
}
