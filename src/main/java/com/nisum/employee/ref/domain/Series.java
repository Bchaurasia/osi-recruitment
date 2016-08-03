package com.nisum.employee.ref.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Series {

	private LayerTwo layer2;
	private LayerThree layer3;
	
	
	
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
	}

	@Getter
	@Setter
	public static class LayerThree {

		private String id;
		private List<Data> dataList = new ArrayList<>();

		@lombok.Data
		public static class Data {

			private String client;
			private int count;

		}

	}

}