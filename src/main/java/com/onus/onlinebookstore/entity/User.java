package com.onus.onlinebookstore.entity;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

//@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
//@RequiredArgsConstructor
@Table(name = "users",
	uniqueConstraints = {
		@UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email"),
	})
@Entity
@Data
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

//	@NotBlank
//	@Size(max = 25)
//	private final String firstName;
//
//	@NotBlank
//	@Size(max = 45)
//	private final String lastName;

	@NotBlank
	@Size(max = 25)
	private String username;

	@NotBlank
	@Size(max = 45)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;
//	private final String street;
//	private final String city;
//	private final String state;
//	private final String zip;
//	private final String country;
//	private final String phoneNumber;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
}
