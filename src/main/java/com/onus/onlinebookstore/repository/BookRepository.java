package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface BookRepository extends JpaRepository<Book, Long> {

	@RestResource(path = "category_id")
	Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
