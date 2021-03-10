package com.onus.onlinebookstore.repository;

import com.onus.onlinebookstore.entity.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//change path from bookCategories to book-categories
@RepositoryRestResource(path = "book-categories")
//@CrossOrigin(origins = "*", maxAge = 3600)
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
}
