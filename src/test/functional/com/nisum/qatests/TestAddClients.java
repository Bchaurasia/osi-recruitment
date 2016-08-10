//Author: akakade@nisum.com

package com.nisum.qatests;

import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import com.nisum.constants.LoginPageConstants;
import com.nisum.employee.ref.admin.AddClient;
import com.nisum.employee.ref.login.LoginAndLogout;

public class TestAddClients {

	private WebDriver driver;
	LoginAndLogout loginObject = new LoginAndLogout();
	AddClient clientobj = new AddClient();

	@Before
	public void setUp() throws Exception {

		System.setProperty("webdriver.chrome.driver", "src\\test\\resources\\chromedriver.exe");
		driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	}

	@Test
	public void addNewClient() throws Exception {

		loginObject.loginUser(driver, LoginPageConstants.ADMIN_USERNAME, LoginPageConstants.GPLUS_ALL_USERS_PASSWORD );
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		clientobj.setClient(driver);
		loginObject.logoutUser(driver);

	}
	
	@After
	public void pageTearDown() throws Exception{

		driver.close();
		driver.quit();
	}
}