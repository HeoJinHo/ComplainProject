package com.complain.igex.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kakao")
public class KakaoController
{

    @RequestMapping("/login")
    public void kakaoLogin(String code, String state, String error, String error_description){
        System.out.println(code);
        System.out.println(state);
        System.out.println(error);
    }

}
