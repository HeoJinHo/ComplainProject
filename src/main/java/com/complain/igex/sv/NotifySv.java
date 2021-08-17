package com.complain.igex.sv;

import com.complain.igex.data.Notify;
import com.complain.igex.model.Complain;
import com.complain.igex.searchData.AlramSearchData;
import com.complain.igex.searchData.SeachData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotifySv
{

    void insertAlram(String memberID, String title, String body, String id);

    void updateAlram(String memberID, String title, String body, String notiId);

    /**
     * 상위 통지 데이터를 리턴한다.
     * @param memberID 회원 아이디
     * @return 상위 통지 리스트
     */
    List<Notify> getTop5Notify (String memberID);

    void readNotify(String id, String memberID);


    /**
     * 확인하지않은 알림 있는지 조회.
     * @param memberID 회원 ID
     * @return 미확인 알림 유무
     */
    boolean existsNotConfirm (String memberID);


    /**
     * 알람내역을 페이징을 한다.
     * @param pageable 페이징
     * @param seachData 검색조건
     * @return Page<Notify>
     */
    Page<Notify> searchAll(Pageable pageable, AlramSearchData seachData);


    void readUpdate(String id);

}
