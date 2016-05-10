package com.nisum.employee.ref.login;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.hamcrest.core.Is;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;

public class VerifyMainTabs extends DashboardPageConstants {

	Map<String,Boolean> exceptionMap = new HashMap<String,Boolean>();
	List<String> message = new LinkedList<String>();

	public void userSpecificTabsOnly(WebDriver driver, String user) {
		Assert.assertThat(driver.getTitle(), Is.is(OSI_TECHNOLOGIES_RECRUITMENT_PORTAL));

		switch (user){

		case "Admin":
			shouldBeVisible(driver, DASHBOARD_TAB, "Dashboard");
			shouldBeVisible(driver, RECRUITMENT_TAB, "Recruitment");
			shouldBeVisible(driver, REFERRAL_TAB, "Referral");
			shouldBeVisible(driver, ADMIN_TAB, "Admin");
			break;

		case "SuperUser":
			shouldBeVisible(driver, DASHBOARD_TAB, "Dashboard");
			shouldBeVisible(driver, RECRUITMENT_TAB, "Recruitment");
			shouldBeVisible(driver, REFERRAL_TAB, "Referral");
			shouldNotBeVisible(driver, ADMIN_TAB, "Admin");
			break;

		case "User":
			shouldBeVisible(driver, DASHBOARD_TAB, "Dashboard");
			shouldNotBeVisible(driver, RECRUITMENT_TAB, "Referral");
			shouldBeVisible(driver, REFERRAL_TAB, "Referral");
			shouldNotBeVisible(driver, ADMIN_TAB, "Admin");
			break;

		}
		
		if(exceptionMap.containsValue(false)){
			throw new StaleElementReferenceException(message.toString());
		}
	}

	private void shouldBeVisible(WebDriver driver, String mustVisibleTab, String tabName) {
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		Boolean tabStatus = driver.findElement(By.xpath(mustVisibleTab)).isDisplayed();

		if(tabStatus == false){
			exceptionMap.put(tabName, tabStatus);
			message.add(tabName + " tab was not found");
		}
	}

	private void shouldNotBeVisible(WebDriver driver, String disableTab, String tabName) {
		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		Boolean tabStatus = driver.findElement(By.xpath(disableTab)).isDisplayed();

		if(tabStatus == true){
			exceptionMap.put(tabName, !tabStatus);
			message.add(tabName + " tab was found");
		}
	}
}
