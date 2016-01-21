package com.nisum.employee.ref.login;

import java.util.Iterator;
import java.util.Set;

import org.hamcrest.core.Is;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriver.TargetLocator;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class LoginPageTest {
	private static final String ID_WRAPPER ="//*[@id='header']/div[2]/ul/li/a";
	private static final String OSI_TECHNOLOGIES = "OSI Technologies";
	private static final String ID_LOGOUT = "//*[@id='logout']";
	private static final String OSI_TECHNOLOGIES_RECRUITMENT_PORTAL = "OSI Technologies - Recruitment Portal";
	private static final String SIGN_IN_BUTTON = "//*[@id='signIn']";
	private static final String ID_PASSWD = "//*[@id='Passwd']";
	private static final String ID_EMAIL = "//*[@id='Email']";

	@Test
	public void loginUser1() throws InterruptedException {
		 WebDriver driver = new FirefoxDriver();

		try {
			loginUser(driver);

			Assert.assertThat(driver.getTitle(), Is.is(OSI_TECHNOLOGIES_RECRUITMENT_PORTAL));

			logoutUser(driver);

			Assert.assertEquals(OSI_TECHNOLOGIES, driver.getTitle());

		} finally {
			driver.quit();
		}
	}

	public void logoutUser(WebDriver driver) throws InterruptedException {
		TargetLocator target;
		target = driver.switchTo();
		WebElement account = target.activeElement().findElement(By.xpath(ID_WRAPPER));
		
		account.click();

		WebElement logout = target.activeElement().findElement(By.xpath(ID_LOGOUT));
		logout.click();

		Thread.sleep(10000);
	}

	public void loginUser(WebDriver driver) throws InterruptedException {
		driver.get("http://localhost:8080/EmployeeReferral/login.html");

		WebElement signInWithGoogle = driver.findElement(By.id("signInG"));
		signInWithGoogle.click();

		Set<String> windowIds = driver.getWindowHandles();

		Iterator<String> ids = windowIds.iterator();

		String mainId = ids.next();
		String popupId = ids.next();
		driver.switchTo().window(popupId);

		TargetLocator target = driver.switchTo();
		WebElement username = target.activeElement().findElement(By.xpath(ID_EMAIL));
		username.sendKeys("ositechportal@gmail.com");
		username.sendKeys(Keys.ENTER);

		Thread.sleep(5000);
		WebElement password = target.activeElement().findElement(By.xpath(ID_PASSWD));
		password.sendKeys("123osi123");

		target.activeElement().sendKeys(Keys.TAB);

		WebElement loginButton = target.activeElement().findElement(By.xpath(SIGN_IN_BUTTON));
		loginButton.click();

		driver.switchTo().window(mainId);

		Thread.sleep(10000);
	}

}
