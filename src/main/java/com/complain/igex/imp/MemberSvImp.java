package com.complain.igex.imp;


import com.complain.igex.model.Member;
import com.complain.igex.repository.MemberRepository;
import com.complain.igex.searchData.MemberSearchData;
import com.complain.igex.sv.MemberSv;
import com.complain.igex.sv.MongoSupportSv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberSvImp implements MemberSv {

    private final MongoTemplate mongoTemplate;

    private final MemberRepository mongoRepository;

    private final MongoSupportSv mongoSupportSv;


    public Page<Member> searchAll(Pageable pageable, MemberSearchData seachData)
    {
        Page<Member> memberList = mongoSupportSv.makePaging(Member.class, pageable, seachData);
        return memberList;
    }

    public List<Member> searchList()
    {
        return mongoRepository.findAll();
    }

    public Member selectOne(String id)
    {
        return mongoTemplate.findById(id, Member.class);
    }

    public void updateMember(Member member)
    {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if(!StringUtils.isEmpty(member.getModifiy_pwd()))
            member.setMember_pwd(passwordEncoder.encode(member.getModifiy_pwd()));
        mongoRepository.save(member);
    }

}