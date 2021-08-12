package com.complain.igex.common;

import com.complain.igex.model.Member;
import com.complain.igex.repository.MemberRepository;
import com.complain.igex.sv.CommonSv;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Optional;
import java.util.Random;

@Controller
@AllArgsConstructor
public class CommonController {

    private final CommonSv commonSv;

    private final MemberRepository memberRepository;

    @GetMapping("/")
    public String loginPage() {
        return "login/login";
    }


    @GetMapping("/login")
    public String loginPage_secu() {
        return "login/login";
    }

    @PostMapping("/join_form")
    public String join_form(Member member) {
        commonSv.memberInsert(member);
        return "content/home";
//        return "redirect:/login";
    }

    @PostMapping("/joinMember")
    public String joinMember(Member member) {
        commonSv.memberInsert(member);
        return "redirect:manage/member";
    }

    @GetMapping("/log_out")
    public String dispLogOut() {
        return "redirect:/login";
    }

    @GetMapping("/adminSet")
    public String adminSet() {

        Optional<Member> getMember = memberRepository.findById("admin");

        if (getMember.isPresent())
            return "redirect:/login";

        commonSv.adminInsert();

        return "redirect:/login";
    }


    @GetMapping("/authPage")
    public String authPage(@AuthenticationPrincipal Member member) {
        if ("ROLE_ADMIN".equals(member.getAuth()) || "ROLE_WORKER".equals(member.getAuth())) {
            System.out.println("!231231");
            System.out.println(member.getMember_id());
            return "redirect:home2";
//            return "redirect:complain/complainList";
        } else {
//            return "redirect:complain/myComplainList";
            return "redirect:home2";
        }
    }

    @RequestMapping("/phoneAgee")
    @ResponseBody
    public int phoneAgee() {
        Random rd = new Random();

        Integer i = rd.nextInt(9999);

        String format = String.format("%04d", i);


        System.out.println("인증번호는 : [" + format + "] 입니다");
        return Integer.parseInt(format);
    }

}
