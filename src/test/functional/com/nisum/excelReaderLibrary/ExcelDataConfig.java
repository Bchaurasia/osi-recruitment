//Author: akakade@nisum.com

package com.nisum.excelReaderLibrary;

import java.io.File;
import java.io.FileInputStream;

import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelDataConfig {

	XSSFWorkbook wb;
	XSSFSheet sheet1;

	//Default constructor
	public ExcelDataConfig (String excelPath){

		try {
			/*Reads excel sheet at the given location*/
			File src = new File(excelPath);

			/*Converts excel sheet data into bytes*/
			FileInputStream fis = new FileInputStream(src);

			/*POI loads excel sheet into a workbook*/
			wb = new XSSFWorkbook(fis);

			/*loads data in Sheet1 of the excel sheet workbook. If we change wb.getSheetAt(1), then it will load data from sheet2
			 this mean wb.getSheetAt(0) reads data from the sheet located at index 0*/
			sheet1 =  wb.getSheetAt(0);
			
		} catch (Exception e) {
			
			System.out.println(e.getMessage());
			
		}
	}

	public Object getData(int SheetNumber, int row, int col){

		sheet1 =  wb.getSheetAt(SheetNumber);
		Object data = null;
		if(sheet1.getRow(row).getCell(col)!=null)
		{
			data = sheet1.getRow(row).getCell(col).getStringCellValue();
		}
		return data;	
	
	}

	/*This method takes Sheet number as an input*/
	public int getRowCount(int sheetIndex){

		int row = wb.getSheetAt(sheetIndex).getLastRowNum();
		
		row = row + 1;
		return row;

	}
	
	public int getColCount(int sheetIndex){

		int col = wb.getSheetAt(sheetIndex).getRow(0).getPhysicalNumberOfCells();
		return col;

	}

}
