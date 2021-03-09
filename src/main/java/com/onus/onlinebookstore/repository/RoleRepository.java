package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.ERole;
import com.onus.onlinebookstore.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
}
