
package com.nisum.employee.ref.admin;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import com.nisum.employee.ref.login.LoginPageTest;

public class AdminInterviewRoundTest {
	LoginPageTest log_IN_OUT=new LoginPageTest();
	
	private static final String SAVE = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/table/tbody/tr/td[3]/button";
	private static final String INTERVIEW_ROUND = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/div[2]/div[2]/div[2]/div[2]/table/tbody/tr/td[2]/input";
	private static final String ADD_INTERVIEW_ROUND = "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[2]/div/button";
	private static final String ID_INTERVIEW_ROUND= "//*[@id='wrapper']/div[2]/div/div/div/div/div/center/div/div/div[1]/ul/li[5]/a";
	private static final String NEW_INTERVIEW_ROUND ="//*[@id='users']/tbody/tr[9]/td[2]";
	private static final String DELETE_INTERVIEW_ROUND ="//*[@id='users']/tbody/tr[9]/td[3]/a";
	@Test
	public void clientTest() throws InterruptedException {
		WebDriver driver = new FirefoxDriver();
		try {
			log_IN_OUT.loginUser(driver);

			driver.switchTo();
			driver.get("http://localhost:8080/EmployeeReferral/main.html#/admin/client");
			
			Thread.sleep(10000);
			
			WebElement interviewRoundId=driver.findElement(By.xpath(ID_INTERVIEW_ROUND));
			interviewRoundId.click();
			
			Thread.sleep(5000);
			
			System.out.println(driver.getCurrentUrl());	
			
			Assert.assertEquals(driver.getCurrentUrl(),"http://localhost:8080/EmployeeReferral/main.html#/admin/interviewRounds");
			
			WebElement addinterviewRound=driver.findElement(By.xpath(ADD_INTERVIEW_ROUND));
			addinterviewRound.click();
			
			WebElement InterviewRound=driver.findElement(By.xpath(INTERVIEW_ROUND));
			InterviewRound.sendKeys("XYZ");
			
			WebElement save=driver.findElement(By.xpath(SAVE));
			save.click();
			
			Thread.sleep(10000);
			
			WebElement newInterviewRound=driver.findElement(By.xpath(NEW_INTERVIEW_ROUND));
			System.out.println(newInterviewRound.getText());
			
			Assert.assertEquals(newInterviewRound.getText(),"XYZ");
			
			WebElement deleteInterviewRound=driver.findElement(By.xpath(DELETE_INTERVIEW_ROUND));
            deleteInterviewRound.click();
            driver.switchTo().alert().accept();
            driver.switchTo();
            
            Thread.sleep(5000);
			
            log_IN_OUT.logoutUser(driver);
			
		} finally {
			driver.quit();
		}
	}

}
