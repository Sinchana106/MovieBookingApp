package com.cts.user.User.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Entity
@Data
public class User {
	@Id
	@NotBlank(message = "Username is mandatory")
	//@Column(unique = true)
	private String username;
	
	@NotBlank(message = "Password is mandatory")
	private String password;
	
	@NotBlank(message = "Confirm Password is mandatory")
	private String confirmPassword;
	
	@NotBlank(message = "First Name is mandatory")
	private String firstName;
	
	@NotBlank(message = "Last Name is mandatory")
	private String lastName;
	
	@NotBlank(message = "Contact number is mandatory")
	private String contactNo;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "USER_ROLES", joinColumns = { @JoinColumn(name = "User_ID"), }, inverseJoinColumns = {
			@JoinColumn(name = "Role_ID") })
	private Set<Role> userRoles;
	
	@NotBlank(message = "Email is mandatory")
	private String email;
	
	private String question = "what is fav city";
	
	@NotBlank(message = "Answer is mandatory")
	private String ans;

}