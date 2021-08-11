package com.complain.igex.sv;

import com.complain.igex.model.Complain;
import com.complain.igex.searchData.SeachData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ComplainSv
{

    /**
     * 민원관리 페이징을 한다.
     * @param pageable 페이징
     * @param seachData 검색조건
     * @return Page<Complain>
     */
    Page<Complain> searchAll(Pageable pageable, SeachData seachData);

    List<Complain> searchNonePageable(SeachData seachData);



    /**
     * 민원 상세 보기.
     * @param id (민원 ObjectId)
     * @return Optional<Complain>
     */
    Optional<Complain> findOne(String id);

    /**
     * 민원을 등록한다.
     * @param complain
     */
    void complainInsertSv(Complain complain);

    Complain getComplain(String id);

    void complainStateUpdate(Complain complain, String memberID);

    void complainDelete(String id);

}
