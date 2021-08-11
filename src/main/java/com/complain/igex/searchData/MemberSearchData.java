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
public class MemberSearchData extends SearchDataForMongo
{

    String memberID;
    String member_name;
    String dateRange;

    @Override
    public Query makeQuery() {
        return makeQuery(makeCriteria());
    }

    public Criteria makeCriteria() {
        Criteria criteria = new Criteria();

        if (!StringUtils.isEmpty(memberID))
            criteria = makeCriteria(criteria, "_id").regex(memberID);


        if (!StringUtils.isEmpty(member_name))
            criteria = makeCriteria(criteria, "member_name").regex(member_name);

        criteria = regDateWhere (criteria, "reg_date");

        return criteria;
    }

}
