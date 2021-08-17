package com.complain.igex.controller;

import com.complain.igex.data.Notify;
import com.complain.igex.model.Member;
import com.complain.igex.result.ApiOneDataResult;
import com.complain.igex.result.AppResult;
import com.complain.igex.searchData.AlramSearchData;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.NotifySv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("/alarm")
public class AlarmController
{

    private final NotifySv notifySv;

    @RequestMapping("/top5")
    @ResponseBody
    public ApiOneDataResult top5(@AuthenticationPrincipal Member member){
        ApiOneDataResult result = new ApiOneDataResult();

        List<Notify> notifyList = notifySv.getTop5Notify(member.getMember_id());

        List<Map<String, Object>> top5List = notifyList.stream().map(notify -> {
            Map<String, Object> map = new HashMap<>();
            map.put("content", "<p>"+notify.getTitle()+"</p>");
            map.put("notify", notify);
            return map;
        }).collect(Collectors.toList());

        result.success("", top5List);
        System.out.println(result);
        return result;
    }


    /**
     * 미확인 알림 유무 조회
     * @param member security user
     * @return 결과
     */
    @GetMapping("/existNotConfirm")
    @ResponseBody
    public ApiOneDataResult<Boolean> existNotConfirm(
            @AuthenticationPrincipal Member member
    ) {
        return new ApiOneDataResult<>(notifySv.existsNotConfirm(member.getMember_id()));
    }


    @GetMapping("/list")
    public ModelAndView alramList
            (
                    @AuthenticationPrincipal Member member,
                    @PageableDefault(size = 10) Pageable pageable,
                    AlramSearchData seachData
            ) {

        ModelAndView mv = new ModelAndView();
        mv.setViewName("content/alramList");
        seachData.setMemberID(member.getMember_id());
        mv.addObject("data", notifySv.searchAll(pageable, seachData));

        return mv;
    }

    @PostMapping("/readAlram")
    @ResponseBody
    public AppResult readAlram(@AuthenticationPrincipal Member member, @RequestParam("idArr[]") List<String> idList){
        idList.forEach(notifySv::readUpdate);
        return AppResult.createSuccess("읽음처리 되었습니다.");
    }


}
