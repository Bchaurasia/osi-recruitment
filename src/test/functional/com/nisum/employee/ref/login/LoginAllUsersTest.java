/*This test validates that it is able to login and logout of Recruitment Portal*/
//Author: akakade

package com.nisum.employee.ref.login;

import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginAllUsersTest extends LoginAndLogout{
	private WebDriver driver;
	VerifyMainTabs tab = new VerifyMainTabs();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}

	//Admin
	@Test
	public void loginAdminUser() throws Exception {

		loginUser(driver, ROLE_ADMIN, PASSWORD);
		tab.userSpecificTabsOnly(driver, "Admin");
		logoutUser(driver);
	}

	//Admin Invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidAdminUser() throws Exception {

		loginUser(driver, ROLE_ADMIN, PASSWORD);
		tab.userSpecificTabsOnly(driver, "User");
		logoutUser(driver);
	}

	//HR
	@Test
	public void loginHRUser() throws Exception {

		loginUser(driver, ROLE_HR, PASSWORD);
		tab.userSpecificTabsOnly(driver, "SuperUser");
		logoutUser(driver);
	}

	//HR Invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidHRUser() throws Exception {

		loginUser(driver, ROLE_HR, PASSWORD);
		tab.userSpecificTabsOnly(driver, "Admin");
		logoutUser(driver);
	}

	//Manager
	@Test
	public void loginManagerUser() throws Exception {

		loginUser(driver, ROLE_MANAGER, PASSWORD);
		tab.userSpecificTabsOnly(driver, "SuperUser");
		logoutUser(driver);
	}

	//Manager Invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidManagerUser() throws Exception {

		loginUser(driver, ROLE_MANAGER, PASSWORD);
		tab.userSpecificTabsOnly(driver, "Admin");
		logoutUser(driver);
	}

	//Requisition Manager
	@Test
	public void loginReqManagerUser() throws Exception {

		loginUser(driver, ROLE_REQ_MANAGER, PASSWORD);
		tab.userSpecificTabsOnly(driver, "SuperUser");
		logoutUser(driver);
	}

	//Requisition Manager Invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidReqManagerUser() throws Exception {

		loginUser(driver, ROLE_REQ_MANAGER, PASSWORD);
		tab.userSpecificTabsOnly(driver, "User");
		logoutUser(driver);
	}

	//Interviewer
	@Test
	public void loginInterviewerUser() throws Exception {

		loginUser(driver, ROLE_INTERVIEWER, PASSWORD);
		tab.userSpecificTabsOnly(driver, "SuperUser");
		logoutUser(driver);
	}

	//Interviewer Invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidInterviewerUser() throws Exception {

		loginUser(driver, ROLE_INTERVIEWER, PASSWORD);
		tab.userSpecificTabsOnly(driver, "User");
		logoutUser(driver);
	}

	//Approver
	@Test
	public void loginApprover1User() throws Exception {

		loginUser(driver, ROLE_APPROVER_1, PASSWORD);
		tab.userSpecificTabsOnly(driver, "SuperUser");
		logoutUser(driver);
	}

	//Approver invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidApprover1User() throws Exception {

		loginUser(driver, ROLE_APPROVER_1, PASSWORD);
		tab.userSpecificTabsOnly(driver, "Admin");
		logoutUser(driver);
	}

	//User
	@Test
	public void loginUser() throws Exception {

		loginUser(driver, ROLE_APPROVER_1, PASSWORD);
		tab.userSpecificTabsOnly(driver, "User");
		logoutUser(driver);
	}

	//User invalid
	@Test(expected = StaleElementReferenceException.class)
	public void loginInvalidUser() throws Exception {

		loginUser(driver, ROLE_APPROVER_1, PASSWORD);
		tab.userSpecificTabsOnly(driver, "Admin");
		logoutUser(driver);
	}

	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}
}

