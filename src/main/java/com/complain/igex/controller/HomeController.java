package com.complain.igex.controller;

import com.complain.igex.sv.ComplainSv;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final ComplainSv complainSv;

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String goHome(HttpServletRequest request, Model model) {
        model.addAttribute("T1", complainSv.getAll());
        model.addAttribute("test", "testModel");
        return "content/home";
    }

    @RequestMapping(value = "/home2", method = RequestMethod.GET)
    public String goHome2(HttpServletRequest request, Model model){
        model.addAttribute("T2", complainSv.getAll());
        return "content/home2";
    }

}