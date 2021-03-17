package com.onus.onlinebookstore.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.onus.onlinebookstore.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor(force = true)
public class UserDetailsImplementation implements UserDetails {
	private static final long serialVersionUID = 1L;

	private final Long id;
	private final String firstname;
	private final String lastname;
	private final String username;
	private final String email;

	@JsonIgnore
	private final String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImplementation(Long id, String firstname, String lastname,
	                                 String username, String email, String password,
	                                 Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
		this.password = password;
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

	@Override
	public boolean equals(Object object) {
		if (this == object)
			return true;
		if (object == null || getClass() != object.getClass())
			return false;
		UserDetailsImplementation user = (UserDetailsImplementation) object;
		return Objects.equals(id, user.id);
	}
}
