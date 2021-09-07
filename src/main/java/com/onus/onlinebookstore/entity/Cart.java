package com.onus.onlinebookstore.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

//	@NotBlank(message = "name is required")
	private String name;

	  @Column(name = "unit_price")
	  @NotNull
	  @Digits(message = "Price must be valid", integer = 2, fraction = 2)
	  private double unitPrice;

	@NotNull(message = "quantity is required")
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
