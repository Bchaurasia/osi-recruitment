package com.nisum.employee.ref.admin;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.nisum.employee.ref.login.LoginPageTest;

public class AdminSkillsetTest {
	LoginPageTest log_IN_OUT=new LoginPageTest();
	
	private static final String SAVE = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/table/tbody/tr/td[3]/button";
	private static final String SKILLSET_NAME = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/table/tbody/tr/td[2]/input";
	private static final String ADD_SKILLSET = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/button";
	private static final String ID_SKILLSET= "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[1]/ul/li[4]/a";
	private static final String NEW_SKILLSET ="//*[@id='users']/tbody/tr[23]/td[2]";
	private static final String DELETE_SKILLSET ="//*[@id='users']/tbody/tr[23]/td[3]/a";
	@Test
	public void clientTest() throws InterruptedException {
		WebDriver driver = new FirefoxDriver();
		try {
			log_IN_OUT.loginUser(driver);

			driver.switchTo();
			driver.get("http://localhost:8080/EmployeeReferral/main.html#/admin/client");
			
			Thread.sleep(10000);
			
			WebElement skillsetId=driver.findElement(By.xpath(ID_SKILLSET));
			skillsetId.click();
			
			Thread.sleep(5000);
			
			System.out.println(driver.getCurrentUrl());	
			
			Assert.assertEquals(driver.getCurrentUrl(),"http://localhost:8080/EmployeeReferral/main.html#/admin/skillSet");
			
			WebElement addSkillset=driver.findElement(By.xpath(ADD_SKILLSET));
			addSkillset.click();
			
			WebElement SkillSet=driver.findElement(By.xpath(SKILLSET_NAME));
			SkillSet.sendKeys("XYZ");
			
			WebElement save=driver.findElement(By.xpath(SAVE));
			save.click();
			
			Thread.sleep(10000);
			
			WebElement newSkillSet=driver.findElement(By.xpath(NEW_SKILLSET));
			System.out.println(newSkillSet.getText());
			
			Assert.assertEquals(newSkillSet.getText(),"XYZ");
			
			WebElement deleteSkillSet=driver.findElement(By.xpath(DELETE_SKILLSET));
			deleteSkillSet.click();
            driver.switchTo().alert().accept();
            driver.switchTo();
            
            Thread.sleep(5000);
			
            log_IN_OUT.logoutUser(driver);
			
		} finally {
			driver.quit();
		}
	}

}
