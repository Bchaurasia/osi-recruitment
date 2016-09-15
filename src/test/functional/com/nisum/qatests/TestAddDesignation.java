// Author: akakade@nisum.com

package com.nisum.qatests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import com.nisum.constants.LoginPageConstants;
import com.nisum.employee.ref.admin.AddDesignation;
import com.nisum.employee.ref.login.LoginAndLogout;

public class TestAddDesignation {
	private WebDriver driver;
	LoginAndLogout loginObject = new LoginAndLogout();
	AddDesignation designationObj = new AddDesignation();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");

		ChromeOptions options = new ChromeOptions();
		options.addArguments("--disable-extensions");
		driver = new ChromeDriver(options);
		driver.manage().window().maximize();
	}

	@Test
	public void addNewDesignation() throws Exception {

		loginObject.loginUser(driver, LoginPageConstants.ADMIN_USERNAME, LoginPageConstants.GPLUS_ALL_USERS_PASSWORD );
		designationObj.setDesignation(driver);
		loginObject.logoutUser(driver);

	}

	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}
}

