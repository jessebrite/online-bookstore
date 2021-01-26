package com.onus.onlinebookstore.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Table(name = "tbl_category")
@Entity
@Data
public class BookCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "category_name")
	private String categoryName;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
	private Set<Book> book;
}
