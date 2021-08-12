package com.complain.igex.rest;

import com.complain.igex.repository.MemberRepository;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.ComplainSv;
import com.complain.igex.sv.MemberSv;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Objects;

@org.springframework.web.bind.annotation.RestController
@RequiredArgsConstructor
@RequestMapping("/rest")
public class RestController
{

    private final ComplainSv complainSv;

    @GetMapping("/test")
    public JSONObject tesr(
            @RequestHeader HttpHeaders httpHeaders,
            @PageableDefault(size = 10) Pageable pageable,
            SeachData seachData){
        String tokens = "[e4cf459e-770b-45e3-a86b-76d04d9eae52]";
        System.out.println(Objects.requireNonNull(httpHeaders.get("token")).toString());

        if(tokens.equals(Objects.requireNonNull(httpHeaders.get("token")).toString()))
            System.out.println("test");

        JSONObject json = new JSONObject();

        json.put("result", complainSv.searchAll(pageable, seachData));





        return json;

    }

}
