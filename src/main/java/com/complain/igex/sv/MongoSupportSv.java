package com.complain.igex.sv;

import com.complain.igex.searchData.SearchDataForMongo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MongoSupportSv
{

    /**
     * @param entityClass
     * @param pageable
     * @param searchData
     * */
    <T> Page<T> makePaging (Class<T> entityClass, Pageable pageable, SearchDataForMongo searchData);

}
