package com.complain.igex.imp;

import com.complain.igex.searchData.SearchDataForMongo;
import com.complain.igex.sv.MongoSupportSv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoSupportSvImp implements MongoSupportSv
{

    @Autowired
    MongoTemplate mongoTemplate;


    @Override
    public <T> Page<T> makePaging (Class<T> entityClass, Pageable pageable, SearchDataForMongo searchData)
    {
        Query q = searchData.makeQuery ();

        long totalCnt = mongoTemplate.count (q, entityClass);

        q = q.with (pageable);

        List<Sort.Order> orders = searchData.makeOrder ();
        if (orders != null && orders.size () > 0)
            q.with(Sort.by(Sort.Direction.DESC, "reg_date"));
        else {
            pageable.getSort();
            q.with (pageable.getSort ());
        }
        return new PageImpl(mongoTemplate.find (q, entityClass), pageable, totalCnt);
    }

}
