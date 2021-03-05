package com.onus.onlinebookstore.services;

import com.onus.onlinebookstore.entity.User;
import com.onus.onlinebookstore.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserRepositoryUserDetailsService implements UserDetailsService {
	private final UserRepository userRepository;

	public UserRepositoryUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username)
		throws UsernameNotFoundException {
//		User user = userRepository.findByUsername(username);
//		if (user != null) {
//			return user;
//		}
//		throw new UsernameNotFoundException(
//			"User '" + username + "' not found");

		User user = userRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User '" + username + "' not found"));
		return UserDetailsImplementation.build(user);
	}
}
