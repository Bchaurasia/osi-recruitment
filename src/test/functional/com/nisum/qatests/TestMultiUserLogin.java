//Author: akakade@nisum.com

package com.nisum.qatests;

import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import com.tngtech.java.junit.dataprovider.DataProvider;
import com.tngtech.java.junit.dataprovider.DataProviderRunner;
import com.tngtech.java.junit.dataprovider.UseDataProvider;
import com.nisum.excelReaderLibrary.ExcelDataConfig;
import com.nisum.constants.LoginPageConstants;
import com.nisum.employee.ref.login.LoginAndLogout;
import com.nisum.employee.ref.login.VerifyMainTabs;

@RunWith(DataProviderRunner.class)
public class TestMultiUserLogin {

	private WebDriver driver;
	LoginAndLogout loginObject = new LoginAndLogout();
	VerifyMainTabs tab = new VerifyMainTabs();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}

	@Test
	@UseDataProvider("validData")
	public void loginWithValidUser(String osiUser, String osiPassword, String osiUsertype) throws Exception {
		loginObject.loginUser(driver, osiUser, osiPassword);
		tab.userSpecificTabsOnly(driver, osiUsertype);
		loginObject.logoutUser(driver);

	}

	// negative test case with Invalid users 
	@Test(expected=NoSuchElementException.class)
	@UseDataProvider("invalidData")
	public void loginWithInvalidUser(String osiUser, String osiPassword, String osiUsertype) throws Exception {

		loginObject.loginUser(driver, osiUser, osiPassword);
		tab.userSpecificTabsOnly(driver, osiUsertype);
		loginObject.logoutUser(driver);

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
