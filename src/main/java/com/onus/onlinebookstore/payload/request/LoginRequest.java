package com.onus.onlinebookstore.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {
	@NotBlank(message = "username is required")
	private String username;

	@NotBlank(message = "Password is required")
	private String password;

}
