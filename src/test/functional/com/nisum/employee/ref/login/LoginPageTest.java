/*This test validates that it is able to login and logout of Recruitment Portal*/
//Author: akakade

package com.nisum.employee.ref.login;

import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class LoginPageTest extends LoginAndLogout{
	private WebDriver driver;
	VerifyMainTabs tab = new VerifyMainTabs();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}

	@Test
	public void loginAdminUser() throws Exception {

		loginUser(driver, ROLE_ADMIN, PASSWORD);
		tab.userSpecificTabsOnly(driver, "Admin");
		logoutUser(driver);
	}

	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}
}

