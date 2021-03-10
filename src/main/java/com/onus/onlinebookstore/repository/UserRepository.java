package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends JpaRepository<User, Long> {
	Optional <User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

}