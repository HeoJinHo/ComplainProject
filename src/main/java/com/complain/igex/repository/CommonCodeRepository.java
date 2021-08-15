package com.complain.igex.repository;

import com.complain.igex.model.CommonCode;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommonCodeRepository extends MongoRepository<CommonCode, String> {
}
