package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
