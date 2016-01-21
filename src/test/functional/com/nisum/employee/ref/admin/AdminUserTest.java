package com.nisum.employee.ref.admin;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.nisum.employee.ref.login.LoginPageTest;

public class AdminUserTest {
	LoginPageTest log_IN_OUT=new LoginPageTest();
	
	private static final String EDIT_USER= "//*[@id='users']/tbody/tr[2]/td[3]/a";
	private static final String EDIT_USER_NAME="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[1]/div[1]/div[3]/a";
	private static final String EDIT_USER_NAME_INPUT="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[1]/div[1]/div[3]/form/div/input";
	private static final String EDIT_USER_NAME_SAVE="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[1]/div[1]/div[3]/form/div/span/button/span";
	
	private static final String EDIT_MOBILENO="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/div[3]/a";
	private static final String EDIT_MOBILENO_INPUT="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/div[3]/form/div/input";
	private static final String EDIT_MOBILENO_SAVE="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[2]/div[1]/div[3]/form/div/span/button/span";
	
	private static final String EDIT_LOCATION="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div[2]/a";
	private static final String EDIT_LOCATION_INPUT="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div[2]/form/div/input";
	private static final String EDIT_LOCATION_SAVE="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[3]/div[2]/div[2]/form/div/span/button/span";
	
	private static final String EDIT_SKYPEID="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/a";
	private static final String EDIT_SKYPEID_INPUT="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/form/div/input";
	private static final String EDIT_SKYPEID_SAVE="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/form/div/span/button/span";
	
	private static final String EDIT_CLIENTNAME="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[5]/div/div[3]/a";
	private static final String EDIT_CLIENTNAME_INPUT="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[5]/div/div[3]/form/div/select";
	private static final String EDIT_CLIENTNAME_SAVE="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[5]/div/div[3]/form/div/span/button/span";
	
	private static final String EDIT_SKILLS="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[4]/div[2]/div[2]/div/ul";

	private static final String EDIT_ROLES="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[4]/div[1]/div[3]/div[1]/ul";
	private static final String SAVE_ROLES="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/div[2]/div[2]/div[4]/div[1]/div[3]/div[2]/button";
	
	private static final String SAVE="//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/button[1]";
	
			
	@Test
	public void userTest() throws InterruptedException {
		WebDriver driver = new FirefoxDriver();
		
		try {
			
			log_IN_OUT.loginUser(driver);
			driver.switchTo();
			driver.get("http://localhost:8080/EmployeeReferral/main.html#/admin/users");
			
			Thread.sleep(10000);
			
			Assert.assertEquals(driver.getCurrentUrl(),"http://localhost:8080/EmployeeReferral/main.html#/admin/users");
			
			WebElement editUser=driver.findElement(By.xpath(EDIT_USER));
			editUser.click();
			
			Thread.sleep(5000);
			
			WebElement editUserName=driver.findElement(By.xpath(EDIT_USER_NAME));
			editUserName.click();
			WebElement editUserNameinput=driver.findElement(By.xpath(EDIT_USER_NAME_INPUT));
			editUserNameinput.clear();
			editUserNameinput.sendKeys("Vinayak");
			WebElement editUserNameSave=driver.findElement(By.xpath(EDIT_USER_NAME_SAVE));
			editUserNameSave.click();
			
			WebElement editmobileno=driver.findElement(By.xpath(EDIT_MOBILENO));
			editmobileno.click();
			WebElement editmobileinput=driver.findElement(By.xpath(EDIT_MOBILENO_INPUT));
			editmobileinput.clear();
			editmobileinput.sendKeys("9807654312");
			WebElement editmobileSave=driver.findElement(By.xpath(EDIT_MOBILENO_SAVE));
			editmobileSave.click();
			
			WebElement editskype=driver.findElement(By.xpath(EDIT_SKYPEID));
			editskype.click();
			WebElement editskypeinput=driver.findElement(By.xpath(EDIT_SKYPEID_INPUT));
			editskypeinput.clear();
			editskypeinput.sendKeys("abc_123");
			WebElement editskypeSave=driver.findElement(By.xpath(EDIT_SKYPEID_SAVE));
			editskypeSave.click();
			
			WebElement editLocation=driver.findElement(By.xpath(EDIT_LOCATION));
			editLocation.click();
			WebElement editLocationinput=driver.findElement(By.xpath(EDIT_LOCATION_INPUT));
			editLocationinput.clear();
			editLocationinput.sendKeys("Pune");
			WebElement editLocationSave=driver.findElement(By.xpath(EDIT_LOCATION_SAVE));
			editLocationSave.click();
			
			WebElement editClientName=driver.findElement(By.xpath(EDIT_CLIENTNAME));
			editClientName.click();
			WebElement editClientNameinput=driver.findElement(By.xpath(EDIT_CLIENTNAME_INPUT));
			editClientNameinput.click();
			WebElement editClientNameSave=driver.findElement(By.xpath(EDIT_CLIENTNAME_SAVE));
			editClientNameSave.click();
			
			Thread.sleep(8000);
			
			WebElement editRole=driver.findElement(By.xpath(EDIT_ROLES));
			editRole.click();
			editRole.sendKeys(Keys.ENTER);
			editRole.click();
			editRole.sendKeys(Keys.ARROW_DOWN);
			editRole.sendKeys(Keys.ENTER);
			WebElement saveRole=driver.findElement(By.xpath(SAVE_ROLES));
			saveRole.click();
							
			Thread.sleep(3000);
			
			WebElement editskill=driver.findElement(By.xpath(EDIT_SKILLS));
			editskill.click();
			editskill.sendKeys(Keys.ENTER);
		
			WebElement save=driver.findElement(By.xpath(SAVE));
			save.click();
				
			Thread.sleep(8000);
			
			WebElement editUser1=driver.findElement(By.xpath(EDIT_USER));
			editUser1.click();
			WebElement editUserName1=driver.findElement(By.xpath(EDIT_USER_NAME));
			Assert.assertEquals(editUserName1.getText(),"Vinayak");
			
			Thread.sleep(8000);
			
			log_IN_OUT.logoutUser(driver);
			
		} finally {
			driver.quit();
		}
	}
}
