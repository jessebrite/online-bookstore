package com.onus.onlinebookstore.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "tbl_order")
public class Order implements Serializable {
	private static final long serialVersionUID  = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "placed_at")
	Date placedAt;

	@ManyToOne(fetch = FetchType.LAZY)
	private User user;

	// @ManyToMany(mappedBy = "orders")
	@ManyToMany(targetEntity = Cart.class)
	Set<Cart> carts = new HashSet<>();

	@PrePersist
	void placedAt() {
		this.placedAt = new Date();
	}

}
