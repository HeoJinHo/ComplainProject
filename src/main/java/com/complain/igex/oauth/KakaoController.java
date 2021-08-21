package com.complain.igex.oauth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/kakao")
public class KakaoController
{

    @GetMapping("/login")
    public String kakaoLogin(){
        return "";
    }

}
