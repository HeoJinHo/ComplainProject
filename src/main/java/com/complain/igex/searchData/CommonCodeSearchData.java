package com.complain.igex.searchData;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.thymeleaf.util.StringUtils;

@ToString
@Setter
@Getter
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class CommonCodeSearchData extends SearchDataForMongo
{
    String searchName;

    String searchUserName;


    @Override
    public Query makeQuery() {
        return makeQuery(makeCriteria());
    }

    public Criteria makeCriteria() {
        Criteria criteria = new Criteria();

        if (!StringUtils.isEmpty(searchName))
            criteria = makeCriteria(criteria, "name").regex(searchName);

        if (!StringUtils.isEmpty(searchUserName))
            criteria = makeCriteria(criteria, "userName").regex(searchUserName);

        criteria = regDateWhere (criteria, "reg_date");

        return criteria;
    }




}
