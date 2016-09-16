package com.nisum.employee.ref.domain;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@Document(collection = "advertisement")
public class Advertisement {
	
	@Id
	String adv_id;
	String url;
	String name;
	Date createdDate;
	String flag;
	
}
