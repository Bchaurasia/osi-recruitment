//Author: akakade@nisum.com

package com.nisum.employee.ref.login;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;

import com.nisum.constants.DashboardPageConstants;

public class VerifyMainTabs{

	Map<String,Boolean> exceptionMap = new HashMap<String,Boolean>();
	List<String> message = new LinkedList<String>();

	public void userSpecificTabsOnly(WebDriver driver, String user) {

		Assert.assertTrue("Incorrect page title found, Recruitment Portal was expected", driver.getTitle().contains(DashboardPageConstants.OSI_TECHNOLOGIES_RECRUITMENT_PORTAL));

		switch (user){

		case "Admin":
			shouldBeVisible(driver, DashboardPageConstants.DASHBOARD_TAB, "Dashboard");
			shouldBeVisible(driver, DashboardPageConstants.RECRUITMENT_TAB, "Recruitment");
			shouldBeVisible(driver, DashboardPageConstants.REFERRAL_TAB, "Referral");
			shouldBeVisible(driver, DashboardPageConstants.ADMIN_TAB, "Admin");
			break;

		case "SuperUser":
			shouldBeVisible(driver, DashboardPageConstants.DASHBOARD_TAB, "Dashboard");
			shouldBeVisible(driver, DashboardPageConstants.RECRUITMENT_TAB, "Recruitment");
			shouldBeVisible(driver, DashboardPageConstants.REFERRAL_TAB, "Referral");
			shouldNotBeVisible(driver, DashboardPageConstants.ADMIN_TAB, "Admin");
			break;

		case "User":
			shouldBeVisible(driver, DashboardPageConstants.DASHBOARD_TAB, "Dashboard");
			shouldNotBeVisible(driver, DashboardPageConstants.RECRUITMENT_TAB, "Referral");
			shouldBeVisible(driver, DashboardPageConstants.REFERRAL_TAB, "Referral");
			shouldNotBeVisible(driver, DashboardPageConstants.ADMIN_TAB, "Admin");
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
