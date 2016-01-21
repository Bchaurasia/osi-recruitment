package com.nisum.employee.ref.admin;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.nisum.employee.ref.login.LoginPageTest;

public class AdminDesignationTest {
	LoginPageTest log_IN_OUT=new LoginPageTest();
	
	private static final String SAVE = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/form/div/div[2]/div[2]/div[2]/table/tbody/tr/td[3]/button";
	private static final String DESIGN_NAME = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/form/div/div[2]/div[2]/div[2]/table/tbody/tr/td[2]/input";
	private static final String ADD_DESIGN = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div/button/span";
	private static final String ID_DESIGN= "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[1]/ul/li[3]/a";
	private static final String NEW_DESIGN ="//*[@id='users']/tbody/tr[14]/td[2]";
	private static final String DELETE_DESIGN="//*[@id='users']/tbody/tr[14]/td[3]/a";
	
	@Test
	public void designationTest() throws InterruptedException {
		WebDriver driver = new FirefoxDriver();
		
		try {
			
			log_IN_OUT.loginUser(driver);
			driver.switchTo();

			driver.get("http://localhost:8080/EmployeeReferral/main.html#/admin/designation");
			
			Thread.sleep(10000);
			
			WebElement DesignId=driver.findElement(By.xpath(ID_DESIGN));
			DesignId.click();
			
			Thread.sleep(5000);
			
			System.out.println(driver.getCurrentUrl());	
			
			Assert.assertEquals(driver.getCurrentUrl(),"http://localhost:8080/EmployeeReferral/main.html#/admin/designation");
			
			WebElement addDesign=driver.findElement(By.xpath(ADD_DESIGN));
			addDesign.click();
			
			WebElement DesignName=driver.findElement(By.xpath(DESIGN_NAME));
			DesignName.sendKeys("XYZ");
			
			
			WebElement save=driver.findElement(By.xpath(SAVE));
			save.click();
			
			Thread.sleep(10000);
			
			WebElement newDesign=driver.findElement(By.xpath(NEW_DESIGN));
			System.out.println(newDesign.getText());
			
			Assert.assertEquals(newDesign.getText(),"XYZ");
			
			
			WebElement deleteDesign=driver.findElement(By.xpath(DELETE_DESIGN));
			deleteDesign.click();
			driver.switchTo().alert().accept();
			driver.switchTo();
			
			Thread.sleep(5000);
			
			log_IN_OUT.logoutUser(driver);
			
		} finally {
			driver.quit();
		}
	}

}
