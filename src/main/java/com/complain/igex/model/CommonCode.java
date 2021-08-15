package com.complain.igex.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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


}
