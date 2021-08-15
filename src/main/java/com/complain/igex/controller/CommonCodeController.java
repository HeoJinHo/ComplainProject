package com.complain.igex.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@AllArgsConstructor
@RequestMapping("/common")
public class CommonCodeController {


    @GetMapping("/codeList")
    public ModelAndView codeList(){
        ModelAndView mv = new ModelAndView();



        return mv;
    }

}
