package com.complain.igex.data;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class FileList
{

    @Id
    String id;

    String orgName;

    String rdName;
}
