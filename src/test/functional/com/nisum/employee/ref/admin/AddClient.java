package com.nisum.employee.ref.admin;

import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;
import com.nisum.constants.AdminPageConstants;
import com.nisum.constants.DashboardPageConstants;
import com.nisum.constants.LoginPageConstants;
import com.nisum.excelReaderLibrary.ExcelDataConfig;
import junit.framework.Assert;

public class AddClient {

	ExcelDataConfig config = new ExcelDataConfig(LoginPageConstants.PATH_LOGIN_USER_SHEET);

	int sheetnumber = 2; // Client List tab
	int lastRowNumber = config.getRowCount(sheetnumber);
	int totalColumnsCount = config.getColCount(sheetnumber);

	public void setClient(WebDriver driver) throws InterruptedException {

		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		driver.findElement(By.xpath(DashboardPageConstants.ADMIN_TAB)).click();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		driver.findElement(By.xpath(AdminPageConstants.CLIENT_SUB_TAB)).click();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

		String[][] data = new String[lastRowNumber][totalColumnsCount];
		for (int row = 0; row < lastRowNumber; row++) {
			for (int col = 0; col < totalColumnsCount; col++) {
				data[row][col] = (String) config.getData(sheetnumber, row, col);
			}
		}
		
		for (int rowIndex = 0; rowIndex < data.length; rowIndex++) {
			
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			driver.findElement(By.xpath(AdminPageConstants.BT_ADD_CLIENT)).click();

			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			driver.findElement(By.xpath(AdminPageConstants.TF_CLIENT_NAME)).sendKeys(data[rowIndex][0]);
			
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			Select dropdown = new Select(driver.findElement(By.xpath(AdminPageConstants.DD_CLIENT_LOCATION)));
			dropdown.selectByVisibleText((String) data[rowIndex][1]);
			
			Thread.sleep(2000);
			
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			driver.findElement(By.xpath(AdminPageConstants.BT_SAVE_CLIENT_INFORMATION)).click();
			
			Thread.sleep(1000);
			
			String actualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_CLIENT_ADDED_SUCCESSFULLY)).getText();
			String expectedMessage = data[rowIndex][0] + " Client has been added successfully";
			Assert.assertEquals(expectedMessage, actualMessage);
		}
	}
}
