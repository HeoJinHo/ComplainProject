package com.complain.igex.repository;

import com.complain.igex.model.ComplainMoveHis;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ComplainMoveHisRepository extends MongoRepository<ComplainMoveHis, String> {


    List<ComplainMoveHis> findByComplainID(String id);
}
