package com.nisum.employee.ref.admin;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import com.nisum.constants.AdminPageConstants;
import com.nisum.constants.DashboardPageConstants;
import com.nisum.constants.LoginPageConstants;
import com.nisum.excelReaderLibrary.ExcelDataConfig;
import junit.framework.Assert;

public class AddDesignation {

	ExcelDataConfig config = new ExcelDataConfig(LoginPageConstants.PATH_LOGIN_USER_SHEET);

	int sheetnumber = 3; // Designation List tab
	int lastRowNumber = config.getRowCount(sheetnumber);
	int totalColumnsCount = config.getColCount(sheetnumber);
	int yaxisForExperience = 0;

	boolean isEmpty(String str){
		if(null == str || str.trim().length() == 0){
			return true;
		}
		return false;
	}

	public void setDesignation(WebDriver driver) throws InterruptedException {

		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		driver.findElement(By.xpath(DashboardPageConstants.ADMIN_TAB)).click();

		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
		driver.findElement(By.xpath(AdminPageConstants.DESIGNATION_SUB_TAB)).click();

		driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

		readDesignationFromExcel(driver);
	}

	private void readDesignationFromExcel(WebDriver driver) throws InterruptedException {

		Map<String, Set<String>> skillSetsForDesignations = new HashMap <String, Set<String>>();
		Set <String> skillSet = new TreeSet<String>();
		String skill= null;
		for (int row = 0; row < lastRowNumber; row++) { 
			skillSet = new TreeSet<String>();
			for (int col = 1; col < totalColumnsCount; col++) {
				Object temp = config.getData(sheetnumber, row, col);				
				if(null!=temp)
					skill = (String)temp;
				if(!isEmpty(skill))
				{
					skillSet.add(skill);
				}
				else
				{
					break;
				}
			}
			skillSetsForDesignations.put((String)config.getData(sheetnumber, row, 0), skillSet);

			skillSet =null;
		}

		Set<String> designations =  skillSetsForDesignations.keySet();
		for (String designation : designations) {

			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			driver.findElement(By.className(AdminPageConstants.BT_ADD_DESIGNATION_CLASS_NAME)).click();
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			driver.findElement(By.name(AdminPageConstants.TF_CREATE_DESIGNATION_NAME)).sendKeys(designation);
			Thread.sleep(500);
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			driver.findElement(By.className(AdminPageConstants.DD_SKILL_SETS_CLASSNAME)).click();
			skillSet = skillSetsForDesignations.get(designation);
			for (String skills : skillSet) {
				driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
				driver.findElement(By.xpath(AdminPageConstants.DD_SKILL_SETS_XPATH)).sendKeys(skills);
				driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
				driver.findElement(By.xpath(AdminPageConstants.DD_SKILL_SETS_XPATH)).sendKeys(Keys.ENTER);
			}
			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			driver.findElement(By.xpath(AdminPageConstants.DD_SKILL_SETS_XPATH)).sendKeys(Keys.TAB);

			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			setExp(driver, AdminPageConstants.SB_MAX_EXP_XPATH, -50);

			driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
			setExp(driver, AdminPageConstants.SB_MIN_EXP_XPATH, -70);

			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			driver.findElement(By.xpath(AdminPageConstants.BT_SAVE_DESIGNATION)).click();
			
			Thread.sleep(1000);
			
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			String actualMessage = driver.findElement(By.xpath(AdminPageConstants.MSG_DESIGNATION_ADDED_SUCCESSFULLY)).getText();
			String expectedMessage = designation + " Designation Created successfully";
			Assert.assertEquals(expectedMessage, actualMessage);
			
			Thread.sleep(4000);
			
		}
	}

	public void setExp (WebDriver driver, String xpath, int x_axis){

		WebElement locator = driver.findElement(By.xpath(xpath));

		Actions move = new Actions(driver);
		Action action = move.dragAndDropBy(locator, x_axis, yaxisForExperience).build();
		action.perform();
	}
}
