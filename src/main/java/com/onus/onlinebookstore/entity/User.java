package com.onus.onlinebookstore.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Table(name = "users",
	uniqueConstraints = {
		@UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email"),
	})
@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 25, message = "First name should not be more than 25 characters")
	private final String firstname;

	@NotBlank
	@Size(max = 45, message = "Last name should not be more than 45 characters")
	private final String lastname;

	@NotBlank(message = "Username is required")
	@Size(max = 25, message = "Username must not be more thant 25 characters long")
	@Size(min = 3, message = "Username must be at least 3 characters long")
	private final String username;

	@NotBlank(message = "Email is required")
	@Size(max = 45)
	@Email(message = "Please enter a valid email address")
	private final String email;

	@NotBlank
	@Size(max = 120)
	private final String password;

	@NotBlank
	@Size(max = 120)
	private final String street;

	@NotBlank
	@Size(max = 45)
	private final String city;

	@NotBlank
	@Size(max = 45)
	private final String state;

	@NotBlank
	@Size(max = 10)
	private final String zip;

	@NotBlank
	@Size(max = 45)
	private final String country;

	@Column(name = "phone_number")
	@Size(max = 13)
	private final String phoneNumber;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
}