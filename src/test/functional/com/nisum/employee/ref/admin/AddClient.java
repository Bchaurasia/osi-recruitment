package com.nisum.employee.ref.admin;

import static org.junit.Assert.assertEquals;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.nisum.constants.AdminPageConstants;
import com.nisum.constants.DashboardPageConstants;
import com.nisum.constants.LoginPageConstants;
import com.nisum.excelReaderLibrary.ExcelDataConfig;

public class AddClient {

	ExcelDataConfig config = new ExcelDataConfig(LoginPageConstants.PATH_LOGIN_USER_SHEET);

	int sheetnumber = 2; // Client List tab
	int lastRowNumber = config.getRowCount(sheetnumber);
	int totalColumnsCount = config.getColCount(sheetnumber);
	WebDriverWait wait;

	public void setClient(WebDriver driver) throws InterruptedException {

		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.xpath(DashboardPageConstants.ADMIN_TAB))).click();
		Thread.sleep(1000);
		wait.until(ExpectedConditions.elementToBeClickable(By.xpath(AdminPageConstants.CLIENT_SUB_TAB))).click();

		String[][] data = new String[lastRowNumber][totalColumnsCount];
		for (int row = 0; row < lastRowNumber; row++) {
			for (int col = 0; col < totalColumnsCount; col++) {
				data[row][col] = (String) config.getData(sheetnumber, row, col);
			}
		}

		for (int rowIndex = 0; rowIndex < data.length; rowIndex++) {

			Thread.sleep(500);

			wait.until(ExpectedConditions.elementToBeClickable(By.xpath(AdminPageConstants.BT_ADD_CLIENT))).click();

			wait.until(ExpectedConditions.elementToBeClickable(By.xpath(AdminPageConstants.TF_CLIENT_NAME))).sendKeys(data[rowIndex][0]);

			Select dropdown = new Select(driver.findElement(By.xpath(AdminPageConstants.DD_CLIENT_LOCATION)));
			dropdown.selectByVisibleText((String) data[rowIndex][1]);

			WebElement saveBt = wait.until(ExpectedConditions.elementToBeClickable(By.xpath(AdminPageConstants.BT_SAVE_CLIENT_INFORMATION)));
			saveBt.click();

			Thread.sleep(1000);

			String actualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_CLIENT_ADDED_SUCCESSFULLY)).getText();
			String expectedMessage = data[rowIndex][0] + " created successfully.";
			assertEquals(expectedMessage, actualMessage);
		}
	}
}
