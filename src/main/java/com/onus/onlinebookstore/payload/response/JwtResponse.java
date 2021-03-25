package com.onus.onlinebookstore.payload.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@RequiredArgsConstructor
public class JwtResponse {
	private final String token;
	private final String type = "Bearer";
	private final Long id;
	private final String firstname;
	private final String lastname;
	private final String username;
	private final String email;
	private final String street;
	private final String city;
	private final String state;
	private final String country;
	private final String phoneNumber;
	private final List<String> roles;
}
