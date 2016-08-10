package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Series {

	private LayerTwo layer2;
	private List <LayerThree> layer3;
	public static Date fromDate;
	public static Date toDate;
	
	
	@Getter
	@Setter
	public static class LayerTwo {

		private String name;
		private String id;
		private List<Data> data;
		

		@lombok.Data
		public static class Data {
			private String name;
			private int y;
			private String drilldown;

			// private List<String> clientNames;

		}

		public void setFromDate(Date fromdate2) {
			// TODO Auto-generated method stub
			
		}
	}

	@Getter
	@Setter
	public static class LayerThree {
		private String name;
		private String id;
		private List<List<String>> data = new ArrayList<>();

		@lombok.Data
		public static class Data {

			private String client;
			private int count;

		}

	}

}