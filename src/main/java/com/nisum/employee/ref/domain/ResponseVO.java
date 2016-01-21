package com.nisum.employee.ref.domain;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(Include.NON_NULL)
@ToString
public class ResponseVO<T> {
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date date;
	private int httpStatus;
	private String message;
	private String user;
	private T data;

	public ResponseVO(Date date, int httpStatus, String message, String user) {
		// super();
		this.date = date;
		this.httpStatus = httpStatus;
		this.message = message;
		this.user = user;
	}
	
	
}
