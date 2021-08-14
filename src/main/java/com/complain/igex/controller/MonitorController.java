package com.complain.igex.controller;

import com.complain.igex.model.MainMonitor;
import com.complain.igex.searchData.MonitorSearchData;
import com.complain.igex.sv.MonitorSv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MonitorController {

    private final MonitorSv monitorSv;

    public MonitorController(MonitorSv monitorSv) {
        this.monitorSv = monitorSv;
    }

    @RequestMapping("/monitorManage")
    public ModelAndView monitor(
            @PageableDefault(size = 10) Pageable pageable,
            MonitorSearchData seachData
    )
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("monitorManage/monitorList");
        mv.addObject("data", monitorSv.searchAll(pageable, seachData));
        mv.addObject("searchData", seachData);
        mv.addObject("pageType", "setting");
        return mv;
    }


    @GetMapping("/monitor/monitorForm")
    public ModelAndView monitorForm()
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("monitorManage/monitorForm");
        mv.addObject("pageType", "setting");
        return mv;
    }

    @PostMapping("/monitor/monitorInsert")
    public String monitorInsert(MainMonitor monitor)
    {
        monitorSv.mainMonitorInsert(monitor);

        return "redirect:/monitorManage";
    }


    @RequestMapping("/monitorDelete")
    public String monitorDelete(String id)
    {
        monitorSv.monitorDelete(id);
        return "redirect:/monitorManage";
    }


}
