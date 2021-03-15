package com.onus.onlinebookstore.controllers;

import com.onus.onlinebookstore.entity.ERole;
import com.onus.onlinebookstore.entity.Role;
import com.onus.onlinebookstore.entity.User;
import com.onus.onlinebookstore.payload.request.LoginRequest;
import com.onus.onlinebookstore.payload.request.RegisterRequest;
import com.onus.onlinebookstore.payload.response.JwtResponse;
import com.onus.onlinebookstore.payload.response.MessageResponse;
import com.onus.onlinebookstore.repository.RoleRepository;
import com.onus.onlinebookstore.repository.UserRepository;
import com.onus.onlinebookstore.services.UserDetailsImplementation;
import com.onus.onlinebookstore.utils.JwtUtils;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	AuthenticationManager authenticationManager;
	UserRepository userRepository;
	RoleRepository roleRepository;
	PasswordEncoder passwordEncoder;
	JwtUtils jwtUtils;

	public AuthController(
		AuthenticationManager authenticationManager,
		UserRepository userRepository,
		RoleRepository roleRepository,
		PasswordEncoder passwordEncoder,
		JwtUtils jwtUtils
	) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtils = jwtUtils;
	}

	@PostMapping("login")
	public Object authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
	                               BindingResult result) {
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream()
				.map(DefaultMessageSourceResolvable::getDefaultMessage)
				.collect(Collectors.toList());
			return new ResponseEntity<>(errors, HttpStatus.OK);
		}

		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
					loginRequest.getPassword())
			);

			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);

			UserDetailsImplementation userDetails =
				(UserDetailsImplementation) authentication.getPrincipal();

			List<String> roles = userDetails.getAuthorities()
				.stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

			return ResponseEntity.ok(new JwtResponse(
				jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
		} catch (AuthenticationException authException) {
			SecurityContextHolder.getContext().setAuthentication(null);
			return new MessageResponse("Wrong username/password combination");
		}
	}

	@PostMapping("register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest register,
	                                      BindingResult result) {
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream()
				.map(DefaultMessageSourceResolvable::getDefaultMessage)
				.collect(Collectors.toList());
			return new ResponseEntity<>(errors, HttpStatus.NOT_ACCEPTABLE);
		}
		if (userRepository.existsByUsername(register.getUsername())) {
			return ResponseEntity
				.badRequest()
				.body(new MessageResponse("Username is already exists!"));
		}
		if (userRepository.existsByEmail(register.getEmail())) {
			return ResponseEntity.badRequest()
				.body(new MessageResponse("Email is already in use!"));
		}

		User user = new User(register.getFirstname(), register.getLastname(), register.getUsername(),
			register.getEmail(), passwordEncoder.encode(register.getPassword()));

		Set<String> strRole = register.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRole == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
				.orElseThrow(() -> new RuntimeException("Role is not found."));
			roles.add(userRole);
		} else {
			strRole.forEach(role -> {
				switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
						roles.add(adminRole);

						break;
					case "mod":
						Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
						roles.add(modRole);

						break;
					default:
						Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
						roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("You have registered successfully!"));
	}

}
