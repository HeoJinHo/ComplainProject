package com.complain.igex.imp;


import com.complain.igex.model.MainMonitor;
import com.complain.igex.model.cenum.UseYn;
import com.complain.igex.repository.MonitorRepostitory;
import com.complain.igex.searchData.MonitorSearchData;
import com.complain.igex.sv.MongoSupportSv;
import com.complain.igex.sv.MonitorSv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MonitorSvImp implements MonitorSv
{

    private final MonitorRepostitory mongoRepository;
    private final MongoSupportSv mongoSupportSv;
    private final MongoTemplate mongoTemplate;

    /**
     * 설문조사를 검색데이터와 같이 페이징해온다
     * @param pageable 페이징
     * @param seachData 검색조건
     * @return Page<MainMonitor>
     */
    @Override
    public Page<MainMonitor> searchAll(Pageable pageable, MonitorSearchData seachData) {
        return mongoSupportSv.makePaging(MainMonitor.class, pageable, seachData);
    }

    /**
     * 설문조사를 새로 등록한다.
     * @param monitor
     */
    @Override
    public void mainMonitorInsert(MainMonitor monitor){
        monitor.setReg_date(new Date());
        mongoRepository.save(monitor);
    }


    /**
     * 현재 사용중인 설문조사만 조회
     * @return list
     */
    @Override
    public List<MainMonitor> allMonitor()
    {
        return mongoRepository.findByUseYn(UseYn.USE);
    }


    /**
     * 설문조사를 삭제한다.
     * @param id
     */
    @Override
    public void monitorDelete(String id)
    {
        mongoRepository.deleteById(id);
    }

}
