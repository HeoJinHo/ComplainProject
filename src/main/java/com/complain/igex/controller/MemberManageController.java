package com.complain.igex.controller;


import com.complain.igex.model.Member;
import com.complain.igex.searchData.MemberSearchData;
import com.complain.igex.sv.MemberSv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/manage")
public class MemberManageController {

    private final MemberSv memberSv;

    public MemberManageController(MemberSv memberSv) {
        this.memberSv = memberSv;
    }


    @GetMapping("/member")
    public ModelAndView getMember(
            @PageableDefault(size = 10) Pageable pageable,
            MemberSearchData searchData

    )
    {
        ModelAndView mv = new ModelAndView();
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