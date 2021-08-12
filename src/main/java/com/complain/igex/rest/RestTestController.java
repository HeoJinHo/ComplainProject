package com.complain.igex.rest;

import com.complain.igex.data.ApiResult;
import com.complain.igex.model.Member;
import com.complain.igex.repository.MemberRepository;
import com.complain.igex.searchData.MemberSearchData;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.ComplainSv;
import com.complain.igex.sv.MemberSv;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.util.Pair;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * RestApi Test Controller
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/rest")
public class RestTestController
{

    private final ComplainSv complainSv;

    private final MemberSv memberSv;

    private final MemberRepository memberRepository;

    @GetMapping("/test")
    public JSONObject tesr(
            @RequestHeader HttpHeaders httpHeaders,
            @PageableDefault(size = 10) Pageable pageable,
            SeachData seachData,
            MemberSearchData memberSearchData){
        String tokens = "[e4cf459e-770b-45e3-a86b-76d04d9eae52]";

        HashMap<String, Object> map = new HashMap<>();

        if(tokens.equals(Objects.requireNonNull(httpHeaders.get("token")).toString())) {
            map.put("member", memberSv.searchAll(pageable, memberSearchData));
            map.put("result", complainSv.searchAll(pageable, seachData));
        }else{
            map.put("result", "TokenError");
        }
        return new JSONObject(map);


    }

    @GetMapping("/test1")
    public JSONObject test22(String id, String name){
        HashMap<String, Object> map = new HashMap<>();

        memberRepository.findById(id);

        map.put("result1", id);
        map.put("result2", name);
        map.put("result3", memberRepository.findById(id));
        map.put("result4", "tt2tutti12");
        map.put("result5", "tutti2tt12");
        map.put("pTest", Pair.of(1, 4));

        return new JSONObject(map);
    }


    @GetMapping("/test2")
    public ApiResult test2233(){
        Map<String, Pair<Integer, Integer>> map = new HashMap<>();
        map.put("pTest", Pair.of(1, 4));
        return new ApiResult(true, "성공", Pair.of(1, 4));
    }


    @GetMapping("/test3")
    public Page<Member> pagingMember(
            @PageableDefault(size = 10) Pageable pageable,
            MemberSearchData memberSearchData
    )
    {
        return memberSv.searchAll(pageable, memberSearchData);
    }

}
