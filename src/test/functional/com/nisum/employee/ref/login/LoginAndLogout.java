//Author: akakade@nisum.com

package com.nisum.employee.ref.login;

import java.util.Iterator;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriver.TargetLocator;
import org.openqa.selenium.WebElement;

import com.nisum.constants.DashboardPageConstants;
import com.nisum.constants.LoginPageConstants;

public class LoginAndLogout{

	public void logoutUser(WebDriver driver) throws InterruptedException {

		driver.findElement(By.xpath(DashboardPageConstants.ID_WRAPPER)).click();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		do {    
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			driver.findElement(By.xpath(DashboardPageConstants.ID_WRAPPER)).click();

		}
		while (!driver.findElement(By.xpath(DashboardPageConstants.ID_LOGOUT)).isDisplayed());
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		driver.findElement(By.xpath(DashboardPageConstants.ID_LOGOUT)).click();
	}

	public String loginUser(WebDriver driver, String USERNAME, String PASSWORD) throws InterruptedException {

		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		driver.get(LoginPageConstants.LOGIN_URL);

		WebElement signInWithGoogle = driver.findElement(By.id(LoginPageConstants.GOOGLE_SIGIN_BUTTON));
		signInWithGoogle.click();

		Set<String> windowIds = driver.getWindowHandles();
		Iterator<String> ids = windowIds.iterator();

		String mainId = ids.next();
		String popupId = ids.next();
		driver.switchTo().window(popupId);

		TargetLocator target = driver.switchTo();
		WebElement username = target.activeElement().findElement(By.xpath(LoginPageConstants.ID_EMAIL));
		username.sendKeys(USERNAME);
		username.sendKeys(Keys.ENTER);

		Thread.sleep(5000);
		WebElement password = target.activeElement().findElement(By.xpath(LoginPageConstants.ID_PASSWD));
		password.sendKeys(PASSWORD);

		target.activeElement().sendKeys(Keys.TAB);

		WebElement loginButton = target.activeElement().findElement(By.xpath(LoginPageConstants.SIGN_IN_BUTTON));
		loginButton.click();

		do{
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		}while(!driver.findElement(By.xpath(LoginPageConstants.GPLUS_ALLOW_ACCESS_BUTTON)).isEnabled());

		driver.findElement(By.xpath(LoginPageConstants.GPLUS_ALLOW_ACCESS_BUTTON)).click();

		driver.switchTo().window(mainId);
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		
		Thread.sleep(1000);
		Assert.assertTrue("Incorrect page title found, Recruitment Portal was expected", driver.getTitle().contains(DashboardPageConstants.OSI_TECHNOLOGIES_RECRUITMENT_PORTAL));
		String currentURL = driver.getCurrentUrl();
		return currentURL;
	}
}
