package com.complain.igex.controller;


import com.complain.igex.model.Dept;
import com.complain.igex.model.Member;
import com.complain.igex.searchData.MemberSearchData;
import com.complain.igex.sv.DeptSv;
import com.complain.igex.sv.MemberSv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/manage")
@RequiredArgsConstructor
public class MemberManageController {

    private final MemberSv memberSv;

    private final DeptSv deptSv;



    @GetMapping("/member")
    public ModelAndView getMember(
            @AuthenticationPrincipal Member member,
            @PageableDefault(size = 10) Pageable pageable,
            MemberSearchData searchData

    )
    {
        ModelAndView mv = new ModelAndView();
        if("ROLE_WORKER".equals(member.getAuth())) {
            Dept one = deptSv.getOne(member.getMember_dept());
            searchData.setMember_dept(one.getId());
        }

        mv.setViewName("manage/member_list");
        mv.addObject("pageType", "setting");
        mv.addObject("searchData", searchData);
        mv.addObject("data", memberSv.searchAll(pageable, searchData));

        return mv;
    }

    @GetMapping("/join")
    public ModelAndView login()
    {
        ModelAndView mv = new ModelAndView();

        mv.setViewName("manage/memberJoinForm");

        return mv;
    }

    @GetMapping("/memberDetail")
    public ModelAndView memberDetail(String id)
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("manage/memberDetail");
        mv.addObject("item", memberSv.selectOne(id));
        return mv;
    }

    @PostMapping("/updateMember")
    public String updateMember(Member member)
    {
        memberSv.updateMember(member);
        return "redirect:/manage/member";
    }






}