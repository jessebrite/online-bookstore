package com.onus.onlinebookstore.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onus.onlinebookstore.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDetailsImplementation implements UserDetails {
	private static final long serialVersionUID = 1L;

	private final Long id;
	private final String firstname;
	private final String lastname;
	private final String username;
	private final String email;
	private final String street;
	private final String city;
	private final String state;
	private final String zip;
	private final String country;
	private final String phoneNumber;

	@JsonIgnore
	private final String password;

	private final Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImplementation(Long id, String firstname, String lastname,
	                                 String username, String email, String password,
	                                 String street, String city, String state,String zip, String country,
	                                 String phoneNumber,
	                                 Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
		this.password = password;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.phoneNumber = phoneNumber;
		this.authorities = authorities;
	}

	public static UserDetailsImplementation build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
			.map(role -> new SimpleGrantedAuthority(role.getName().name()))
			.collect(Collectors.toList());

		return new UserDetailsImplementation(
			user.getId(),
			user.getFirstname(),
			user.getLastname(),
			user.getUsername(),
			user.getEmail(),
			user.getPassword(),
			user.getStreet(),
			user.getCity(),
			user.getState(),
			user.getZip(),
			user.getCountry(),
			user.getPhoneNumber(),
			authorities
		);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
