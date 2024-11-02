package com.programming.user.repositories;

import com.programming.user.entities.UserPetz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPetzRepository extends JpaRepository<UserPetz, Long> {
}
