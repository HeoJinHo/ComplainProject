package com.complain.igex.repository;

import com.complain.igex.model.Complain;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComplainRepository extends MongoRepository<Complain, String> {

}