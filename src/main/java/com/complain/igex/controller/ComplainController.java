package com.complain.igex.controller;

import com.complain.igex.model.Complain;
import com.complain.igex.model.Member;
import com.complain.igex.model.cenum.ComplainState;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.ComplainSv;
import com.complain.igex.sv.MonitorSv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
@Controller
@RequestMapping("/complain")
public class ComplainController {

    private final ComplainSv complainSv;

    private final MonitorSv monitorSv;

    public ComplainController(ComplainSv complainSv, MonitorSv monitorSv) {
        this.complainSv = complainSv;
        this.monitorSv = monitorSv;
    }


    @GetMapping("/myComplainList")
    public ModelAndView myComplainList(
            @AuthenticationPrincipal Member member,
            @PageableDefault(size = 10) Pageable pageable,
            SeachData seachData
    ) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("complain/complainList");
        seachData.setManageID(member.getMember_id());
        mv.addObject("data", complainSv.searchAll(pageable, seachData));
        mv.addObject("searchData", seachData);
        mv.addObject("pageType", "complain");

        SeachData setTotal = new SeachData();
        setTotal.setManageID(member.getMember_id());

        totalDataInit(mv, setTotal);

        return mv;
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_WORKER')")
    @GetMapping("/complainList")
    public ModelAndView complainList
            (
                    @AuthenticationPrincipal Member member,
                    @PageableDefault(size = 10) Pageable pageable,
                    SeachData seachData
            ) {
        ModelAndView mv = new ModelAndView();

        //토탈 검색용
        SeachData setSearchData = new SeachData();
        mv.setViewName("complain/complainList");
        if ("ROLE_WORKER".equals(member.getAuth())) {
            seachData.setDept(member.getMember_dept());
            setSearchData.setDept(member.getMember_dept());
        }

        mv.addObject("data", complainSv.searchAll(pageable, seachData));
        mv.addObject("searchData", seachData);
        mv.addObject("pageType", "complain");




        totalDataInit(mv, setSearchData);
        return mv;
    }

    /**
     * 전체 데이터 토탈을 위해 조회
     *
     * @param mv
     * @param setTotal
     */
    private void totalDataInit(ModelAndView mv, SeachData setTotal) {
        List<Complain> complains = complainSv.searchNonePageable(setTotal);
        HashMap<String, Long> totalData = new HashMap<>();
        totalData.put("totalCount", (long) complains.size());

        Map<ComplainState, Long> collect = complains.stream().collect(Collectors.groupingBy(Complain::getCom_state, Collectors.counting()));


        Long request_int = collect.get(ComplainState.REQUEST);
        Long approve_int = collect.get(ComplainState.APPROVE);
        Long complete_int = collect.get(ComplainState.COMPLETE);
        Long reject_int = collect.get(ComplainState.REJECT);


        totalData.put("requestCount", (request_int == null) ? 0 : request_int);
        totalData.put("approveCount", (approve_int == null) ? 0 : approve_int);
        totalData.put("completeCount", (complete_int == null) ? 0 : complete_int);
        totalData.put("rejectCount", (reject_int == null) ? 0 : reject_int);
        mv.addObject("totalData", totalData);
    }

    @GetMapping("/complainDetail")
    public ModelAndView complainDetail(String id) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("complain/complainDetail");
        mv.addObject("data", complainSv.findOne(id));
        mv.addObject("pageType", "complain");
        mv.addObject("monitorList", monitorSv.allMonitor());
        return mv;
    }

    @GetMapping("/complainForm")
    public ModelAndView complainForm() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("complain/complainForm");
        mv.addObject("pageType", "complain");
        return mv;
    }

    @PostMapping("/complainInsert")
    public String complainInsert(Complain complain) {

        complainSv.complainInsertSv(complain);

        return "redirect:/complain/complainList";
    }

    @PostMapping("/myComplainInsert")
    public String myComplainInsert(Complain complain) {

        complainSv.complainInsertSv(complain);

        return "redirect:/complain/myComplainList";
    }


    @PostMapping("/complainState")
    public String complainState(@AuthenticationPrincipal Member member, Complain complain) {
        System.out.println(complain.getMonitors());

        String rtn = "redirect:/complain/complainDetail?id=" + complain.getId();
        if (!member.getAuth().equals("ROLE_ADMIN"))
            rtn = "redirect:/complain/myComplainDetail?id=" + complain.getId();

        complainSv.complainStateUpdate(complain, member.getMember_id());
        return rtn;
    }


    @GetMapping("/myComplainDetail")
    public ModelAndView myComplainDetail(String id) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("complain/myComplainDetail");
        mv.addObject("data", complainSv.findOne(id));
        mv.addObject("pageType", "complain");
        return mv;
    }


    @GetMapping("/complainDelete")
    public String complainDelete(String id) {
        complainSv.complainDelete(id);
        return "redirect:/complain/complainList";
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_WORKER')")
    @GetMapping("/homes")
    public ModelAndView homes
            (
                    @AuthenticationPrincipal Member member,
                    @PageableDefault(size = 10) Pageable pageable,
                    SeachData seachData
            ) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("content/home2");
        if ("ROLE_WORKER".equals(member.getAuth()))
            seachData.setDept(member.getMember_dept());

        mv.addObject("data", complainSv.searchAll(pageable, seachData));
        mv.addObject("searchData", seachData);
        mv.addObject("pageType", "complain");

        if ("ROLE_WORKER".equals(member.getAuth()))
            seachData.setDept(member.getMember_dept());

        totalDataInit(mv, seachData);
        return mv;
    }


    @GetMapping("/complainFormPopUp")
    public ModelAndView complainFormPopUp() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("complain/complainFormPopUp");
        return mv;
    }


}
