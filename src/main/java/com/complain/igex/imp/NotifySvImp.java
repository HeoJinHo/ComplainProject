package com.complain.igex.imp;

import com.complain.igex.data.Notify;
import com.complain.igex.model.Complain;
import com.complain.igex.repository.NotifyRepositorty;
import com.complain.igex.searchData.AlramSearchData;
import com.complain.igex.searchData.SeachData;
import com.complain.igex.sv.MongoSupportSv;
import com.complain.igex.sv.NotifySv;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotifySvImp implements NotifySv
{

    private final NotifyRepositorty repositorty;

    private final MongoSupportSv mongoSupportSv;

    @Override
    public void insertAlram(String memberID, String title, String body, String id) {
        Notify notify = new Notify();

        notify.setMemberID(memberID);
        notify.setConfirmOk(false);
        notify.setTitle(title);
        notify.setBody(body);
        notify.setNotiId(id);
        notify.setEventDate(new Date());

        repositorty.save(notify);
    }

    @Override
    public void updateAlram(String memberID, String title, String body, String notiId) {
        Notify notify = repositorty.findByNotiId(notiId);
        Optional<Notify> byId = repositorty.findById(notify.getId());
        byId.ifPresent(notify1 ->{
            Notify notify2 = new Notify();
            notify2.setId(notify1.getId());
            notify2.setTitle(title);
            notify2.setBody(body);
            notify2.setConfirmOk(false);
            notify2.setEventDate(new Date());
            notify2.setNotiId(notify1.getNotiId());
            notify2.setMemberID(memberID);
            System.out.println(notify2.toString());
            repositorty.save(notify2);
        });


    }

    @Override
    public List<Notify> getTop5Notify (String memberID)
    {
        return repositorty.findTop5ByMemberIDAndConfirmOkOrderByEventDateDesc (memberID, false);
    }

    @Override
    public void readNotify(String id, String memberID) {
        Notify byNotiId = repositorty.findByNotiId(id);
        Optional<Notify> notify = Optional.ofNullable(byNotiId);

        notify.ifPresent(notify1 -> {
            if(notify1.getMemberID().equals(memberID)){
                notify1.setConfirmOk(true);

                repositorty.save(notify1);
            }

        });

    }

    @Override
    public boolean existsNotConfirm (String memberID)
    {
        return repositorty.existsByMemberIDAndConfirmOk (memberID, false);
    }


    @Override
    public Page<Notify> searchAll(Pageable pageable, AlramSearchData seachData) {
        return mongoSupportSv.makePaging2(Notify.class, pageable, seachData);
    }

    @Override
    public void readUpdate(String id) {
        Optional<Notify> byNotiId = repositorty.findById(id);

        byNotiId.ifPresent(notify ->{
            notify.setConfirmOk(true);
            repositorty.save(notify);
        });

    }
}
