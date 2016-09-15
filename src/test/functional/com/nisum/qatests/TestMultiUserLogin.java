//Author: akakade@nisum.com

package com.nisum.qatests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.nisum.constants.LoginPageConstants;
import com.nisum.employee.ref.login.LoginAndLogout;
import com.nisum.employee.ref.login.VerifyMainTabs;
import com.nisum.excelReaderLibrary.ExcelDataConfig;
import com.tngtech.java.junit.dataprovider.DataProvider;
import com.tngtech.java.junit.dataprovider.DataProviderRunner;
import com.tngtech.java.junit.dataprovider.UseDataProvider;

@RunWith(DataProviderRunner.class)
public class TestMultiUserLogin {

	private WebDriver driver;
	WebDriverWait wait;
	LoginAndLogout loginObject = new LoginAndLogout();
	VerifyMainTabs tab = new VerifyMainTabs();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");

		ChromeOptions options = new ChromeOptions();
		options.addArguments("--disable-extensions");
		driver = new ChromeDriver(options);

		wait = new WebDriverWait(driver, 10);
		driver.manage().window().maximize();
	}

	@Test
	@UseDataProvider("validData")
	public void loginWithValidUser(String osiUser, String osiPassword, String osiUsertype) throws Exception {
		loginObject.loginUser(driver, osiUser, osiPassword);
		tab.userSpecificTabsOnly(driver, osiUsertype);
		loginObject.logoutUser(driver);

	}

	// negative test case with Invalid users 
	@Test(expected=TimeoutException.class)
	@UseDataProvider("invalidData")
	public void loginWithInvalidUser(String osiUser, String osiPassword, String osiUsertype) throws Exception {

		loginObject.loginUser(driver, osiUser, osiPassword);
	}

	@DataProvider
	public static Object[][] validData(){

		ExcelDataConfig config = new ExcelDataConfig(LoginPageConstants.PATH_LOGIN_USER_SHEET);

		int sheetnumber = 0; //Valid User List tab
		int lastRowNumber = config.getRowCount(sheetnumber);
		int totalColumnsCount = config.getColCount(sheetnumber);


		Object[][] data = new Object[lastRowNumber][totalColumnsCount];
		for (int row = 0 ; row < lastRowNumber ; row ++)
		{
			for(int col = 0 ; col < totalColumnsCount ; col ++){ 
				data[row][col] = config.getData(sheetnumber, row, col);
			}
		}
		return data;

	}

	@DataProvider
	public static Object[][] invalidData(){

		ExcelDataConfig config = new ExcelDataConfig(LoginPageConstants.PATH_LOGIN_USER_SHEET);

		int sheetnumber = 1; //Invalid User List tab
		int lastRowNumber = config.getRowCount(sheetnumber);
		int totalColumnsCount = config.getColCount(sheetnumber);


		Object[][] data = new Object[lastRowNumber][totalColumnsCount];
		for (int row = 0 ; row < lastRowNumber ; row ++)
		{
			for(int col = 0 ; col < totalColumnsCount ; col ++){ 
				data[row][col] = config.getData(sheetnumber, row, col);
			}		
		}
		return data;

	}

	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}
}
