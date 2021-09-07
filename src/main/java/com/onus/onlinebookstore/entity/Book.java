package com.onus.onlinebookstore.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "tbl_book")
@Data
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String sku;
	private String name;
	private String description;
	private boolean active;

	@Column(name = "unit_price")
	private BigDecimal unitPrice;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "units_in_stock")
	private int unitsInStock;

	@Column(name = "date_created")
	private Date createdOn;

	@Column(name = "last_updated")
	private Date updatedOn;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private BookCategory category;

	@PreUpdate
	@PrePersist
	void updatedOn() {
		updatedOn = new Date();
	}
}
