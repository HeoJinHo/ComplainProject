package com.complain.igex.controller;

import com.complain.igex.model.CommonCode;
import com.complain.igex.searchData.CommonCodeSearchData;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.CommonCodeSv;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@AllArgsConstructor
@RequestMapping("/common")
public class CommonCodeController {


    private final CommonCodeSv commonCodeSv;

    @GetMapping("/codeList")
    public ModelAndView codeList(
            @PageableDefault(size = 10) Pageable pageable,
            CommonCodeSearchData searchData
    ){
        ModelAndView mv = new ModelAndView();


        mv.setViewName("commonCode/codeList");
        mv.addObject("data", commonCodeSv.getAll(pageable, searchData));
        mv.addObject("searchData", searchData);
        mv.addObject("pageType", "setting");

        return mv;
    }


    @GetMapping("/codeForm")
    public ModelAndView codeForm(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("commonCode/codeForm");
        return mv;
    }

    @PostMapping("/codeForm")
    public String codeSave(CommonCode commonCode){
        commonCodeSv.codeInsert(commonCode);
        return "redirect:/common/codeList";
    }


}
