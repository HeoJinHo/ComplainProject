package com.complain.igex.repository;

import com.complain.igex.model.MainMonitor;
import com.complain.igex.model.cenum.UseYn;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MonitorRepostitory extends MongoRepository<MainMonitor, String> {

    List<MainMonitor> findByUseYn(UseYn useYn);

}
