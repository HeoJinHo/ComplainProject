package com.complain.igex.repository;

import com.complain.igex.data.Notify;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotifyRepositorty extends MongoRepository<Notify, String>
{

    /**
     * 상위 5개의 데이터를 리턴한다.
     * @param memberID 회원 아이디
     * @return 상위 5 개 데이터
     */
    List<Notify> findTop5ByMemberIDAndConfirmOkOrderByEventDateDesc (String memberID, boolean confirmOk);

    Notify findByNotiId(String id);

    boolean existsByMemberIDAndConfirmOk(String memberID, boolean confirmOk);

}
