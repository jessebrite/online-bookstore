package com.onus.onlinebookstore.payload.request;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
public class RegisterRequest {
	@NotBlank
	@Size(max = 25)
	private String firstname;

	@NotBlank
	@Size(max = 45)
	private String lastname;

	@NotBlank
	@Size(min = 3, max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;

	@Value("${EnumType.STRING:ROLE_USER}")
	private Set<String> role;
}
