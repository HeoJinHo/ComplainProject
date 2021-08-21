package com.complain.igex.sv;

import com.complain.igex.searchData.SearchDataForMongo;
import com.complain.igex.searchData.SearchDataForMongo2;
import com.mongodb.WriteConcernResult;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Update;

import org.springframework.data.mongodb.core.query.Query;
import java.util.List;

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

    /**
     * 검색한 리스트를 리턴한다.
     * @param entityClass 엔트리 클래스
     * @param q 조건
     * @return 검색 리스트
     */
    <T> List<T> getAllList (Class<T> entityClass, Query q);

}
