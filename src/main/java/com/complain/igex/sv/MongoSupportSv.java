package com.complain.igex.sv;

import com.complain.igex.searchData.SearchDataForMongo;
import com.complain.igex.searchData.SearchDataForMongo2;
import com.mongodb.WriteConcernResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Update;

import javax.management.Query;

public interface MongoSupportSv
{

    /**
     * @param entityClass
     * @param pageable
     * @param searchData
     * */
    <T> Page<T> makePaging (Class<T> entityClass, Pageable pageable, SearchDataForMongo searchData);
    /**
     * @param entityClass
     * @param pageable
     * @param searchData
     * */
    <T> Page<T> makePaging2 (Class<T> entityClass, Pageable pageable, SearchDataForMongo2 searchData);



}
