package com.complain.igex.repository;

import com.complain.igex.model.CommonCode;
import com.complain.igex.model.cenum.UseYn;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommonCodeRepository extends MongoRepository<CommonCode, String>
{
    List<CommonCode> findByUseYn(UseYn useYn);

}
