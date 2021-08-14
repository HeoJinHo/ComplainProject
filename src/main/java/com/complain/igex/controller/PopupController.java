package com.complain.igex.controller;


import com.complain.igex.repository.ComplainMoveHisRepository;
import com.complain.igex.sv.DeptSv;
import com.complain.igex.sv.MemberSv;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/dialog")
public class PopupController {

    private final MemberSv memberSv;
    public PopupController(MemberSv memberSv, ComplainMoveHisRepository complainMoveHisRepository, DeptSv deptSv) {
        this.memberSv = memberSv;
        this.complainMoveHisRepository = complainMoveHisRepository;
        this.deptSv = deptSv;
    }

    private final ComplainMoveHisRepository complainMoveHisRepository;
    private final DeptSv deptSv;


    @RequestMapping("/userPopup")
    public ModelAndView userPopup()
    {
        ModelAndView mv = new ModelAndView();

        mv.addObject("list", memberSv.searchList());

        mv.setViewName("dialog/userPopup");

        return mv;
    }

    @RequestMapping("/moveHis")
    public ModelAndView moveHis(String id)
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("dialog/hisPopup");
        mv.addObject("list", complainMoveHisRepository.findByComplainID(id));

        return mv;
    }

    @RequestMapping("/dept")
    public ModelAndView deptList()
    {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("dialog/deptPopup");
        mv.addObject("list", deptSv.searchDept());
        return mv;
    }

}