package com.complain.igex.imp;

import com.complain.igex.data.Notify;
import com.complain.igex.model.CommonCode;
import com.complain.igex.model.Complain;
import com.complain.igex.model.ComplainMoveHis;
import com.complain.igex.model.cenum.ComplainState;
import com.complain.igex.repository.CommonCodeRepository;
import com.complain.igex.repository.ComplainMoveHisRepository;
import com.complain.igex.repository.ComplainRepository;
import com.complain.igex.repository.NotifyRepositorty;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.ComplainSv;
import com.complain.igex.sv.MemberSv;
import com.complain.igex.sv.MongoSupportSv;
import com.complain.igex.sv.NotifySv;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ComplainSvImp implements ComplainSv {

    private final MongoTemplate mongoTemplate;

    private final ComplainRepository mongoRepository;

    private final ComplainMoveHisRepository complainMoveHisRepository;

    private final MongoSupportSv mongoSupportSv;

    private final MemberSv memberSv;

    private final CommonCodeRepository repository;

    private final NotifySv notifySv;

    @Override
    public Page<Complain> searchAll(Pageable pageable, SeachData seachData) {
        return mongoSupportSv.makePaging(Complain.class, pageable, seachData);
    }

    @Override
    public List<Complain> searchNonePageable(SeachData seachData){
        Query q = seachData.makeQuery ();
        return mongoTemplate.find(q, Complain.class);
    }


    @Override
    public Optional<Complain> findOne(String id)
    {
        return mongoRepository.findById(id) ;
    }

    public void complainInsertSv(Complain complain)
    {
        complain.setCom_state(ComplainState.REQUEST);
        complain.setReg_date(new Date());

        Optional<CommonCode> commonCode = repository.findById(complain.getCommonCode());


        if (commonCode.isPresent()) {
            complain.setManageID(commonCode.get().getUserID());
            complain.setManageName(commonCode.get().getUserName());
            complain.setMemberInfo(memberSv.selectOne(commonCode.get().getUserID()));

        }

        Complain insert = mongoTemplate.insert(complain);

        commonCode.ifPresent(code -> notifySv.insertAlram(code.getUserID(), "민원이 등록되었습니다.", complain.getCom_title(), insert.getId()));


    }



    @Override
    public void complainStateUpdate(Complain complain, String memberID)
    {
        Optional<Complain> bfComplain = mongoRepository.findById(complain.getId());
        String bfMember = bfComplain.get().getManageID();
        String dfMemberNm = bfComplain.get().getManageName();
        complain.setReg_date(bfComplain.get().getReg_date());
        complain.setMemberInfo(memberSv.selectOne(bfComplain.get().getManageID()));

        if (complain.getManageID() != null) {

            bfMember = Optional.ofNullable(bfMember).orElseGet(()->"");

            if (!bfMember.equals(complain.getManageID())){
                complain.setMemberInfo(memberSv.selectOne(complain.getManageID()));
                updateHis(complain, memberID, bfMember, dfMemberNm);
                System.out.println(complain.getManageID());
                notifySv.updateAlram(complain.getManageID(), "민원이관", complain.getCom_title(), complain.getId());
            }
        }
        mongoRepository.save(complain);

    }


    /**
     * 담당자 변경 이력 등록
     * @param complain 민원데이터
     * @param memberID 변경이력 등록자
     * @param bfMember 변경전 담당자
     * @param dfMemberNm 변경전 담당자명
     */
    private void updateHis(Complain complain, String memberID, String bfMember, String dfMemberNm) {
        ComplainMoveHis complainMoveHis = new ComplainMoveHis();
        complainMoveHis.setComplainID(complain.getId());
        complainMoveHis.setBfMemberID(bfMember);
        complainMoveHis.setBfMemberNm(dfMemberNm);
        complainMoveHis.setAfMemberID(complain.getManageID());
        complainMoveHis.setAfMemberNm(complain.getManageName());
        complainMoveHis.setMoveDate(new Date());
        complainMoveHis.setMoveMemeberID(memberID);
        complainMoveHisRepository.save(complainMoveHis);
    }

    /**
     *
     * @param id ObjectID
     * @return Optional
     */
    public Complain getComplain(String id)
    {
        return mongoTemplate.findById(id, Complain.class);
    }


    public void complainDelete(String id)
    {
        mongoRepository.deleteById(id);
    }

}