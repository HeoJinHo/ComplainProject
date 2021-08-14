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


    /**
     * 로그인 - 페이지 이동
     * @return
     */
    @GetMapping("/login")
    public String loginPage_secu() {
        return "login/login";
    }

    @PostMapping("/join_form")
    public String join_form(Member member) {
        commonSv.memberInsert(member);
//        return "content/home";
        return "redirect:login";
    }

    /**
     * 회원가입  - 현재 사용 안함
     * @param member
     * @return
     */
    @PostMapping("/joinMember")
    public String joinMember(Member member) {
        commonSv.memberInsert(member);
        return "redirect:manage/member";
    }

    /**
     * 로그아웃
     * @return
     */
    @GetMapping("/log_out")
    public String dispLogOut() {
        return "redirect:/login";
    }

    /**
     * 시스템 초기 도입시
     * 관리자 데이터 생성
     * @return redirect
     */
    @GetMapping("/adminSet")
    public String adminSet() {

        Optional<Member> getMember = memberRepository.findById("admin");

        if (getMember.isPresent())
            return "redirect:/login";

        commonSv.adminInsert();

        return "redirect:/login";
    }

    /**
     * 권한별 첫 페이지를 정한다.
     * @param member
     * @return String page
     */
    @GetMapping("/authPage")
    public String authPage(@AuthenticationPrincipal Member member) {
        if ("ROLE_ADMIN".equals(member.getAuth()) || "ROLE_WORKER".equals(member.getAuth())) {
            return "redirect:complain/complainList";
        } else {
            return "redirect:complain/complainList";
//            return "redirect:home2";
        }
    }

    /**
     * 핸드폰 인증번호 랜덤 생성
     * @return
     */
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
