package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface BookRepository extends JpaRepository<Book, Long> {
}
