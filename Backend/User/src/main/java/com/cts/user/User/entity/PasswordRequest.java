package com.cts.user.User.entity;

import lombok.Data;

@Data
public class PasswordRequest {

	private String username;
	private String password;
	private String confirmPassword;

}
