package com.complain.igex.imp;

import com.complain.igex.model.CommonCode;
import com.complain.igex.model.Complain;
import com.complain.igex.model.cenum.UseYn;
import com.complain.igex.repository.CommonCodeRepository;
import com.complain.igex.searchData.CommonCodeSearchData;
import com.complain.igex.sv.CommonCodeSv;
import com.complain.igex.sv.MongoSupportSv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonCodeSvImp implements CommonCodeSv
{


    private final CommonCodeRepository repository;

    private final MongoSupportSv mongoSupportSv;


    @Override
    public Page<CommonCode> getAll(Pageable pageable, CommonCodeSearchData searchData) {
        return mongoSupportSv.makePaging(CommonCode.class, pageable, searchData);
    }

    @Override
    public List<CommonCode> getListAll() {
        return repository.findByUseYn(UseYn.USE);
    }

    @Override
    public void codeInsert(CommonCode commonCode) {
        commonCode.setReg_date(new Date());
        repository.insert(commonCode);
    }
}
