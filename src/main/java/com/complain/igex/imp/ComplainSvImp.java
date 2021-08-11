package com.complain.igex.imp;

import com.complain.igex.model.Complain;
import com.complain.igex.repository.ComplainRepository;
import com.complain.igex.sv.ComplainSv;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Lazy
public class ComplainSvImp implements ComplainSv
{
    private final ComplainRepository complainRepository;


    @Override
    public List<Complain> getAll(){
        return complainRepository.findAll();
    }

}
