package com.complain.igex.imp;

import com.complain.igex.model.Member;
import com.complain.igex.model.cenum.MemberState;
import com.complain.igex.sv.CommonSv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommonSvImp implements CommonSv {

    @Autowired
    MongoTemplate mongoTemplate;


    public Member memberInsert(Member member)
    {
        member.setState(MemberState.REQUEST);
        member.setAuth("ROLE_USER");
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setMember_pwd(passwordEncoder.encode(member.getMember_pwd()));
        mongoTemplate.insert(member);
        return member;
    }


    public Member adminInsert()
    {
        Member member = new Member();
        member.setState(MemberState.REQUEST);
        member.setAuth("ROLE_ADMIN");
        member.setMember_id("admin");
        member.setMember_name("관리자");
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setMember_pwd(passwordEncoder.encode("admin"));
        mongoTemplate.insert(member);
        return member;
    }

}