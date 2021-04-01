package com.onus.onlinebookstore.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "name is required")
	private String name;

	@NotBlank
	@Column(name = "unit_price")
	private int unitPrice;

	@NotBlank
	private int quantity;

	private Date createdAt;

	/*
	 * @ManyToMany()
	 * Set<Order> orders = new HashSet<>();
	 */

	@PrePersist
	void createdAt() {
		this.createdAt = new Date();
	}
}
