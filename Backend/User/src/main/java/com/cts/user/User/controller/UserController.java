package com.cts.user.User.controller;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.user.User.entity.JwtRequest;
import com.cts.user.User.entity.JwtResponse;
import com.cts.user.User.entity.PasswordRequest;
import com.cts.user.User.entity.User;
import com.cts.user.User.service.JwtService;
import com.cts.user.User.service.UserService;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;

	@PostConstruct
	public void initRoleAndUser() {
		userService.initRoleAndUser();
	}

	/*
	 * @PostMapping("/checkEmailExist") public ResponseEntity<Boolean>
	 * checkEmailExist(@RequestBody String email)=> To Register New User
	 */
	@PostMapping({ "/register" })
	public ResponseEntity<?> registerNewUser(@Valid @RequestBody User user) {

		if (userService.registerNewUser(user) != null) {
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("User not registered", HttpStatus.CONFLICT);
	}


	//This Url Will Be Accessible By User With Role Admin
	@GetMapping({ "/forAdmin" })
	@PreAuthorize("hasRole('Admin')")
	public String forAdmin() {
		return "This URL is only accessible to the admin";
	}

	//This Url Will Be Accessible By User With Role User
	@GetMapping({ "/forUser" })
	@PreAuthorize("hasRole('User')")
	public String forUser() {
		return "This URL is only accessible to the user";
	}

	@PostMapping({ "/login" })
	public ResponseEntity<?> createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		JwtResponse jwtResponse = jwtService.createJwtToken(jwtRequest);
		if (jwtResponse != null) {
			return new ResponseEntity<JwtResponse>(jwtResponse, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("JWT token is not created", HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/email/{email}")
	public ResponseEntity<Boolean> isEmailExist(@PathVariable String email) {
		if (userService.getUserByEmail(email)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.OK);
	}

	@GetMapping("/verifyUserName/{username}")
	public ResponseEntity<?> verifyUserName(@PathVariable String username) {
		User user = userService.verifyUserName(username);
		if (user != null) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		}
		return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestBody PasswordRequest passwordRequest) {
		if (userService.changePassword(passwordRequest)) {
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
		}
	}
}