package com.complain.igex.repository;

import com.complain.igex.model.Dept;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeptRepository extends MongoRepository<Dept, String> {
}
