package com.onus.onlinebookstore.payload.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class RegisterRequest {
	@NotBlank(message = "First name is required")
	@Size(max = 25, message = "First name should not exceed 25 characters")
	private final String firstname;

	@NotBlank(message = "Last name is required")
	@Size(max = 45, message = "Last name should not exceed 35 characters")
	private final String lastname;

	@NotBlank(message = "Username is required")
	@Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
	private final String username;

	@NotBlank
	@Size(max = 50)
	@Email(message = "Please provide a valid email address")
	private final String email;

	@NotBlank(message = "Password id required")
	@Size(min = 8, message = "Password must be at least 8 characters long")
	private final String password;

	@NotBlank(message = "Street id required")
	@Size(max = 120)
	private final String street;

	@NotBlank(message = "City id required")
	@Size(max = 45)
	private final String city;

	@NotBlank(message = "State id required")
	@Size(max = 45)
	private final String state;

	@NotBlank(message = "Zip id required")
	@Size(max = 10)
	private final String zip;

	@NotBlank(message = "Country id required")
	@Size(max = 45)
	private final String country;

	@Column(name = "phone_number")
	@Size(max = 13)
	private final String phoneNumber;

	@Value("${EnumType.STRING:ROLE_USER}")
	private Set<String> role;
}
