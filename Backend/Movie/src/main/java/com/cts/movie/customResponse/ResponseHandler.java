package com.cts.movie.customResponse;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler {

	public static ResponseEntity<Object> generateResponse(String message, HttpStatus statusCode, Object object) {
		Map<String, Object> mapObj = new HashMap<String, Object>();
		mapObj.put("Custom Message", message);
		mapObj.put("Status Code", statusCode);
		mapObj.put("Payload", object);
		return new ResponseEntity<Object>(mapObj, statusCode);
	}
}
