package com.complain.igex.model.cenum;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum UseYn
{

    USE("사용"),

    NONE_USE("미사용");

    @Getter
    private String value;
}
