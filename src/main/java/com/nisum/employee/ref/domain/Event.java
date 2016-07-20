package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Event {
    @Id
	String notificationId;
    String notificationDesc;
    String timeStamp;
    String username;
    String category;
    String emailId;

}
