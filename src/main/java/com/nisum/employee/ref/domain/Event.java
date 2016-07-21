package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
//@Document(collection = "event")
public class Event {
    @Id
	String eventId;
    String eventDesc;
    Date createdTimeStamp;
    String username;
    String name;
    String category;
    String emailId;
	

}
