package com.complain.igex.result;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.HashMap;
import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@Accessors(chain = true)
public class ApiOneDataResult<T> extends AppResult
{
    /**
     * 기본 데이터
     */
    private T data;

    /**
     * 추가 데이터
     */
    private Map<String, Object> mapData = new HashMap<>();

    public ApiOneDataResult ()
    {
    }

    public ApiOneDataResult (T data)
    {
        this.success ("SUCCESS", data);
    }

    public ApiOneDataResult (T data, String message)
    {
        this.success (message, data);
    }

    public void success (String message, T data)
    {
        success (message);
        this.data = data;
    }

    public void addObject (String key, Object obj)
    {
        mapData.put (key, obj);
    }
}
