package com.complain.igex.searchData;

import com.complain.igex.model.cenum.ComplainState;
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
public class SeachData extends SearchDataForMongo {


    String searchTitle;

    String searchName;

    ComplainState com_state;

    String manageID;

    String dateRange;

    String dept;


    @Override
    public Query makeQuery() {
        return makeQuery(makeCriteria());
    }

    public Criteria makeCriteria() {
        Criteria criteria = new Criteria();

        if (!StringUtils.isEmpty(searchTitle))
            criteria = makeCriteria(criteria, "com_title").regex(searchTitle);

        if (!StringUtils.isEmpty(searchName))
            criteria = makeCriteria(criteria, "com_name").regex(searchName);

        if (com_state != null)
            criteria = makeCriteria(criteria, "com_state").is(com_state);

        if (!StringUtils.isEmpty(manageID))
            criteria = makeCriteria(criteria, "manageID").is(manageID);

        if(!StringUtils.isEmpty(dept))
            criteria = makeCriteria(criteria, "memberInfo.member_dept").is(dept);

        criteria = regDateWhere (criteria, "reg_date");

        return criteria;
    }

}
