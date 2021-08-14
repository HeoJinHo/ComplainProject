package com.complain.igex.imp;


import com.complain.igex.model.Dept;
import com.complain.igex.repository.DeptRepository;
import com.complain.igex.searchData.DeptSearchData;
import com.complain.igex.sv.DeptSv;
import com.complain.igex.sv.MongoSupportSv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeptSvImp implements DeptSv
{
    private final MongoSupportSv mongoSupportSv;

    private final DeptRepository deptRepository;

    private final MongoTemplate mongoTemplate;

    @Override
    public Page<Dept> searchAll(Pageable pageable, DeptSearchData searchData)
    {
        return mongoSupportSv.makePaging(Dept.class, pageable, searchData);
    }


    @Override
    public Dept insertDept(Dept dept)
    {
        dept.setReg_date(new Date());

        return deptRepository.save(dept);
    }


    @Override
    public List<Dept> searchDept()
    {
        return mongoTemplate.findAll(Dept.class);
    }
}
