package com.complain.igex.sv;

import com.complain.igex.model.Member;
import com.complain.igex.searchData.MemberSearchData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberSv
{

    Page<Member> searchAll(Pageable pageable, MemberSearchData seachData);

    List<Member> searchList();

    Member selectOne(String id);

    void updateMember(Member member);


}
