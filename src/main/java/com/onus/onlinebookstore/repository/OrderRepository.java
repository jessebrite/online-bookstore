package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.Order;
import com.onus.onlinebookstore.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "tbl_order", path = "tbl_order")
public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUserOrderByPlacedAtDesc(User user, Pageable pageable);
}
