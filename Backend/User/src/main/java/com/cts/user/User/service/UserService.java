package com.cts.user.User.service;

import com.cts.user.User.repository.RoleRepository;
import com.cts.user.User.repository.UserRepository;
import com.cts.user.User.entity.PasswordRequest;
import com.cts.user.User.entity.Role;
import com.cts.user.User.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

	@Autowired
	private UserRepository userDao;

	@Autowired
	private RoleRepository roleDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public void initRoleAndUser() {

		Role adminRole = new Role();
		adminRole.setRoleName("Admin");
		adminRole.setRoleDescription("Admin role");
		roleDao.save(adminRole);

		Role userRole = new Role();
		userRole.setRoleName("User");
		userRole.setRoleDescription("Default role for newly created record");
		roleDao.save(userRole);

		User adminUser = new User();
		adminUser.setUsername("Sinchana123");
		adminUser.setPassword(getEncodedPassword("Sinchana@123"));
		adminUser.setConfirmPassword(getEncodedPassword("Sinchana@123"));
		adminUser.setFirstName("Sinchana");
		adminUser.setLastName("Chandrashekar");
		adminUser.setContactNo("9741768148");
		adminUser.setAns("Bangalore");
		adminUser.setEmail("sinchanashettyc@gmail.com");
		Set<Role> adminRoles = new HashSet<>();
		adminRoles.add(adminRole);
		adminUser.setUserRoles(adminRoles);
		userDao.save(adminUser);

	}

	public User registerNewUser(User user) {

		Role role = roleDao.findById("User").get();
		Set<Role> userRoles = new HashSet<>();
		userRoles.add(role);
		user.setUserRoles(userRoles);
		user.setPassword(getEncodedPassword(user.getPassword()));

		return userDao.save(user);
	}

	public String getEncodedPassword(String password) {
		return passwordEncoder.encode(password);
	}

	public boolean getUserByEmail(String email) {
		User user = userDao.findByEmail(email);
		if (user != null) {
			return true;
		}
		return false;
	}

	public User verifyUserName(String username) {
		User user = userDao.findByUsername(username);
		return user;
	}

	public boolean changePassword(PasswordRequest passwordRequest) {
		User user = userDao.findByUsername(passwordRequest.getUsername());
		if (user != null) {
			user.setPassword(getEncodedPassword(passwordRequest.getPassword()));
			user.setConfirmPassword(passwordRequest.getPassword());
			userDao.save(user);
			return true;
		}
		return false;

	}
}