package com.complain.igex.searchData;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.thymeleaf.util.StringUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

/**
 * Created by RED on 2016-07-06.
 */
@Setter
@Getter
@ToString
@Accessors(chain = true)
public class SearchDataForMongo
{
    /**
     * 시작일
     */
    private String startDate;

    /**
     * 종료일
     */
    private String endDate;

    /**
     * 키워드
     */
    private String keyword;

    /**
     * 정렬값
     */
    private String orderVal = "reg_date";

    /**
     * 정렬항목
     */
    private boolean orderAsc;

    /**
     * 시작 순번
     */
    private int limitStart;

    /**
     * 종료 순번
     */
    private int limitEnd;

    /**
     * 정렬 조건
     */
    @JsonIgnore
    private List<Sort.Order> orders;

    public SearchDataForMongo ()
    {
        orders = new ArrayList<>();
    }

    public Query makeQuery ()
    {
        return makeQuery (null);
    }

    protected Query makeQuery (Criteria criteria)
    {
        return criteria != null ? query (criteria) : new Query ();
    }

    public Criteria makeCriteria() {
        return new Criteria();
    }

    protected Criteria makeCriteria (Criteria initCriteria, String field)
    {
        Criteria criteria;

        if (initCriteria == null)
            criteria = where (field);
        else
            criteria = initCriteria.and (field);

        return criteria;
    }

    public List<Sort.Order> makeOrder ()
    {
        return makeOrder (null);
    }

    public List<Sort.Order> makeOrder (Sort.Order defaultOrder)
    {
        if (orders.size () > 0)
            return orders;

        if (!StringUtils.isEmpty (getOrderVal ()))
        {
            if (getOrderVal ().contains (","))
            {
                String [] orderStrs = getOrderVal ().split (",");

                Arrays.stream (orderStrs).forEach ((o) -> {
                    if (o.endsWith ("_DESC"))
                        orders.add (new Sort.Order(Sort.Direction.DESC, o.substring (0, o.length () - 5)));
                    else
                        orders.add (new Sort.Order(Sort.Direction.ASC, o));
                });
            }
            else
            {
                orders.add (new Sort.Order(isOrderAsc () ? Sort.Direction.ASC : Sort.Direction.DESC, getOrderVal ()));
            }
        }
        else
        {
            if (defaultOrder != null)
                orders.add (defaultOrder);
        }

        return orders;
    }

    /**
     * 등록일 검색 로직
     * @param criteria 검색 조건
     * @return 설정된 검색 조건
     */
    protected Criteria regDateWhere(Criteria criteria)
    {
        return regDateWhere (criteria, "reg_date");
    }




    protected Criteria modDateWhere(Criteria criteria)
    {
        return regDateWhere (criteria, "reg_date");
    }

    /**
     * 등록일 검색 로직
     * @param criteria 검색 조건
     * @return 설정된 검색 조건
     */
    protected Criteria  simpleRegDateWhere(Criteria criteria)
    {
        return regDateWhere (criteria, "reg_date");
    }

    /**
     * 해당일 검색 로직
     * @param criteria 검색 조건
     * @param fieldName 검색 필드
     * @return 설정된 검색 조건
     */
    public Criteria regDateWhere(Criteria criteria, String fieldName)
    {
        try
        {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            if (!StringUtils.isEmpty(getStartDate()) && !StringUtils.isEmpty(getEndDate()))
            {
                criteria = makeCriteria(criteria, fieldName).gte(df.parse(getStartDate() + " 00:00:00")).lte(df.parse(getEndDate() + " 23:59:59"));
            }
            else if (!StringUtils.isEmpty(getStartDate()))
            {
                criteria = makeCriteria(criteria, fieldName).gte(df.parse(getStartDate() + " 00:00:00"));
            }
            else if (!StringUtils.isEmpty(getEndDate()))
            {
                criteria = makeCriteria(criteria, fieldName).lte(df.parse(getEndDate() + " 23:59:59"));
            }

        }catch (ParseException e) {
            e.printStackTrace();
        }

        return criteria;
    }

    /**
     * 해당일 검색 로직
     * @param criteria 검색 조건
     * @param fieldName 검색 필드
     * @return 설정된 검색 조건
     */
    public Criteria regDateStrWhere(Criteria criteria, String fieldName)
    {
        if (!StringUtils.isEmpty(getStartDate()) && !StringUtils.isEmpty(getEndDate()))
        {
            criteria = makeCriteria(criteria, fieldName).gte(getStartDate()).lte(getEndDate());
        }
        else if (!StringUtils.isEmpty(getStartDate()))
        {
            criteria = makeCriteria(criteria, fieldName).gte(getStartDate());
        }
        else if (!StringUtils.isEmpty(getEndDate()))
        {
            criteria = makeCriteria(criteria, fieldName).lte(getEndDate());
        }

        return criteria;
    }


    protected Criteria dateSearch(Criteria criteria, String fieldName, String startDate, String endDate)
    {

        try
        {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            if (!StringUtils.isEmpty (startDate) && !StringUtils.isEmpty (endDate))
            {
                criteria = makeCriteria(criteria, fieldName).gte(df.parse(startDate + " 00:00:00")).lte(df.parse(endDate + " 23:59:59"));
            }
            else if (!StringUtils.isEmpty (startDate))
            {
                criteria = makeCriteria(criteria, fieldName).gte(df.parse(startDate + " 00:00:00"));
            }
            else if (!StringUtils.isEmpty (endDate))
            {
                criteria = makeCriteria(criteria, fieldName).lte(df.parse(endDate + " 23:59:59"));
            }

        }catch (ParseException e) {
            e.printStackTrace();
        }

        return criteria;
    }

    protected Criteria dateSearchStr(Criteria criteria, String fieldName, String startDate, String endDate, Function<String, String> convert)
    {
        if (convert == null)
            convert = (a) -> a;


        if (!StringUtils.isEmpty (startDate) && !StringUtils.isEmpty (endDate))
            criteria = makeCriteria(criteria, fieldName).gte(convert.apply (startDate)).lte(convert.apply (endDate));
        else if (!StringUtils.isEmpty (startDate))
            criteria = makeCriteria(criteria, fieldName).gte(convert.apply (startDate));
        else if (!StringUtils.isEmpty (endDate))
            criteria = makeCriteria(criteria, fieldName).lte(convert.apply (endDate));

        return criteria;
    }

    public void defaultOrder (String orderVal)
    {
        if (StringUtils.isEmpty (getOrderVal ()))
        {
            setOrderVal (orderVal);
            setOrderAsc (false);
        }
    }

}