package com.complain.igex.sv;

import com.complain.igex.model.CommonCode;
import com.complain.igex.searchData.CommonCodeSearchData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommonCodeSv
{

    Page<CommonCode> getAll(Pageable pageable, CommonCodeSearchData searchData);

    List<CommonCode> getListAll();

    void codeInsert(CommonCode commonCode);

    void codeChangeState(String id, String state);

}
