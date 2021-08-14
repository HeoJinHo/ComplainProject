package com.complain.igex.controller;

import com.complain.igex.model.Dept;
import com.complain.igex.searchData.DeptSearchData;
import com.complain.igex.sv.DeptSv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/dept")
public class DeptController
{
    private final DeptSv deptSv;


    public DeptController(DeptSv deptSv) {
        this.deptSv = deptSv;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/deptList")
    public ModelAndView deptList
            (
                    @PageableDefault(size = 10) Pageable pageable,
                    DeptSearchData searchData
            )
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("manage/deptList");
        mv.addObject("data", deptSv.searchAll(pageable, searchData));
        mv.addObject("pageType", "setting");
        mv.addObject("searchData", searchData);
        return mv;
    }

    @GetMapping("/deptForm")
    public ModelAndView deptForm()
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("manage/deptForm");
        mv.addObject("pageType", "setting");
        return mv;
    }

    @PostMapping("/deptForm")
    public String deptInsert(Dept dept)
    {
        deptSv.insertDept(dept);

        return "redirect:/dept/deptList";
    }

}
