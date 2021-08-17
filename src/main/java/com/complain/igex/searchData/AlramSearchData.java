package com.complain.igex.searchData;

import com.complain.igex.model.cenum.UseYn;
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
public class AlramSearchData extends SearchDataForMongo2
{

    String memberID;


    @Override
    public Query makeQuery() {
        return makeQuery(makeCriteria());
    }

    public Criteria makeCriteria() {
        Criteria criteria = new Criteria();

        if (!StringUtils.isEmpty(memberID))
            criteria = makeCriteria(criteria, "memberID").regex(memberID);


        criteria = regDateWhere (criteria, "eventDate");

        return criteria;
    }

}
