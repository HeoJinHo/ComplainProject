package com.complain.igex.sv;


import com.complain.igex.model.Dept;
import com.complain.igex.searchData.DeptSearchData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeptSv
{

    Page<Dept> searchAll(Pageable pageable, DeptSearchData searchData);

    Dept insertDept(Dept dept);

    List<Dept> searchDept();

}
