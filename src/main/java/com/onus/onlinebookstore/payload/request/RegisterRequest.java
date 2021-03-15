package com.onus.onlinebookstore.payload.request;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class RegisterRequest {
	@NotBlank(message = "First name is required")
	@Size(max = 25, message = "First name should not exceed 35 characters")
	private String firstname;

	@NotBlank(message = "Last name is required")
	@Size(max = 45, message = "Last name should not exceed 35 characters")
	private String lastname;

	@NotBlank(message = "username is required")
	@Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email(message = "Please provide a valid email address")
	private String email;

	@NotBlank
	@Size(min = 8, message = "Password must be at least 8 characters long")
	private String password;

	@Value("${EnumType.STRING:ROLE_USER}")
	private Set<String> role;
}
