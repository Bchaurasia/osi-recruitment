package com.nisum.employee.ref.domain;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "UserNotification")
public class UserNotification {
	
	@Id
	String pk;
	String userId;
	String message;
	String read;
}
