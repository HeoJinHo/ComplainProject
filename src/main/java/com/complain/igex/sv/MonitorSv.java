package com.complain.igex.sv;


import com.complain.igex.model.MainMonitor;
import com.complain.igex.searchData.MonitorSearchData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * 설문조사 관리 Sv
 */
public interface MonitorSv {

    /**
     * 설문조사를 검색데이터와 같이 페이징해온다
     * @param pageable 페이징
     * @param seachData 검색조건
     * @return Page<MainMonitor>
     */
    Page<MainMonitor> searchAll(Pageable pageable, MonitorSearchData seachData);

    /**
     * 설문조사를 새로 등록한다.
     * @param monitor
     */
    void mainMonitorInsert(MainMonitor monitor);

    /**
     * 현재 사용중인 설문조사만 조회
     * @return list
     */
    List<MainMonitor> allMonitor();

    /**
     * 설문조사를 삭제한다.
     * @param id
     */
    void monitorDelete(String id);

}
